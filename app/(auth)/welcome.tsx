import React from 'react';
import { View, StyleSheet, Dimensions, Platform, StatusBar } from 'react-native';
import { Text, Button, useTheme } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import { Link } from 'expo-router';
import Animated, { 
  FadeInDown, 
  FadeInUp,
  SlideInRight,
  useAnimatedStyle,
  withSpring,
  withRepeat,
  withSequence,
  withDelay,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');
const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBar.currentHeight;
const TOP_PADDING = Platform.OS === 'ios' ? 60 : 40;

const GRADIENT_COLORS = [
  '#000B18',  // Deep space blue
  '#0A1128',  // Classic navy
  '#1B2838',  // Steam blue
  '#1A365D',  // Professional blue
];

export default function WelcomeScreen() {
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
      
      <View style={styles.content}>
        <Animated.View 
          entering={FadeInDown.delay(200).springify()} 
          style={styles.header}
        >
          <MaterialCommunityIcons 
            name="shield-lock" 
            size={80} 
            color="#60A5FA"
            style={styles.icon}
          />
          <Text variant="displaySmall" style={styles.title}>
            LockedIn
          </Text>
          <Text variant="titleLarge" style={styles.subtitle}>
            Master Your Focus
          </Text>
        </Animated.View>

        <View style={styles.features}>
          <Feature 
            title="Smart App Control"
            description="Block distracting apps during focus sessions"
            delay={400}
            icon="application-cog"
          />
          <Feature 
            title="Focus Analytics"
            description="Track and improve your productivity"
            delay={600}
            icon="chart-line"
          />
          <Feature 
            title="Achievement System"
            description="Level up your focus discipline"
            delay={800}
            icon="trophy-award"
          />
        </View>

        <Animated.View 
          entering={FadeInUp.delay(1000).springify()}
          style={styles.buttonContainer}
        >
          <Link href="/(auth)/sign-in" asChild>
            <Button 
              mode="contained" 
              style={styles.button}
              contentStyle={styles.buttonContent}
              labelStyle={styles.buttonLabel}
              icon={({ size, color }) => (
                <MaterialCommunityIcons 
                  name="arrow-right" 
                  size={24} 
                  color="#fff"
                  style={styles.buttonIcon}
                />
              )}
            >
              Get Started
            </Button>
          </Link>
        </Animated.View>
      </View>
    </View>
  );
}

function Feature({ title, description, delay, icon }) {
  const slideStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: withDelay(
          delay,
          withSpring(0, {
            damping: 12,
            stiffness: 100,
          })
        ),
      },
    ],
  }));

  return (
    <Animated.View 
      entering={SlideInRight.delay(delay).springify()}
      style={[styles.feature, slideStyle]}
    >
      <View style={styles.featureIcon}>
        <MaterialCommunityIcons name={icon} size={32} color="#60A5FA" />
      </View>
      <View style={styles.featureContent}>
        <Text variant="titleMedium" style={styles.featureTitle}>
          {title}
        </Text>
        <Text variant="bodyMedium" style={styles.featureDescription}>
          {description}
        </Text>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000B18',
    paddingTop: STATUSBAR_HEIGHT,
  },
  content: {
    flex: 1,
    justifyContent: 'space-between',
    paddingBottom: 32,
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
    marginBottom: 20,
  },
  icon: {
    marginBottom: 20,
    textShadowColor: 'rgba(96, 165, 250, 0.5)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 20,
  },
  title: {
    color: '#ffffff',
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: 8,
    textShadowColor: 'rgba(96, 165, 250, 0.5)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 10,
  },
  subtitle: {
    color: '#60A5FA',
    textAlign: 'center',
    opacity: 0.9,
    fontWeight: '500',
    textShadowColor: 'rgba(96, 165, 250, 0.5)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 5,
    marginBottom: 5,
  },
  features: {
    paddingHorizontal: 20,
    gap: 24,
    marginBottom: 5,
  },
  feature: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(96, 165, 250, 0.1)',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(96, 165, 250, 0.2)',
  },
  featureIcon: {
    width: 48,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 24,
    backgroundColor: 'rgba(96, 165, 250, 0.15)',
    marginRight: 16,
  },
  featureContent: {
    flex: 1,
  },
  featureTitle: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
  featureDescription: {
    color: '#93C5FD',
    fontSize: 14,
    lineHeight: 20,
  },
  buttonContainer: {
    paddingHorizontal: 20,
    paddingTop: 16,
  },
  button: {
    borderRadius: 12,
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
});
