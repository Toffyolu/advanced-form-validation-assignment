import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  type TextInputProps,
} from 'react-native';
import { useHeaderHeight } from 'expo-router/react-navigation';

import { employeeSchema, type EmployeeFormData } from '../forms/employeeSchema';
import { styles } from '../forms/formStyles';

const fields: {
  name: keyof EmployeeFormData;
  label: string;
  placeholder: string;
  keyboardType?: TextInputProps['keyboardType'];
  autoCapitalize?: TextInputProps['autoCapitalize'];
}[] = [
  { name: 'fullName', label: 'Full Name', placeholder: 'Ghazal Azarnia', autoCapitalize: 'words' },
  { name: 'email', label: 'Work Email', placeholder: 'ghazal@example.com', keyboardType: 'email-address', autoCapitalize: 'none' },
  { name: 'phone', label: 'Phone Number', placeholder: '+1 234-567-8910', keyboardType: 'phone-pad' },
  { name: 'employeeId', label: 'Employee ID', placeholder: 'EMP1234', autoCapitalize: 'characters' },
  { name: 'department', label: 'Department', placeholder: 'IT', autoCapitalize: 'words' },
  { name: 'jobTitle', label: 'Job Title', placeholder: 'Software Developer', autoCapitalize: 'words' },
];

export default function EmployeeInformationScreen() {
  const headerHeight = useHeaderHeight();
  const [focusedField, setFocusedField] = useState<keyof EmployeeFormData | null>(null);
  const { control, handleSubmit, formState: { isValid, isSubmitting, isSubmitSuccessful }, reset } =
    useForm<EmployeeFormData>({
      resolver: zodResolver(employeeSchema),
      mode: 'onTouched',
      defaultValues: {
        fullName: '',
        email: '',
        phone: '',
        employeeId: '',
        department: '',
        jobTitle: '',
      },
    });

  const canSubmit = isValid && !isSubmitting && !isSubmitSuccessful;

  return (
    <KeyboardAvoidingView
      style={screenStyles.screen}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={headerHeight}
    >
      <ScrollView
        contentContainerStyle={screenStyles.content}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={styles.title} accessibilityRole="header">Employee Information</Text>
        <Text style={screenStyles.instructions}>All fields are required.</Text>

        {fields.map(({ name, label, ...inputProps }) => (
          <Controller
            key={name}
            control={control}
            name={name}
            render={({ field: { ref, value, onChange, onBlur }, fieldState: { error } }) => (
              <View style={styles.inputGroup}>
                <Text style={styles.label}>{label}</Text>
                <TextInput
                  {...inputProps}
                  ref={ref}
                  accessibilityLabel={label}
                  style={[
                    styles.input,
                    focusedField === name && screenStyles.focusedInput,
                    error && styles.inputError,
                  ]}
                  value={value}
                  onChangeText={onChange}
                  onFocus={() => setFocusedField(name)}
                  onBlur={() => {
                    setFocusedField(null);
                    onBlur();
                  }}
                  editable={!isSubmitSuccessful}
                  autoCorrect={false}
                />
                {error && (
                  <Text style={styles.errorText} accessibilityLiveRegion="polite">
                    {error.message}
                  </Text>
                )}
              </View>
            )}
          />
        ))}

        {isSubmitSuccessful ? (
          <>
            <Text style={screenStyles.success} accessibilityRole="alert">
              Employee information submitted successfully.
            </Text>
            <Pressable style={styles.button} accessibilityRole="button" onPress={() => reset()}>
              <Text style={styles.buttonText}>Start New Form</Text>
            </Pressable>
          </>
        ) : (
          <Pressable
            style={[styles.button, !canSubmit && styles.buttonDisabled]}
            accessibilityRole="button"
            accessibilityState={{ disabled: !canSubmit }}
            disabled={!canSubmit}
            onPress={() => handleSubmit(() => Keyboard.dismiss())()}
          >
            <Text style={styles.buttonText}>Submit Employee Information</Text>
          </Pressable>
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const screenStyles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#fff' },
  content: { padding: 24, maxWidth: 560, width: '100%', alignSelf: 'center' },
  instructions: { marginBottom: 20, color: '#444' },
  focusedInput: { borderColor: '#111', backgroundColor: '#f6f6f6' },
  success: { color: '#166534', marginBottom: 12 },
});
