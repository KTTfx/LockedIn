import { Animated, Easing } from 'react-native';

export const fadeIn = (animatedValue, duration = 300) => {
  Animated.timing(animatedValue, {
    toValue: 1,
    duration,
    useNativeDriver: true,
    easing: Easing.ease,
  }).start();
};

export const fadeOut = (animatedValue, duration = 300) => {
  Animated.timing(animatedValue, {
    toValue: 0,
    duration,
    useNativeDriver: true,
    easing: Easing.ease,
  }).start();
};

export const slideUp = (animatedValue, duration = 300) => {
  Animated.timing(animatedValue, {
    toValue: 0,
    duration,
    useNativeDriver: true,
    easing: Easing.out(Easing.cubic),
  }).start();
};

export const pulse = (animatedValue, duration = 1000) => {
  Animated.sequence([
    Animated.timing(animatedValue, {
      toValue: 1.2,
      duration: duration / 2,
      useNativeDriver: true,
      easing: Easing.ease,
    }),
    Animated.timing(animatedValue, {
      toValue: 1,
      duration: duration / 2,
      useNativeDriver: true,
      easing: Easing.ease,
    }),
  ]).start();
};

export const spin = (animatedValue) => {
  Animated.loop(
    Animated.timing(animatedValue, {
      toValue: 1,
      duration: 2000,
      easing: Easing.linear,
      useNativeDriver: true,
    })
  ).start();
};

export const bounceIn = (animatedValue, duration = 800) => {
  Animated.spring(animatedValue, {
    toValue: 1,
    tension: 40,
    friction: 5,
    useNativeDriver: true,
  }).start();
};
