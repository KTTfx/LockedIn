import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Animated,
  Dimensions,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import {
  Surface,
  Text,
  Card,
  Button,
  IconButton,
  useTheme,
  ProgressBar,
  Chip,
  Portal,
  Dialog,
  TextInput,
} from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { useNavigation } from '@react-navigation/native';
import { fadeIn, slideUp, bounceIn } from '../utils/animations';

const { width } = Dimensions.get('window');

const STUDY_MODES = [
  {
    id: 1,
    title: 'Focus Session',
    icon: 'brain',
    color: '#FF6B6B',
    description: 'Deep focus with app blocking',
  },
  {
    id: 2,
    title: 'Study Timer',
    icon: 'book-clock',
    color: '#4ECDC4',
    description: 'Pomodoro technique',
  },
  {
    id: 3,
    title: 'Group Study',
    icon: 'account-group',
    color: '#45B7D1',
    description: 'Study with friends',
  },
];

const QUICK_ACTIONS = [
  {
    id: 1,
    title: 'Block Apps',
    icon: 'cellphone-lock',
    color: '#FF9F43',
    screen: 'AppLock',
  },
  {
    id: 2,
    title: 'Study Notes',
    icon: 'notebook',
    color: '#6C5CE7',
    screen: 'Notes',
  },
  {
    id: 3,
    title: 'Schedule',
    icon: 'calendar-clock',
    color: '#26de81',
    screen: 'Schedule',
  },
  {
    id: 4,
    title: 'Analytics',
    icon: 'chart-box',
    color: '#778ca3',
    screen: 'Analytics',
  },
];

