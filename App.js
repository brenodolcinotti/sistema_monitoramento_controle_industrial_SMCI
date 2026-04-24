// Autores: Breno Dolcinotti, Anna Karolina Dantas dos Santos

import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, ScrollView, Modal, TouchableOpacity, StatusBar} from 'react-native';

import MachineCard from './componentes/MachineCard';

// ==========================================
// 1. Modal de Alerta
// ==========================================
const MaintenanceAlert = ({ visible, machineName, onConfirm, onIgnore }) => {
  const [observacao, setObservacao] = useState('');

  const handleConfirm = () => {
    onConfirm(observacao);
    setObservacao('');
  };

  return (
    <Modal animationType="fade" transparent={true} visible={visible} onRequestClose={onIgnore}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Text style={styles.warningIcon}>⚠️</Text>
          <Text style={styles.modalTitle}>ALERTA DE MANUTENÇÃO</Text>
          
          <Text style={styles.modalDescription}>
            Máquina {machineName} requer inspeção preventiva imediatamente. Verifique o nível de óleo.
          </Text>

          <View style={styles.modalInputWrapper}>
            <Text style={styles.modalInputLabel}>Observações do Supervisor:</Text>
            <TextInput
              style={styles.modalInput}
              value={observacao}
              onChangeText={setObservacao}
              placeholder="Insira as observações..."
            />
          </View>

          <View style={styles.modalButtons}>
            <TouchableOpacity style={styles.btnConfirm} onPress={handleConfirm}>
              <Text style={styles.btnConfirmText}>CONFIRMAR LEITURA</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.btnIgnore} onPress={onIgnore}>
              <Text style={styles.btnIgnoreText}>IGNORAR</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

// ==========================================
// 2. Aplicativo Principal
// ==========================================
export default function App() {
  const [supervisor, setSupervisor] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [alertMachineName, setAlertMachineName] = useState('');

  const [machinesUsinagem, setMachinesUsinagem] = useState([
    { id: '1', name: 'Torno CNC - T01', isOperating: true },
    { id: '2', name: 'Fresa Industrial - F03', isOperating: true },
    { id: '3', name: 'Fiasa Industrial - F02', isOperating: true },
    { id: '4', name: 'Liso Industrial - F05', isOperating: true },
  ]);

  const [machinesPintura, setMachinesPintura] = useState([
    { id: '5', name: 'Torno Pintura - T01', isOperating: true },
    { id: '6', name: 'Fresa Industrial - F02', isOperating: true },
  ]);

  const toggleMachine = (id, section) => {
    const updateList = (list) => list.map(machine => {
      if (machine.id === id) {
        const newState = !machine.isOperating;
        
        // Dispara o alerta se desligar o Torno CNC - T01
        if (id === '1' && newState === false) {
          setAlertMachineName(machine.name);
          setModalVisible(true);
        }
        
        return { ...machine, isOperating: newState };
      }
      return machine;
    });

    if (section === 'usinagem') setMachinesUsinagem(updateList(machinesUsinagem));
    if (section === 'pintura') setMachinesPintura(updateList(machinesPintura));
  };

  const handleConfirmAlert = (observacao) => {
    console.log("Observações salvas para " + alertMachineName + ":", observacao);
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#005499" />
      
      <View style={styles.header}>
        <Text style={styles.logoText}>SENAI</Text>
        <Text style={styles.headerTitle}>SMCI - Monitoramento Industrial</Text>
      </View>

      <View style={styles.activeSupervisorContainer}>
        <View style={styles.inputWrapper}>
          <Text style={styles.inputLabel}>Supervisor Ativo:</Text>
          <TextInput
            style={styles.textInput}
            value={supervisor}
            onChangeText={setSupervisor}
            placeholder="Digite o nome do supervisor"
          />
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.sectionTitle}>SETOR: USINAGEM</Text>
        <View style={styles.grid}>
          {machinesUsinagem.map(machine => (
            <MachineCard
              key={machine.id}
              name={machine.name}
              isOperating={machine.isOperating}
              onToggle={() => toggleMachine(machine.id, 'usinagem')}
            />
          ))}
        </View>

        <Text style={styles.sectionTitle}>SETOR: PINTURA</Text>
        <View style={styles.grid}>
          {machinesPintura.map(machine => (
            <MachineCard
              key={machine.id}
              name={machine.name}
              isOperating={machine.isOperating}
              onToggle={() => toggleMachine(machine.id, 'pintura')}
            />
          ))}
        </View>
        <View style={{ height: 40 }} />
      </ScrollView>

      <MaintenanceAlert 
        visible={modalVisible}
        machineName={alertMachineName}
        onConfirm={handleConfirmAlert}
        onIgnore={() => setModalVisible(false)}
      />
    </View>
  );
}

// ==========================================
// 3. Styles do App e do Modal
// ==========================================
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#005499',
    paddingTop: 40,
    paddingBottom: 20,
    alignItems: 'center',
  },
  logoText: {
    color: '#ffffff',
    fontSize: 28,
    fontWeight: 'bold',
    fontStyle: 'italic',
    letterSpacing: 2,
  },
  headerTitle: {
    color: '#ffffff',
    fontSize: 18,
    marginTop: 5,
  },
  activeSupervisorContainer: {
    backgroundColor: '#005499',
    paddingHorizontal: 15,
    paddingBottom: 15,
  },
  inputWrapper: {
    backgroundColor: '#e6f0fa',
    borderRadius: 8,
    padding: 5,
    borderWidth: 1,
    borderColor: '#b3d1ff',
  },
  inputLabel: {
    fontSize: 12,
    color: '#005499',
    marginLeft: 5,
  },
  textInput: {
    height: 35,
    paddingHorizontal: 10,
    fontSize: 16,
    color: '#333',
  },
  content: {
    padding: 15,
  },
  sectionTitle: {
    fontSize: 18,
    color: '#333',
    marginBottom: 10,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  // Estilos do Modal
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '85%',
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
  },
  warningIcon: {
    fontSize: 50,
    marginBottom: 10,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#003366',
    marginBottom: 10,
    textAlign: 'center',
  },
  modalDescription: {
    fontSize: 14,
    textAlign: 'center',
    color: '#333',
    marginBottom: 20,
  },
  modalInputWrapper: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#005499',
    borderRadius: 8,
    padding: 10,
    marginBottom: 20,
    position: 'relative',
  },
  modalInputLabel: {
    position: 'absolute',
    top: -10,
    left: 10,
    backgroundColor: '#ffffff',
    paddingHorizontal: 5,
    fontSize: 12,
    color: '#005499',
  },
  modalInput: {
    height: 40,
    fontSize: 14,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  btnConfirm: {
    backgroundColor: '#005499',
    paddingVertical: 12,
    borderRadius: 6,
    flex: 1,
    marginRight: 10,
    alignItems: 'center',
  },
  btnConfirmText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 13,
  },
  btnIgnore: {
    backgroundColor: '#888888',
    paddingVertical: 12,
    borderRadius: 6,
    flex: 0.8,
    alignItems: 'center',
  },
  btnIgnoreText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 13,
  },
});