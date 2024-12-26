import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Dimensions,
} from 'react-native';
import {
  Surface,
  Text,
  SegmentedButtons,
  Card,
  useTheme,
} from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';

// Mock data - replace with real data
const mockData = {
  daily: {
    focusTime: '4h 30m',
    completedTasks: 8,
    sessions: 5,
    streak: 3,
  },
  weekly: {
    focusTime: '23h 45m',
    completedTasks: 42,
    sessions: 25,
    streak: 3,
  },
  monthly: {
    focusTime: '95h 15m',
    completedTasks: 156,
    sessions: 98,
    streak: 3,
  },
};

const AnalyticsScreen = () => {
  const theme = useTheme();
  const [timeframe, setTimeframe] = useState('daily');

  const stats = mockData[timeframe];

  const StatCard = ({ icon, title, value, color }) => (
    <Card style={styles.statCard}>
      <Card.Content>
        <MaterialCommunityIcons
          name={icon}
          size={24}
          color={color}
          style={styles.statIcon}
        />
        <Text variant="titleMedium">{title}</Text>
        <Text variant="headlineSmall" style={{ color }}>
          {value}
        </Text>
      </Card.Content>
    </Card>
  );

  return (
    <ScrollView style={styles.container}>
      <Surface style={styles.header}>
        <Text variant="headlineMedium">Analytics</Text>
      </Surface>

      <View style={styles.timeframeSelector}>
        <SegmentedButtons
          value={timeframe}
          onValueChange={setTimeframe}
          buttons={[
            { value: 'daily', label: 'Daily' },
            { value: 'weekly', label: 'Weekly' },
            { value: 'monthly', label: 'Monthly' },
          ]}
        />
      </View>

      <View style={styles.statsGrid}>
        <StatCard
          icon="clock-outline"
          title="Focus Time"
          value={stats.focusTime}
          color="#2196F3"
        />
        <StatCard
          icon="check-circle-outline"
          title="Tasks Done"
          value={stats.completedTasks}
          color="#4CAF50"
        />
        <StatCard
          icon="lightning-bolt"
          title="Sessions"
          value={stats.sessions}
          color="#FF9800"
        />
        <StatCard
          icon="fire"
          title="Streak"
          value={`${stats.streak} days`}
          color="#F44336"
        />
      </View>

      {/* Placeholder for charts - you'll need to add a charting library */}
      <Card style={styles.chartCard}>
        <Card.Content>
          <Text variant="titleMedium">Focus Time Trend</Text>
          <View style={styles.chartPlaceholder}>
            <Text>Chart will be displayed here</Text>
          </View>
        </Card.Content>
      </Card>

      <Card style={styles.chartCard}>
        <Card.Content>
          <Text variant="titleMedium">Productivity Score</Text>
          <View style={styles.chartPlaceholder}>
            <Text>Chart will be displayed here</Text>
          </View>
        </Card.Content>
      </Card>
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
  timeframeSelector: {
    padding: 16,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 8,
    justifyContent: 'space-between',
  },
  statCard: {
    width: (Dimensions.get('window').width - 48) / 2,
    margin: 8,
    borderRadius: 8,
  },
  statIcon: {
    marginBottom: 8,
  },
  chartCard: {
    margin: 16,
    borderRadius: 8,
  },
  chartPlaceholder: {
    height: 200,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    marginTop: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default AnalyticsScreen;
