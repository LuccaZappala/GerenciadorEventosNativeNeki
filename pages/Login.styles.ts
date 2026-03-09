import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#003B49',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  welcomeSection: {
    alignItems: 'center',
    marginBottom: 30,
  },
  welcomeTitle: {
    fontSize: 22,
    color: '#FFF',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  welcomeSubtitle: {
    color: '#2B94A7',
    fontWeight: 'bold',
    marginBottom: 20,
  },
  mascote: {
    width: 150,
    height: 150,
  },
  formSection: {
    width: '100%',
    alignItems: 'center',
  },
  logo: {
    width: 150,
    height: 60,
    marginBottom: 20,
  },
  formCard: {
    width: '100%',
    maxWidth: 400,
    alignItems: 'center',
  },
  cardTitle: {
    color: '#FFF',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    backgroundColor: '#2B94A7',
    borderRadius: 8,
    padding: 16,
    color: '#FFF',
    fontSize: 16,
    marginBottom: 15,
  },
  checkBoxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    marginLeft: 8,
    marginBottom: 20,
  },
  checkBoxText: {
    color: '#FFF',
    fontSize: 14,
  },
  button: {
    width: '100%',
    backgroundColor: '#FFF',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 15,
  },
  buttonText: {
    color: '#003B49',
    fontWeight: 'bold',
    fontSize: 16,
  },
  secondaryButton: {
    width: '100%',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#FFF',
    alignItems: 'center',
  },
  secondaryButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
});