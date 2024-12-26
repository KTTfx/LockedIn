import React, { useState } from 'react';
import { View, StyleSheet, Platform, StatusBar } from 'react-native';
import { Text, TextInput, Button, useTheme } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
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

export default function ResetPasswordScreen() {
  const [email, setEmail] = useState('');
  const [step, setStep] = useState(1); // 1: email, 2: code, 3: new password
  const [verificationCode, setVerificationCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
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

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <>
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
            <Button
              mode="contained"
              style={styles.button}
              contentStyle={styles.buttonContent}
              labelStyle={styles.buttonLabel}
              onPress={() => setStep(2)}
              icon="email-send"
            >
              Send Reset Link
            </Button>
          </>
        );
      case 2:
        return (
          <>
            <TextInput
              placeholder="Verification Code"
              value={verificationCode}
              onChangeText={setVerificationCode}
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
                  icon="key"
                  color="#60A5FA"
                />
              }
            />
            <Button
              mode="contained"
              style={styles.button}
              contentStyle={styles.buttonContent}
              labelStyle={styles.buttonLabel}
              onPress={() => setStep(3)}
              icon="key"
            >
              Verify Code
            </Button>
          </>
        );
      case 3:
        return (
          <>
            <TextInput
              placeholder="New Password"
              value={newPassword}
              onChangeText={setNewPassword}
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
              placeholder="Confirm New Password"
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
              onPress={() => router.push('/(auth)/sign-in')}
              icon="check"
            >
              Reset Password
            </Button>
          </>
        );
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
          name="lock-reset"
          size={64}
          color="#60A5FA"
          style={styles.icon}
        />
        <Text variant="headlineMedium" style={styles.title}>
          Reset Password
        </Text>
        <Text style={styles.subtitle}>
          {step === 1 && "Enter your email to receive a reset link"}
          {step === 2 && "Enter the verification code sent to your email"}
          {step === 3 && "Create a new password"}
        </Text>
      </Animated.View>

      <Animated.View
        entering={FadeInUp.delay(400).springify()}
        style={styles.form}
      >
        {renderStep()}

        <View style={styles.links}>
          <Button
            mode="text"
            style={styles.linkButton}
            labelStyle={styles.linkButtonLabel}
            onPress={() => router.push('/(auth)/sign-in')}
          >
            Back to Sign In
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
    marginTop: 16,
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
