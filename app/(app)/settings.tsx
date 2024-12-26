import React from 'react';
import { View, StyleSheet, Platform, StatusBar, ScrollView } from 'react-native';
import { Text, List, Switch, Button, Divider, IconButton } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';

const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBar.currentHeight;

export default function SettingsScreen() {
  const [notifications, setNotifications] = React.useState(true);
  const [soundEnabled, setSoundEnabled] = React.useState(true);
  const [darkMode, setDarkMode] = React.useState(true);
  const [autoStart, setAutoStart] = React.useState(false);

  const handleSignOut = async () => {
    // Add any cleanup or state reset logic here
    router.replace('/(auth)/sign-in');
  };

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
            <Text style={styles.title}>Settings</Text>
            <View style={{ width: 40 }} /> {/* Spacer for alignment */}
          </View>
        </Animated.View>

        <Animated.View 
          entering={FadeInUp.delay(400).springify()}
          style={styles.content}
        >
          {/* Focus Settings */}
          <List.Section>
            <List.Subheader style={styles.sectionHeader}>Focus Settings</List.Subheader>
            <List.Item
              title="Default Focus Duration"
              description="25 minutes"
              left={props => <List.Icon {...props} icon="timer" color="#60A5FA" />}
              right={props => <MaterialCommunityIcons name="chevron-right" size={24} color="#60A5FA" />}
              style={styles.listItem}
              titleStyle={styles.listTitle}
              descriptionStyle={styles.listDescription}
            />
            <List.Item
              title="Break Duration"
              description="5 minutes"
              left={props => <List.Icon {...props} icon="timer-sand" color="#60A5FA" />}
              right={props => <MaterialCommunityIcons name="chevron-right" size={24} color="#60A5FA" />}
              style={styles.listItem}
              titleStyle={styles.listTitle}
              descriptionStyle={styles.listDescription}
            />
            <List.Item
              title="Auto-start Breaks"
              left={props => <List.Icon {...props} icon="auto-fix" color="#60A5FA" />}
              right={props => (
                <Switch
                  value={autoStart}
                  onValueChange={setAutoStart}
                  color="#2563EB"
                />
              )}
              style={styles.listItem}
              titleStyle={styles.listTitle}
            />
          </List.Section>

          <Divider style={styles.divider} />

          {/* Notifications */}
          <List.Section>
            <List.Subheader style={styles.sectionHeader}>Notifications</List.Subheader>
            <List.Item
              title="Push Notifications"
              left={props => <List.Icon {...props} icon="bell" color="#60A5FA" />}
              right={props => (
                <Switch
                  value={notifications}
                  onValueChange={setNotifications}
                  color="#2563EB"
                />
              )}
              style={styles.listItem}
              titleStyle={styles.listTitle}
            />
            <List.Item
              title="Sound Effects"
              left={props => <List.Icon {...props} icon="volume-high" color="#60A5FA" />}
              right={props => (
                <Switch
                  value={soundEnabled}
                  onValueChange={setSoundEnabled}
                  color="#2563EB"
                />
              )}
              style={styles.listItem}
              titleStyle={styles.listTitle}
            />
          </List.Section>

          <Divider style={styles.divider} />

          {/* Appearance */}
          <List.Section>
            <List.Subheader style={styles.sectionHeader}>Appearance</List.Subheader>
            <List.Item
              title="Dark Mode"
              left={props => <List.Icon {...props} icon="theme-light-dark" color="#60A5FA" />}
              right={props => (
                <Switch
                  value={darkMode}
                  onValueChange={setDarkMode}
                  color="#2563EB"
                />
              )}
              style={styles.listItem}
              titleStyle={styles.listTitle}
            />
          </List.Section>

          <Divider style={styles.divider} />

          {/* Account */}
          <List.Section>
            <List.Subheader style={styles.sectionHeader}>Account</List.Subheader>
            <List.Item
              title="Profile Settings"
              left={props => <List.Icon {...props} icon="account-cog" color="#60A5FA" />}
              right={props => <MaterialCommunityIcons name="chevron-right" size={24} color="#60A5FA" />}
              style={styles.listItem}
              titleStyle={styles.listTitle}
            />
            <List.Item
              title="Privacy Policy"
              left={props => <List.Icon {...props} icon="shield-check" color="#60A5FA" />}
              right={props => <MaterialCommunityIcons name="chevron-right" size={24} color="#60A5FA" />}
              style={styles.listItem}
              titleStyle={styles.listTitle}
            />
          </List.Section>

          <View style={styles.signOutContainer}>
            <Button
              mode="contained"
              onPress={handleSignOut}
              style={styles.signOutButton}
              labelStyle={styles.signOutLabel}
              icon="logout"
            >
              Sign Out
            </Button>
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
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: '#FFFFFF',
    letterSpacing: 0.5,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  sectionHeader: {
    color: '#60A5FA',
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: 0.5,
    marginBottom: 8,
  },
  listItem: {
    paddingVertical: 8,
    backgroundColor: 'transparent',
  },
  listTitle: {
    color: '#FFFFFF',
    fontSize: 16,
    letterSpacing: 0.3,
  },
  listDescription: {
    color: '#93C5FD',
    letterSpacing: 0.2,
  },
  divider: {
    backgroundColor: 'rgba(96, 165, 250, 0.2)',
    marginVertical: 16,
  },
  signOutContainer: {
    paddingVertical: 32,
    alignItems: 'center',
  },
  signOutButton: {
    backgroundColor: '#DC2626',
    borderRadius: 12,
    width: '100%',
  },
  signOutLabel: {
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: 0.3,
    color: '#FFFFFF',
  },
});