const DashboardScreen = () => {
  const theme = useTheme();
  const navigation = useNavigation();
  const [showQuickStart, setShowQuickStart] = useState(false);
  const [sessionDuration, setSessionDuration] = useState('25');
  const [sessionTask, setSessionTask] = useState('');

  // Animation values
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const scaleAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    fadeIn(fadeAnim);
    slideUp(slideAnim);
    bounceIn(scaleAnim);
  }, []);

  const handleQuickStart = () => {
    // Implement quick start session
    navigation.navigate('FocusSession', {
      duration: parseInt(sessionDuration),
      task: sessionTask,
    });
    setShowQuickStart(false);
  };

  const renderHeader = () => (
    <LinearGradient
      colors={['#4834d4', '#686de0']}
      style={styles.header}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <View style={styles.headerContent}>
        <View>
          <Text style={styles.greeting}>Hello, Student!</Text>
          <Text style={styles.subtitle}>Ready to achieve your goals?</Text>
        </View>
        <IconButton
          icon="account-circle"
          size={40}
          iconColor="#fff"
          onPress={() => navigation.navigate('Settings')}
        />
      </View>
      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>4.5h</Text>
          <Text style={styles.statLabel}>Focus Time</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>85%</Text>
          <Text style={styles.statLabel}>Productivity</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>12</Text>
          <Text style={styles.statLabel}>Tasks Done</Text>
        </View>
      </View>
    </LinearGradient>
  );

  const renderStudyModes = () => (
    <View style={styles.section}>
      <Text variant="titleLarge" style={styles.sectionTitle}>
        Study Modes
      </Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.modesContainer}
      >
        {STUDY_MODES.map((mode) => (
          <TouchableOpacity
            key={mode.id}
            onPress={() => navigation.navigate('FocusSession', { mode: mode.id })}
          >
            <LinearGradient
              colors={[mode.color, mode.color + '99']}
              style={styles.modeCard}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <MaterialCommunityIcons
                name={mode.icon}
                size={32}
                color="#fff"
                style={styles.modeIcon}
              />
              <Text style={styles.modeTitle}>{mode.title}</Text>
              <Text style={styles.modeDescription}>{mode.description}</Text>
            </LinearGradient>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );

  const renderQuickActions = () => (
    <View style={styles.section}>
      <Text variant="titleLarge" style={styles.sectionTitle}>
        Quick Actions
      </Text>
      <View style={styles.actionsGrid}>
        {QUICK_ACTIONS.map((action) => (
          <TouchableOpacity
            key={action.id}
            onPress={() => navigation.navigate(action.screen)}
            style={styles.actionItem}
          >
            <Surface style={[styles.actionButton, { backgroundColor: action.color }]}>
              <MaterialCommunityIcons name={action.icon} size={28} color="#fff" />
            </Surface>
            <Text style={styles.actionTitle}>{action.title}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  const renderUpcomingTasks = () => (
    <Card style={styles.tasksCard}>
      <Card.Content>
        <Text variant="titleLarge" style={styles.sectionTitle}>
          Upcoming Tasks
        </Text>
        <View style={styles.taskList}>
          <View style={styles.taskItem}>
            <View style={styles.taskLeft}>
              <MaterialCommunityIcons name="checkbox-blank-circle" size={12} color="#FF6B6B" />
              <Text style={styles.taskText}>Math Assignment</Text>
            </View>
            <Chip compact mode="outlined" textStyle={{ color: '#FF6B6B' }}>
              2h left
            </Chip>
          </View>
          <View style={styles.taskItem}>
            <View style={styles.taskLeft}>
              <MaterialCommunityIcons name="checkbox-blank-circle" size={12} color="#4ECDC4" />
              <Text style={styles.taskText}>Physics Study</Text>
            </View>
            <Chip compact mode="outlined" textStyle={{ color: '#4ECDC4' }}>
              Today
            </Chip>
          </View>
        </View>
      </Card.Content>
    </Card>
  );

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <Animated.View
          style={{
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }],
          }}
        >
          {renderHeader()}

          <View style={styles.content}>
            <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
              <Button
                mode="contained"
                onPress={() => setShowQuickStart(true)}
                style={styles.quickStartButton}
                icon="play-circle"
              >
                Quick Start Session
              </Button>
            </Animated.View>

            {renderStudyModes()}
            {renderQuickActions()}
            {renderUpcomingTasks()}
          </View>
        </Animated.View>
      </ScrollView>

      <Portal>
        <Dialog visible={showQuickStart} onDismiss={() => setShowQuickStart(false)}>
          <Dialog.Title>Quick Start Session</Dialog.Title>
          <Dialog.Content>
            <TextInput
              label="Duration (minutes)"
              value={sessionDuration}
              onChangeText={setSessionDuration}
              keyboardType="numeric"
              mode="outlined"
              style={styles.dialogInput}
            />
            <TextInput
              label="What are you working on?"
              value={sessionTask}
              onChangeText={setSessionTask}
              mode="outlined"
              style={styles.dialogInput}
            />
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setShowQuickStart(false)}>Cancel</Button>
            <Button onPress={handleQuickStart}>Start</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollView: {
    flex: 1,
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
    paddingHorizontal: 20,
  },
  greeting: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
  },
  subtitle: {
    fontSize: 16,
    color: '#fff',
    opacity: 0.8,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 20,
    marginTop: 20,
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  statLabel: {
    fontSize: 12,
    color: '#fff',
    opacity: 0.8,
  },
  content: {
    padding: 20,
  },
  quickStartButton: {
    marginVertical: 10,
    borderRadius: 12,
  },
  section: {
    marginVertical: 16,
  },
  sectionTitle: {
    marginBottom: 16,
    fontWeight: 'bold',
  },
  modesContainer: {
    marginHorizontal: -20,
    paddingHorizontal: 20,
  },
  modeCard: {
    width: width * 0.7,
    padding: 20,
    marginRight: 16,
    borderRadius: 16,
    elevation: 4,
  },
  modeIcon: {
    marginBottom: 12,
  },
  modeTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  modeDescription: {
    fontSize: 14,
    color: '#fff',
    opacity: 0.8,
  },
  actionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginHorizontal: -8,
  },
  actionItem: {
    width: '25%',
    alignItems: 'center',
    marginBottom: 16,
  },
  actionButton: {
    width: 56,
    height: 56,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    marginBottom: 8,
  },
  actionTitle: {
    fontSize: 12,
    textAlign: 'center',
  },
  tasksCard: {
    marginVertical: 16,
    borderRadius: 16,
    elevation: 4,
  },
  taskList: {
    marginTop: 12,
  },
  taskItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  taskLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  taskText: {
    marginLeft: 12,
    fontSize: 16,
  },
  dialogInput: {
    marginBottom: 16,
  },
});

export default DashboardScreen;
