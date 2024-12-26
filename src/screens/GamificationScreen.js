import React, { useEffect, useRef } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Animated,
} from 'react-native';
import {
  Surface,
  Text,
  ProgressBar,
  Card,
  Avatar,
  Button,
  useTheme,
  Portal,
  Dialog,
} from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { bounceIn, fadeIn, pulse } from '../utils/animations';

const ACHIEVEMENTS = [
  {
    id: 1,
    title: 'Early Bird',
    description: 'Complete 5 focus sessions before 10 AM',
    icon: 'weather-sunny',
    progress: 0.6,
    color: '#FFD700',
    points: 500,
  },
  {
    id: 2,
    title: 'Productivity Master',
    description: 'Complete 100 focus sessions',
    icon: 'star',
    progress: 0.8,
    color: '#4CAF50',
    points: 1000,
  },
  {
    id: 3,
    title: 'No Distractions',
    description: 'Complete 10 sessions without breaks',
    icon: 'shield-check',
    progress: 0.3,
    color: '#2196F3',
    points: 750,
  },
  {
    id: 4,
    title: 'Weekend Warrior',
    description: 'Complete 3 sessions on a weekend',
    icon: 'calendar-weekend',
    progress: 1,
    color: '#9C27B0',
    points: 300,
    completed: true,
  },
  {
    id: 5,
    title: 'Night Owl',
    description: 'Complete 5 sessions after 8 PM',
    icon: 'weather-night',
    progress: 0.4,
    color: '#3F51B5',
    points: 500,
  },
  {
    id: 6,
    title: 'Marathon Runner',
    description: 'Complete a 2-hour focus session',
    icon: 'run-fast',
    progress: 0,
    color: '#FF5722',
    points: 1000,
  },
];

const REWARDS = [
  {
    id: 1,
    title: 'Premium Theme Pack',
    description: 'Unlock exclusive app themes',
    icon: 'palette',
    points: 1000,
    preview: ['#FF4081', '#7C4DFF', '#00BCD4'],
  },
  {
    id: 2,
    title: 'Custom Sound Pack',
    description: 'Unlock custom notification sounds',
    icon: 'music',
    points: 2000,
    preview: ['Zen', 'Forest', 'Ocean'],
  },
  {
    id: 3,
    title: 'Statistics Pro',
    description: 'Unlock advanced analytics',
    icon: 'chart-bar',
    points: 3000,
    features: ['Weekly Reports', 'Productivity Score', 'Time Analysis'],
  },
  {
    id: 4,
    title: 'Focus Expert Badge',
    description: 'Special profile badge',
    icon: 'shield-star',
    points: 5000,
    exclusive: true,
  },
];

