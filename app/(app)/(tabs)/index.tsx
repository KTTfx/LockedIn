import React from 'react';
import { View, StyleSheet, Platform, StatusBar, ScrollView } from 'react-native';
import { Text, Card, Button, IconButton, Surface, useTheme, FAB } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { router } from 'expo-router';

const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBar.currentHeight;

function formatTime(minutes: number): string {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
}

export default function HomeScreen() {
  const focusTime = 275; // Example: 4h 35m

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#000B18', '#0A1128', '#1B2838', '#1A365D']}
        style={StyleSheet.absoluteFill}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      />

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <Animated.View 
          entering={FadeInDown.delay(200).springify()}
          style={styles.header}
        >
          <View style={styles.headerTop}>
            <Text style={styles.greeting}>Welcome back, User!</Text>
            <IconButton
              icon="bell"
              iconColor="#60A5FA"
              size={24}
              onPress={() => {}}
              style={styles.notificationButton}
            />
          </View>
        </Animated.View>

        {/* Focus Time Card */}
        <Animated.View 
          entering={FadeInDown.delay(400).springify()}
        >
          <Surface style={styles.focusCard}>
            <View style={styles.focusCardContent}>
              <View>
                <Text style={styles.focusTimeLabel}>Total Focus Time</Text>
                <Text style={styles.focusTimeValue}>{formatTime(focusTime)}</Text>
              </View>
              <MaterialCommunityIcons
                name="timer-outline"
                size={48}
                color="#60A5FA"
              />
            </View>
          </Surface>
        </Animated.View>

        {/* Stats Cards */}
        <Animated.View 
          entering={FadeInUp.delay(800).springify()}
          style={styles.statsContainer}
        >
          <Text style={styles.sectionTitle}>Your Stats</Text>
          <View style={styles.statsGrid}>
            <Surface style={styles.statCard}>
              <MaterialCommunityIcons name="calendar-check" size={32} color="#60A5FA" />
              <Text style={styles.statValue}>12</Text>
              <Text style={styles.statLabel}>Days Streak</Text>
            </Surface>
            <Surface style={styles.statCard}>
              <MaterialCommunityIcons name="target" size={32} color="#60A5FA" />
              <Text style={styles.statValue}>85%</Text>
              <Text style={styles.statLabel}>Success Rate</Text>
            </Surface>
            <Surface style={styles.statCard}>
              <MaterialCommunityIcons name="trophy" size={32} color="#60A5FA" />
              <Text style={styles.statValue}>8</Text>
              <Text style={styles.statLabel}>Achievements</Text>
            </Surface>
            <Surface style={styles.statCard}>
              <MaterialCommunityIcons name="chart-line" size={32} color="#60A5FA" />
              <Text style={styles.statValue}>4.5h</Text>
              <Text style={styles.statLabel}>Avg. Daily</Text>
            </Surface>
          </View>
        </Animated.View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000B18',
    paddingTop: STATUSBAR_HEIGHT,
  },
  scrollView: {
    flex: 1,
  },
  header: {
    padding: 20,
  },
  headerTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  greeting: {
    fontSize: 24,
    fontWeight: '600',
    color: '#FFFFFF',
    letterSpacing: 0.5,
  },
  notificationButton: {
    backgroundColor: 'rgba(96, 165, 250, 0.1)',
  },
  focusCard: {
    margin: 20,
    padding: 20,
    borderRadius: 16,
    backgroundColor: 'rgba(96, 165, 250, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(96, 165, 250, 0.2)',
  },
  focusCardContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  focusTimeLabel: {
    fontSize: 15,
    color: '#93C5FD',
    marginBottom: 8,
    letterSpacing: 0.3,
    opacity: 0.9,
  },
  focusTimeValue: {
    fontSize: 32,
    fontWeight: '600',
    color: '#FFFFFF',
    letterSpacing: 0.5,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '500',
    color: '#FFFFFF',
    marginBottom: 16,
    letterSpacing: 0.3,
    opacity: 0.95,
  },
  statsContainer: {
    padding: 20,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    justifyContent: 'space-between',
  },
  statCard: {
    width: '48%',
    padding: 16,
    borderRadius: 16,
    backgroundColor: 'rgba(96, 165, 250, 0.1)',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(96, 165, 250, 0.2)',
    marginBottom: 12,
  },
  statValue: {
    fontSize: 22,
    fontWeight: '600',
    color: '#FFFFFF',
    marginVertical: 8,
    letterSpacing: 0.3,
  },
  statLabel: {
    fontSize: 13,
    color: '#93C5FD',
    letterSpacing: 0.2,
    opacity: 0.9,
  },
});
