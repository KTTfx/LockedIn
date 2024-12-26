import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
} from 'react-native';
import {
  Surface,
  Text,
  Button,
  Card,
  useTheme,
  ProgressBar,
} from 'react-native-paper';

const BREAK_ACTIVITIES = [
  {
    title: 'Quick Stretch',
    description: 'Stand up and do some basic stretches',
    icon: '🧘‍♂️',
  },
  {
    title: 'Take a Walk',
    description: 'Walk around for a few minutes',
    icon: '🚶‍♂️',
  },
  {
    title: 'Hydrate',
    description: 'Drink a glass of water',
    icon: '💧',
  },
  {
    title: 'Deep Breathing',
    description: 'Practice deep breathing exercises',
    icon: '🌬️',
  },
];

const BreakScreen = ({ navigation, route }) => {
  const theme = useTheme();
  const breakDuration = route?.params?.breakDuration || 5 * 60; // 5 minutes in seconds
  const [timeLeft, setTimeLeft] = useState(breakDuration);
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    let interval = null;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(time => time - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsActive(false);
      // TODO: Show notification that break is over
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleEndBreak = () => {
    navigation.navigate('FocusSession');
  };

  return (
    <View style={styles.container}>
      <Surface style={styles.timerContainer}>
        <Text variant="headlineMedium" style={styles.title}>
          Break Time
        </Text>
        <Text variant="displayLarge" style={styles.timer}>
          {formatTime(timeLeft)}
        </Text>
        <ProgressBar
          progress={1 - (timeLeft / breakDuration)}
          style={styles.progress}
          color={theme.colors.primary}
        />
        <Button
          mode="contained"
          onPress={handleEndBreak}
          style={styles.button}
        >
          End Break Early
        </Button>
      </Surface>

      <ScrollView style={styles.activitiesContainer}>
        <Text variant="titleMedium" style={styles.sectionTitle}>
          Suggested Activities
        </Text>
        {BREAK_ACTIVITIES.map((activity, index) => (
          <Card key={index} style={styles.activityCard}>
            <Card.Content style={styles.activityContent}>
              <Text style={styles.activityIcon}>{activity.icon}</Text>
              <View style={styles.activityText}>
                <Text variant="titleMedium">{activity.title}</Text>
                <Text variant="bodyMedium">{activity.description}</Text>
              </View>
            </Card.Content>
          </Card>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  timerContainer: {
    margin: 16,
    padding: 24,
    alignItems: 'center',
    borderRadius: 8,
    elevation: 2,
  },
  title: {
    marginBottom: 16,
  },
  timer: {
    fontSize: 72,
    fontWeight: 'bold',
  },
  progress: {
    height: 8,
    borderRadius: 4,
    width: '100%',
    marginVertical: 16,
  },
  button: {
    marginTop: 16,
    paddingHorizontal: 32,
  },
  activitiesContainer: {
    flex: 1,
    padding: 16,
  },
  sectionTitle: {
    marginBottom: 16,
  },
  activityCard: {
    marginBottom: 12,
    borderRadius: 8,
  },
  activityContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  activityIcon: {
    fontSize: 32,
    marginRight: 16,
  },
  activityText: {
    flex: 1,
  },
});

export default BreakScreen;
