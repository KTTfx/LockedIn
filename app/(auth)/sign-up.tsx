import React, { useState } from 'react';
import { View, StyleSheet, Platform, StatusBar } from 'react-native';
import { Text, TextInput, Button, useTheme } from 'react-native-paper';
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

const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBar.currentHeight;
const TOP_PADDING = Platform.OS === 'ios' ? 60 : 40;

const GRADIENT_COLORS = [
  '#000B18',  // Deep space blue
  '#0A1128',  // Classic navy
  '#1B2838',  // Steam blue
  '#1A365D',  // Professional blue
];

export default function SignUpScreen() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const theme = useTheme();

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
          name="account-plus"
          size={64}
          color="#60A5FA"
          style={styles.icon}
        />
        <Text variant="headlineMedium" style={styles.title}>
          Create Account
        </Text>
      </Animated.View>

      <Animated.View
        entering={FadeInUp.delay(400).springify()}
        style={styles.form}
      >
        <TextInput
          placeholder="Full Name"
          value={fullName}
          onChangeText={setFullName}
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
              icon="account"
              color="#60A5FA"
            />
          }
        />

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

        <TextInput
          placeholder="Confirm Password"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
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
              icon="lock-check"
              color="#60A5FA"
            />
          }
        />

        <Button
          mode="contained"
          style={styles.button}
          contentStyle={styles.buttonContent}
          labelStyle={styles.buttonLabel}
          onPress={() => {}}
          icon="account-plus"
        >
          Create Account
        </Button>

        <View style={styles.links}>
          <Text style={styles.linkText}>Already have an account?</Text>
          <Button
            mode="text"
            style={styles.linkButton}
            labelStyle={styles.linkButtonLabel}
            onPress={() => router.push('/(auth)/sign-in')}
          >
            Sign In
          </Button>
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
  },
  buttonLabel: {
    fontSize: 18,
    fontWeight: '600',
    color: '#ffffff',
    marginRight: 8,
  },
  links: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
  },
  linkText: {
    color: '#93C5FD',
    fontSize: 14,
  },
  linkButton: {
    marginLeft: 8,
  },
  linkButtonLabel: {
    color: '#60A5FA',
    fontSize: 14,
    fontWeight: '600',
  },
});
