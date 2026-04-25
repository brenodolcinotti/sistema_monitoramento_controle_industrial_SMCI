import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
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