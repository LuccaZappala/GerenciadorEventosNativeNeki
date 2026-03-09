import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f4',
  },
  header: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  paddingHorizontal: 20,
  height: 80,
  backgroundColor: '#FFFFFF',
  shadowColor: '#000', 
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.1, 
  shadowRadius: 2,    
},
  logo: {
    width: 100,
    height: 40,
  },
  adminGreeting: {
    fontSize: 14,
    color: '#2B94A7',
  },
  adminName: {
    fontWeight: 'bold',
  },
  logoutBtn: {
    backgroundColor: '#003B49',
    padding: 8,
    borderRadius: 5,
  },
  logoutText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 12,
  },
  main: {
    flex: 1,
    padding: 20,
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#003B49',
  },
  addBtn: {
    backgroundColor: '#28a745',
    padding: 10,
    borderRadius: 8,
  },
  addBtnText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 20,
    overflow: 'hidden',
    elevation: 3,
  },
  cardImage: {
    width: '100%',
    height: 180,
  },
  cardInfo: {
    padding: 15,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  cardDetails: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  cardActions: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  actionBtn: {
    flex: 1,
    padding: 12,
    alignItems: 'center',
  },
  editText: {
    color: '#007bff',
    fontWeight: 'bold',
  },
  deleteText: {
    color: '#dc3545',
    fontWeight: 'bold',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20
  },
  modalContent: {
  backgroundColor: '#fff',
  width: '100%',
  padding: 25,
  borderRadius: 10,
},

  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#003B49',
    marginBottom: 10
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 12,
    fontSize: 16
  }
});