import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  StyleSheet,
  BackHandler,
  Alert,
  Animated,
} from 'react-native';
import {
  Surface,
  Text,
  Button,
  IconButton,
  ProgressBar,
  Portal,
  Dialog,
  useTheme,
} from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation, useRoute } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { startSession, endSession, selectActiveSession } from '../store/slices/lockSessionSlice';
import { fadeIn, slideUp } from '../utils/animations';
import { setupAppProtection } from '../services/appProtection';

const FocusSessionScreen = () => {
  const theme = useTheme();
  const navigation = useNavigation();
  const route = useRoute();
  const dispatch = useDispatch();
  
  const activeSession = useSelector(selectActiveSession);
  const [timeLeft, setTimeLeft] = useState(0);
  const [progress, setProgress] = useState(1);
  const [showExitDialog, setShowExitDialog] = useState(false);
  const [isLocking, setIsLocking] = useState(false);

  const { duration = 25, task = 'Focus Session', mode = 1 } = route.params || {};
  const totalTime = duration * 60 * 1000; // Convert minutes to milliseconds

  // Animation values
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;

  useEffect(() => {
    fadeIn(fadeAnim);
    slideUp(slideAnim);
    
    // Set up app protection
    setupAppProtection().catch(console.error);
  }, []);

  useEffect(() => {
    if (!activeSession) {
      // Start new session
      dispatch(startSession({
        duration,
        blockedApps: [], // TODO: Get from settings
        startTime: Date.now(),
      }));
    }
  }, []);

  useEffect(() => {
    // Handle back button
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      handleBackPress
    );

    return () => backHandler.remove();
  }, []);

  useEffect(() => {
    if (activeSession) {
      const interval = setInterval(() => {
        const now = Date.now();
        const remaining = activeSession.endTime - now;
        
        if (remaining <= 0) {
          clearInterval(interval);
          handleSessionComplete();
        } else {
          setTimeLeft(remaining);
          setProgress(remaining / totalTime);
        }
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [activeSession]);

  const handleBackPress = () => {
    setShowExitDialog(true);
    return true;
  };

  const handleSessionComplete = () => {
    dispatch(endSession());
    Alert.alert(
      'Session Complete!',
      'Great job staying focused!',
      [{ text: 'OK', onPress: () => navigation.replace('Dashboard') }]
    );
  };

  const handleEarlyExit = () => {
    navigation.navigate('Payment');
  };

  const formatTime = (ms) => {
    const minutes = Math.floor(ms / (1000 * 60));
    const seconds = Math.floor((ms % (1000 * 60)) / 1000);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <View style={styles.container}>
      <Animated.View
        style={{
          opacity: fadeAnim,
          transform: [{ translateY: slideAnim }],
        }}
      >
        <LinearGradient
          colors={['#4834d4', '#686de0']}
          style={styles.header}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <View style={styles.headerContent}>
            <IconButton
              icon="arrow-left"
              iconColor="#fff"
              size={24}
              onPress={handleBackPress}
            />
            <Text style={styles.headerTitle}>{task}</Text>
            <IconButton
              icon="cog"
              iconColor="#fff"
              size={24}
              onPress={() => {}}
            />
          </View>
        </LinearGradient>

        <View style={styles.content}>
          <Surface style={styles.timerCard}>
            <Text style={styles.timeDisplay}>
              {formatTime(timeLeft)}
            </Text>
            <ProgressBar
              progress={progress}
              color={theme.colors.primary}
              style={styles.progressBar}
            />
            <Text style={styles.statusText}>
              Apps are locked • Focus mode active
            </Text>
          </Surface>

          <Surface style={styles.infoCard}>
            <MaterialCommunityIcons
              name="information"
              size={24}
              color={theme.colors.primary}
            />
            <Text style={styles.infoText}>
              To unlock your apps before the session ends, you'll need to pay a small fee.
              This helps maintain accountability and commitment to your focus goals.
            </Text>
          </Surface>

          <Button
            mode="contained"
            onPress={handleEarlyExit}
            style={styles.unlockButton}
            icon="lock-open"
          >
            Unlock Apps Early
          </Button>
        </View>

        <Portal>
          <Dialog visible={showExitDialog} onDismiss={() => setShowExitDialog(false)}>
            <Dialog.Title>End Session Early?</Dialog.Title>
            <Dialog.Content>
              <Text>
                To end your session early and unlock your apps, you'll need to pay a small fee.
                Would you like to proceed with the payment?
              </Text>
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={() => setShowExitDialog(false)}>Continue Session</Button>
              <Button onPress={handleEarlyExit}>Unlock Apps</Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    paddingTop: 48,
    paddingBottom: 24,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  content: {
    padding: 20,
  },
  timerCard: {
    padding: 32,
    borderRadius: 16,
    alignItems: 'center',
    elevation: 4,
  },
  timeDisplay: {
    fontSize: 48,
    fontWeight: 'bold',
    marginBottom: 24,
  },
  progressBar: {
    height: 8,
    borderRadius: 4,
    width: '100%',
    marginBottom: 16,
  },
  statusText: {
    color: '#666',
  },
  infoCard: {
    flexDirection: 'row',
    padding: 16,
    borderRadius: 12,
    marginTop: 20,
    marginBottom: 20,
    elevation: 2,
  },
  infoText: {
    flex: 1,
    marginLeft: 12,
    color: '#666',
  },
  unlockButton: {
    marginTop: 8,
    borderRadius: 8,
  },
});

export default FocusSessionScreen;
