import { StyleSheet, Platform } from 'react-native';

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
  logo: {
    width: 200,
    height: 80,
    marginBottom: 30,
  },
  formCard: {
    width: '100%',
    maxWidth: 400,
    alignItems: 'center',
  },
  title: {
    color: '#FFF',
    fontSize: 28,
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
  button: {
    width: '70%',
    backgroundColor: '#FFF',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#003B49',
    fontWeight: 'bold',
    fontSize: 16,
  },
  secondaryButton: {
    width: '70%',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#FFF',
    alignItems: 'center',
    marginTop: 15,
  },
  secondaryButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
});