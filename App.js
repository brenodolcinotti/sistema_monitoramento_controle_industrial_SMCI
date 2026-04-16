import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, View, ScrollView } from 'react-native';
import machineCard from './components/machineCard';
import alertModal from './components/alertModal';
import styles from './styles/styles';

export default function App() {

  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>SMCI - Monitoramento Industrial</Text>
      <View style={styles.supervisorBox}>
        <Text style={styles.label}>Supervisor Ativo:</Text>
        <Text style={styles.supervisor}>Anna Karolina Dantas</Text>
      </View>
      
      <ScrollView>
        <Text style={styles.setor}></Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
