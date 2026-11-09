import { StatusBar } from 'expo-status-bar';
import {
  Text,
  View,
  TextInput,
  Pressable,
} from 'react-native';
import { useState } from 'react';

import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { styles } from './src/forms/formStyles';

const signUpSchema = z
  .object({
    fullName: z
      .string()
      .min(2, 'Full name must be at least 2 characters'),

    email: z.email('Please enter a valid email address'),

    password: z
      .string()
      .min(8, 'Password must be at least 8 characters'),

    confirmPassword: z
      .string()
      .min(1, 'Please confirm your password'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

type SignUpFormData = z.infer<typeof signUpSchema>;

const signInSchema = z.object({
  email: z.email('Please enter a valid email address'),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters'),
});

type SignInFormData = z.infer<typeof signInSchema>;

export default function App() {
  const [isSignIn, setIsSignIn] = useState(false);

  if (isSignIn) {
    return <SignInScreen onSwitchToSignUp={() => setIsSignIn(false)} />;
  }

  return <SignUpScreen onSwitchToSignIn={() => setIsSignIn(true)} />;
}

function SignUpScreen({
  onSwitchToSignIn,
}: {
  onSwitchToSignIn: () => void;
}) {
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
    mode: 'onChange',
    defaultValues: {
      fullName: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = (data: SignUpFormData) => {
    console.log('Sign-Up Data:', data);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Account</Text>

      <Controller
        control={control}
        name="fullName"
        render={({ field: { onChange, onBlur, value } }) => (
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Full Name</Text>

            <TextInput
              style={[
                styles.input,
                errors.fullName && styles.inputError,
              ]}
              placeholder="Enter your full name"
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
            />

            {errors.fullName && (
              <Text style={styles.errorText}>
                {errors.fullName.message}
              </Text>
            )}
          </View>
        )}
      />

      <Controller
        control={control}
        name="email"
        render={({ field: { onChange, onBlur, value } }) => (
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Email</Text>

            <TextInput
              style={[
                styles.input,
                errors.email && styles.inputError,
              ]}
              placeholder="Enter your email"
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              keyboardType="email-address"
              autoCapitalize="none"
            />

            {errors.email && (
              <Text style={styles.errorText}>
                {errors.email.message}
              </Text>
            )}
          </View>
        )}
      />

      <Controller
        control={control}
        name="password"
        render={({ field: { onChange, onBlur, value } }) => (
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Password</Text>

            <TextInput
              style={[
                styles.input,
                errors.password && styles.inputError,
              ]}
              placeholder="Enter your password"
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              secureTextEntry
            />

            {errors.password && (
              <Text style={styles.errorText}>
                {errors.password.message}
              </Text>
            )}
          </View>
        )}
      />

      <Controller
        control={control}
        name="confirmPassword"
        render={({ field: { onChange, onBlur, value } }) => (
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Confirm Password</Text>

            <TextInput
              style={[
                styles.input,
                errors.confirmPassword && styles.inputError,
              ]}
              placeholder="Re-enter your password"
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              secureTextEntry
            />

            {errors.confirmPassword && (
              <Text style={styles.errorText}>
                {errors.confirmPassword.message}
              </Text>
            )}
          </View>
        )}
      />

      <Pressable
        style={[
          styles.button,
          !isValid && styles.buttonDisabled,
        ]}
        onPress={() => handleSubmit(onSubmit)()}
        disabled={!isValid}
      >
        <Text style={styles.buttonText}>Sign Up</Text>
      </Pressable>

      <Pressable
        style={styles.switchButton}
        onPress={onSwitchToSignIn}
      >
        <Text style={styles.switchText}>
          Already have an account? Sign In
        </Text>
      </Pressable>

      <StatusBar style="auto" />
    </View>
  );
}

function SignInScreen({
  onSwitchToSignUp,
}: {
  onSwitchToSignUp: () => void;
}) {
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema),
    mode: 'onChange',
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = (data: SignInFormData) => {
    console.log('Sign-In Data:', data);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome Back</Text>

      <Controller
        control={control}
        name="email"
        render={({ field: { onChange, onBlur, value } }) => (
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Email</Text>

            <TextInput
              style={[styles.input, errors.email && styles.inputError]}
              placeholder="Enter your email"
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              keyboardType="email-address"
              autoCapitalize="none"
              autoComplete="email"
            />

            {errors.email && (
              <Text style={styles.errorText}>{errors.email.message}</Text>
            )}
          </View>
        )}
      />

      <Controller
        control={control}
        name="password"
        render={({ field: { onChange, onBlur, value } }) => (
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Password</Text>

            <TextInput
              style={[styles.input, errors.password && styles.inputError]}
              placeholder="Enter your password"
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              secureTextEntry
              autoComplete="password"
            />

            {errors.password && (
              <Text style={styles.errorText}>
                {errors.password.message}
              </Text>
            )}
          </View>
        )}
      />

      <Pressable
        style={[styles.button, !isValid && styles.buttonDisabled]}
        onPress={() => handleSubmit(onSubmit)()}
        disabled={!isValid}
      >
        <Text style={styles.buttonText}>Sign In</Text>
      </Pressable>

      <Pressable style={styles.switchButton} onPress={onSwitchToSignUp}>
        <Text style={styles.switchText}>
          Need an account? Sign Up
        </Text>
      </Pressable>

      <StatusBar style="auto" />
    </View>
  );
}
