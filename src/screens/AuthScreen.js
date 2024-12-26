import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Dimensions,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import {
  Text,
  Button,
  TextInput,
  useTheme,
  IconButton,
} from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, {
  FadeInDown,
  FadeInUp,
} from 'react-native-reanimated';
import { useDispatch, useSelector } from 'react-redux';
import { router } from 'expo-router';
import { loginUser, registerUser } from '../services/auth';
import { setUser, setError } from '../store/slices/authSlice';

const { width } = Dimensions.get('window');

export default function AuthScreen() {
  const dispatch = useDispatch();
  const theme = useTheme();
  const { loading } = useSelector((state) => state.auth);

  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleAuth = async () => {
    if (!email || !password) {
      dispatch(setError('Please fill in all fields'));
      return;
    }

    const authFunction = isLogin ? loginUser : registerUser;
    const { success, user, error } = await authFunction(email, password);

    if (success) {
      dispatch(setUser(user));
      router.replace('/(app)/(tabs)/');
    } else {
      dispatch(setError(error));
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <LinearGradient
          colors={['#1a1a1a', '#2a2a2a']}
          style={StyleSheet.absoluteFill}
        />

        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.content}
        >
          <Animated.View
            entering={FadeInDown.delay(200).springify()}
            style={styles.header}
          >
            <Text variant="headlineMedium" style={styles.title}>
              {isLogin ? 'Welcome Back' : 'Create Account'}
            </Text>
            <Text variant="bodyLarge" style={styles.subtitle}>
              {isLogin
                ? 'Sign in to continue your focus journey'
                : 'Join us and start focusing better'}
            </Text>
          </Animated.View>

          <Animated.View
            entering={FadeInUp.delay(400).springify()}
            style={styles.form}
          >
            <TextInput
              label="Email"
              value={email}
              onChangeText={setEmail}
              mode="outlined"
              keyboardType="email-address"
              autoCapitalize="none"
              style={styles.input}
              theme={{
                colors: {
                  primary: '#3366FF',
                  background: '#1a1a1a',
                },
              }}
              textColor="#ffffff"
              outlineColor="rgba(255, 255, 255, 0.2)"
              disabled={loading}
            />

            <TextInput
              label="Password"
              value={password}
              onChangeText={setPassword}
              mode="outlined"
              secureTextEntry={!showPassword}
              style={styles.input}
              theme={{
                colors: {
                  primary: '#3366FF',
                  background: '#1a1a1a',
                },
              }}
              textColor="#ffffff"
              outlineColor="rgba(255, 255, 255, 0.2)"
              disabled={loading}
              right={
                <TextInput.Icon
                  icon={showPassword ? 'eye-off' : 'eye'}
                  onPress={() => setShowPassword(!showPassword)}
                  color="rgba(255, 255, 255, 0.6)"
                />
              }
            />

            <Button
              mode="contained"
              onPress={handleAuth}
              style={styles.button}
              contentStyle={styles.buttonContent}
              labelStyle={styles.buttonLabel}
              loading={loading}
              disabled={loading}
            >
              {isLogin ? 'Sign In' : 'Create Account'}
            </Button>

            <Button
              mode="text"
              onPress={() => setIsLogin(!isLogin)}
              style={styles.switchButton}
              labelStyle={styles.switchButtonLabel}
              disabled={loading}
            >
              {isLogin
                ? "Don't have an account? Sign Up"
                : 'Already have an account? Sign In'}
            </Button>
          </Animated.View>
        </KeyboardAvoidingView>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  title: {
    color: '#ffffff',
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    color: '#cccccc',
    textAlign: 'center',
    opacity: 0.8,
  },
  form: {
    width: '100%',
  },
  input: {
    marginBottom: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
  },
  button: {
    marginTop: 8,
    borderRadius: 12,
    backgroundColor: '#3366FF',
  },
  buttonContent: {
    height: 56,
  },
  buttonLabel: {
    fontSize: 16,
    fontWeight: '600',
  },
  switchButton: {
    marginTop: 16,
  },
  switchButtonLabel: {
    color: '#3366FF',
  },
});
