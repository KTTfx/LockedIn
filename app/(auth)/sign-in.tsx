import React, { useState } from 'react';
import { View, StyleSheet, Platform, StatusBar } from 'react-native';
import { Text, TextInput, Button, useTheme, ActivityIndicator } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import { Link, router } from 'expo-router';
import Animated, {
  FadeInDown,
  FadeInUp,
  useAnimatedStyle,
  withRepeat,
  withSequence,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useDispatch } from 'react-redux';
import { setUser } from '../../src/store/slices/authSlice';

const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBar.currentHeight;
const TOP_PADDING = Platform.OS === 'ios' ? 60 : 40;

const GRADIENT_COLORS = [
  '#000B18',  // Deep space blue
  '#0A1128',  // Classic navy
  '#1B2838',  // Steam blue
  '#1A365D',  // Professional blue
];

export default function SignInScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const theme = useTheme();
  const dispatch = useDispatch();

  const pulseStyle = useAnimatedStyle(() => ({
    transform: [
      {
        scale: withRepeat(
          withSequence(
            withTiming(1.1, {
              duration: 2000,
              easing: Easing.bezier(0.25, 0.1, 0.25, 1),
            }),
            withTiming(1, {
              duration: 2000,
              easing: Easing.bezier(0.25, 0.1, 0.25, 1),
            })
          ),
          -1,
          true
        ),
      },
    ],
    opacity: withRepeat(
      withSequence(
        withTiming(0.6, { duration: 2000 }),
        withTiming(0.2, { duration: 2000 })
      ),
      -1,
      true
    ),
  }));

  const handleSignIn = async () => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Set user in Redux store
      dispatch(setUser({ id: '1', email }));
      
      // Navigate to tabs
      router.replace('/(app)/(tabs)/');
    } catch (error) {
      console.error('Sign in error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={GRADIENT_COLORS}
        style={StyleSheet.absoluteFill}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      />

      {/* Animated tech patterns */}
      <Animated.View style={[styles.techPattern1, pulseStyle]} />
      <Animated.View style={[styles.techPattern2, pulseStyle]} />

      <Animated.View
        entering={FadeInDown.delay(200).springify()}
        style={styles.header}
      >
        <MaterialCommunityIcons
          name="shield-lock"
          size={64}
          color="#60A5FA"
          style={styles.icon}
        />
        <Text variant="headlineMedium" style={styles.title}>
          Welcome Back
        </Text>
        <Text style={styles.subtitle}>
          Sign in to continue your focus journey
        </Text>
      </Animated.View>

      <Animated.View
        entering={FadeInUp.delay(400).springify()}
        style={styles.form}
      >
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          mode="outlined"
          style={styles.input}
          textColor="#60A5FA"
          outlineColor="rgba(96, 165, 250, 0.5)"
          activeOutlineColor="#60A5FA"
          theme={{
            colors: {
              background: 'rgba(96, 165, 250, 0.1)',
            },
          }}
          left={
            <TextInput.Icon
              icon="email"
              color="#60A5FA"
            />
          }
        />

        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!showPassword}
          mode="outlined"
          style={styles.input}
          textColor="#60A5FA"
          outlineColor="rgba(96, 165, 250, 0.5)"
          activeOutlineColor="#60A5FA"
          theme={{
            colors: {
              background: 'rgba(96, 165, 250, 0.1)',
            },
          }}
          left={
            <TextInput.Icon
              icon="lock"
              color="#60A5FA"
            />
          }
          right={
            <TextInput.Icon
              icon={showPassword ? 'eye-off' : 'eye'}
              color="#60A5FA"
              onPress={() => setShowPassword(!showPassword)}
            />
          }
        />

        <Button
          mode="contained"
          style={styles.button}
          contentStyle={styles.buttonContent}
          labelStyle={styles.buttonLabel}
          onPress={handleSignIn}
          icon={({ size, color }) => (
            loading ? (
              <ActivityIndicator 
                size={24} 
                color="#fff" 
                style={styles.buttonIcon}
              />
            ) : (
              <MaterialCommunityIcons 
                name="login" 
                size={24} 
                color="#fff"
                style={styles.buttonIcon}
              />
            )
          )}
          disabled={loading}
        >
          {loading ? 'Signing in...' : 'Sign In'}
        </Button>

        <View style={styles.links}>
          <Link href="/sign-up" asChild>
            <Button
              mode="text"
              style={styles.linkButton}
              labelStyle={styles.linkButtonLabel}
              icon={({ size, color }) => (
                <MaterialCommunityIcons 
                  name="account-plus" 
                  size={20} 
                  color="#60A5FA"
                  style={styles.linkButtonIcon}
                />
              )}
            >
              Create Account
            </Button>
          </Link>
          <Link href="/reset-password" asChild>
            <Button
              mode="text"
              style={styles.linkButton}
              labelStyle={styles.linkButtonLabel}
              icon={({ size, color }) => (
                <MaterialCommunityIcons 
                  name="lock-reset" 
                  size={20} 
                  color="#60A5FA"
                  style={styles.linkButtonIcon}
                />
              )}
            >
              Reset Password
            </Button>
          </Link>
        </View>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000B18',
    paddingTop: STATUSBAR_HEIGHT,
  },
  techPattern1: {
    position: 'absolute',
    top: -100,
    right: -100,
    width: 300,
    height: 300,
    borderRadius: 150,
    backgroundColor: 'rgba(96, 165, 250, 0.1)',
    borderWidth: 2,
    borderColor: 'rgba(96, 165, 250, 0.3)',
  },
  techPattern2: {
    position: 'absolute',
    bottom: -150,
    left: -150,
    width: 400,
    height: 400,
    borderRadius: 200,
    backgroundColor: 'rgba(96, 165, 250, 0.05)',
    borderWidth: 3,
    borderColor: 'rgba(96, 165, 250, 0.2)',
  },
  header: {
    alignItems: 'center',
    paddingTop: TOP_PADDING,
    paddingHorizontal: 20,
    marginBottom: 40,
  },
  icon: {
    marginBottom: 16,
    textShadowColor: 'rgba(96, 165, 250, 0.5)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 20,
  },
  title: {
    color: '#ffffff',
    textAlign: 'center',
    fontWeight: 'bold',
    textShadowColor: 'rgba(96, 165, 250, 0.5)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 10,
  },
  subtitle: {
    color: '#93C5FD',
    textAlign: 'center',
    marginTop: 8,
    fontSize: 16,
  },
  form: {
    padding: 20,
    gap: 16,
  },
  input: {
    backgroundColor: 'rgba(96, 165, 250, 0.1)',
    borderRadius: 12,
  },
  button: {
    borderRadius: 12,
    marginTop: 8,
    backgroundColor: '#2563EB',
  },
  buttonContent: {
    height: 56,
    flexDirection: 'row-reverse',
    paddingHorizontal: 16,
    justifyContent: 'space-between',
  },
  buttonIcon: {
    marginLeft: 12,
  },
  buttonLabel: {
    fontSize: 18,
    fontWeight: '600',
    color: '#ffffff',
    flex: 1,
    textAlign: 'center',
  },
  links: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
    gap: 12,
  },
  linkButton: {
    flex: 1,
  },
  linkButtonIcon: {
    marginRight: 8,
  },
  linkButtonLabel: {
    color: '#60A5FA',
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 4,
  },
});