const GamificationScreen = () => {
  const theme = useTheme();
  const userPoints = 1500;
  const userLevel = 5;
  
  // Animation values
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0)).current;
  const achievementAnims = useRef(ACHIEVEMENTS.map(() => new Animated.Value(0))).current;
  
  useEffect(() => {
    fadeIn(fadeAnim);
    bounceIn(scaleAnim);
    
    // Stagger animation for achievements
    Animated.stagger(100, 
      achievementAnims.map(anim => 
        Animated.spring(anim, {
          toValue: 1,
          tension: 40,
          friction: 7,
          useNativeDriver: true,
        })
      )
    ).start();
  }, []);

  const Achievement = ({ title, description, icon, progress, color, points, completed, index }) => (
    <Animated.View style={{
      transform: [{ scale: achievementAnims[index] }],
      opacity: achievementAnims[index],
    }}>
      <Card style={[styles.achievementCard, completed && styles.completedCard]}>
        <Card.Content>
          <View style={styles.achievementHeader}>
            <MaterialCommunityIcons
              name={icon}
              size={32}
              color={color}
              style={styles.achievementIcon}
            />
            <View style={styles.achievementText}>
              <Text variant="titleMedium">{title}</Text>
              <Text variant="bodyMedium">{description}</Text>
              <Text variant="bodySmall" style={{ color: theme.colors.primary }}>
                {points} points
              </Text>
            </View>
            {completed && (
              <MaterialCommunityIcons
                name="check-circle"
                size={24}
                color={theme.colors.primary}
              />
            )}
          </View>
          <ProgressBar
            progress={progress}
            color={color}
            style={styles.achievementProgress}
          />
          <Text style={styles.progressText}>
            {completed ? 'Completed!' : `${Math.round(progress * 100)}%`}
          </Text>
        </Card.Content>
      </Card>
    </Animated.View>
  );

  const Reward = ({ title, description, icon, points, preview, features, exclusive }) => (
    <Card style={styles.rewardCard}>
      <Card.Content>
        <View style={styles.rewardHeader}>
          <MaterialCommunityIcons
            name={icon}
            size={32}
            color={theme.colors.primary}
          />
          <View style={styles.rewardText}>
            <Text variant="titleMedium">{title}</Text>
            <Text variant="bodyMedium">{description}</Text>
            {preview && (
              <View style={styles.previewContainer}>
                {preview.map((item, index) => (
                  <View
                    key={index}
                    style={[
                      styles.previewItem,
                      typeof item === 'string' && !item.startsWith('#')
                        ? { backgroundColor: theme.colors.surfaceVariant }
                        : { backgroundColor: item },
                    ]}
                  >
                    {typeof item === 'string' && !item.startsWith('#') && (
                      <Text variant="bodySmall">{item}</Text>
                    )}
                  </View>
                ))}
              </View>
            )}
          </View>
        </View>
        <Button
          mode="contained"
          disabled={userPoints < points}
          style={styles.rewardButton}
          icon={exclusive ? 'crown' : undefined}
        >
          {userPoints >= points ? 'Redeem' : `${points} points needed`}
        </Button>
      </Card.Content>
    </Card>
  );

  return (
    <ScrollView style={styles.container}>
      <Animated.View style={{ opacity: fadeAnim }}>
        <Surface style={styles.header}>
          <Text variant="headlineMedium">Achievements & Rewards</Text>
        </Surface>

        <Animated.View style={[styles.userStats, { transform: [{ scale: scaleAnim }] }]}>
          <Avatar.Icon
            size={64}
            icon="trophy"
            style={styles.levelIcon}
            color={theme.colors.primary}
          />
          <View style={styles.statsText}>
            <Text variant="titleLarge">Level {userLevel}</Text>
            <Text variant="bodyLarge">{userPoints} Points</Text>
            <ProgressBar
              progress={0.7}
              style={styles.levelProgress}
              color={theme.colors.primary}
            />
            <Text variant="bodySmall">
              {700} / {1000} XP to Level {userLevel + 1}
            </Text>
          </View>
        </Animated.View>

        <View style={styles.section}>
          <Text variant="titleLarge" style={styles.sectionTitle}>
            Achievements
          </Text>
          {ACHIEVEMENTS.map((achievement, index) => (
            <Achievement key={achievement.id} {...achievement} index={index} />
          ))}
        </View>

        <View style={styles.section}>
          <Text variant="titleLarge" style={styles.sectionTitle}>
            Available Rewards
          </Text>
          {REWARDS.map((reward) => (
            <Reward key={reward.id} {...reward} />
          ))}
        </View>
      </Animated.View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    padding: 16,
    elevation: 2,
  },
  userStats: {
    margin: 16,
    padding: 16,
    borderRadius: 8,
    elevation: 2,
    flexDirection: 'row',
    alignItems: 'center',
  },
  levelIcon: {
    backgroundColor: '#f0f0f0',
  },
  statsText: {
    marginLeft: 16,
    flex: 1,
  },
  levelProgress: {
    height: 4,
    borderRadius: 2,
    marginTop: 8,
    marginBottom: 4,
  },
  section: {
    padding: 16,
  },
  sectionTitle: {
    marginBottom: 16,
  },
  achievementCard: {
    marginBottom: 12,
    borderRadius: 8,
  },
  completedCard: {
    borderWidth: 1,
    borderColor: '#4CAF50',
  },
  achievementHeader: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  achievementIcon: {
    marginRight: 12,
  },
  achievementText: {
    flex: 1,
  },
  achievementProgress: {
    height: 8,
    borderRadius: 4,
  },
  progressText: {
    textAlign: 'right',
    marginTop: 4,
    color: '#666',
  },
  rewardCard: {
    marginBottom: 12,
    borderRadius: 8,
  },
  rewardHeader: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  rewardText: {
    flex: 1,
    marginLeft: 12,
  },
  rewardButton: {
    borderRadius: 4,
  },
  previewContainer: {
    flexDirection: 'row',
    marginTop: 8,
    gap: 8,
  },
  previewItem: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default GamificationScreen;
