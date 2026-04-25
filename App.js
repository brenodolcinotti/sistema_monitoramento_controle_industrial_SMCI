// Autores: Breno Dolcinotti, Anna Karolina Dantas dos Santos

import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, ScrollView, Modal, TouchableOpacity, StatusBar} from 'react-native';

import MachineCard from './componentes/MachineCard';
import { styles } from './styles/styles';

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
