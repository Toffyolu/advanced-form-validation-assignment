import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 24,
    justifyContent: 'center',
  },

  title: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 24,
  },

  inputGroup: {
    marginBottom: 18,
  },

  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },

  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 16,
  },

  inputError: {
    borderColor: '#d32f2f',
  },

  errorText: {
    marginTop: 6,
    fontSize: 13,
    color: '#d32f2f',
  },

  button: {
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    backgroundColor: '#111',
    marginTop: 6,
  },

  buttonDisabled: {
    opacity: 0.4,
  },

  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});