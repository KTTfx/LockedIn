import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
} from 'react-native';
import {
  Surface,
  Text,
  Switch,
  List,
  Button,
  Divider,
  useTheme,
  Portal,
  Dialog,
  TextInput,
} from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import {
  toggleTheme,
  updateNotificationSettings,
  updateDefaultDurations,
  toggleSound,
  toggleVibration,
  toggleAutoStartBreaks,
  updateDailyGoal,
} from '../store/slices/settingsSlice';
import { logoutUser } from '../store/slices/authSlice';

const SettingsScreen = ({ navigation }) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const settings = useSelector((state) => state.settings);
  const [showProfileDialog, setShowProfileDialog] = useState(false);
  const [showPasswordDialog, setShowPasswordDialog] = useState(false);
  const [showBlockedAppsDialog, setShowBlockedAppsDialog] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [profileName, setProfileName] = useState('John Doe');
  const [profileEmail, setProfileEmail] = useState('user@example.com');

  const handleLogout = async () => {
    await dispatch(logoutUser());
    navigation.replace('Auth');
  };

  const handlePasswordChange = () => {
    // TODO: Implement password change
    setShowPasswordDialog(false);
    setNewPassword('');
    setCurrentPassword('');
  };

  const handleProfileUpdate = () => {
    // TODO: Implement profile update
    setShowProfileDialog(false);
  };

  return (
    <ScrollView style={styles.container}>
      <Surface style={styles.header}>
        <Text variant="headlineMedium">Settings</Text>
      </Surface>

      <Surface style={styles.section}>
        <List.Section>
          <List.Subheader>Profile</List.Subheader>
          <List.Item
            title="Edit Profile"
            description="Change your name and email"
            left={props => <List.Icon {...props} icon="account" />}
            onPress={() => setShowProfileDialog(true)}
          />
          <List.Item
            title="Change Password"
            left={props => <List.Icon {...props} icon="key" />}
            onPress={() => setShowPasswordDialog(true)}
          />
        </List.Section>

        <Divider />

        <List.Section>
          <List.Subheader>Focus Settings</List.Subheader>
          <List.Item
            title="Focus Duration"
            description={`${settings.defaultSessionDuration / 60} minutes`}
            left={props => <List.Icon {...props} icon="timer" />}
            onPress={() => {
              // TODO: Show duration picker
            }}
          />
          <List.Item
            title="Break Duration"
            description={`${settings.defaultBreakDuration / 60} minutes`}
            left={props => <List.Icon {...props} icon="timer-sand" />}
            onPress={() => {
              // TODO: Show duration picker
            }}
          />
          <List.Item
            title="Manage Blocked Apps"
            left={props => <List.Icon {...props} icon="block-helper" />}
            onPress={() => setShowBlockedAppsDialog(true)}
          />
        </List.Section>

        <Divider />

        <List.Section>
          <List.Subheader>Appearance</List.Subheader>
          <List.Item
            title="Dark Theme"
            left={props => <List.Icon {...props} icon="theme-light-dark" />}
            right={() => (
              <Switch
                value={settings.theme === 'dark'}
                onValueChange={() => dispatch(toggleTheme())}
              />
            )}
          />
        </List.Section>

        <Divider />

        <List.Section>
          <List.Subheader>Notifications</List.Subheader>
          <List.Item
            title="Session Notifications"
            left={props => <List.Icon {...props} icon="bell" />}
            right={() => (
              <Switch
                value={settings.notifications.sessionEnd}
                onValueChange={(value) =>
                  dispatch(updateNotificationSettings({ sessionEnd: value }))
                }
              />
            )}
          />
          <List.Item
            title="Break Notifications"
            left={props => <List.Icon {...props} icon="bell-ring" />}
            right={() => (
              <Switch
                value={settings.notifications.breakEnd}
                onValueChange={(value) =>
                  dispatch(updateNotificationSettings({ breakEnd: value }))
                }
              />
            )}
          />
        </List.Section>

        <Divider />

        <List.Section>
          <List.Subheader>Support</List.Subheader>
          <List.Item
            title="Help Center"
            left={props => <List.Icon {...props} icon="help-circle" />}
            onPress={() => navigation.navigate('Help')}
          />
          <List.Item
            title="Contact Support"
            left={props => <List.Icon {...props} icon="email" />}
            onPress={() => navigation.navigate('Support')}
          />
        </List.Section>
      </Surface>

      <Button
        mode="outlined"
        onPress={handleLogout}
        style={styles.logoutButton}
        icon="logout"
      >
        Log Out
      </Button>

      <Text style={styles.version}>Version 1.0.0</Text>

      {/* Profile Dialog */}
      <Portal>
        <Dialog visible={showProfileDialog} onDismiss={() => setShowProfileDialog(false)}>
          <Dialog.Title>Edit Profile</Dialog.Title>
          <Dialog.Content>
            <TextInput
              label="Name"
              value={profileName}
              onChangeText={setProfileName}
              mode="outlined"
              style={styles.dialogInput}
            />
            <TextInput
              label="Email"
              value={profileEmail}
              onChangeText={setProfileEmail}
              mode="outlined"
              keyboardType="email-address"
              style={styles.dialogInput}
            />
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setShowProfileDialog(false)}>Cancel</Button>
            <Button onPress={handleProfileUpdate}>Save</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>

      {/* Password Dialog */}
      <Portal>
        <Dialog visible={showPasswordDialog} onDismiss={() => setShowPasswordDialog(false)}>
          <Dialog.Title>Change Password</Dialog.Title>
          <Dialog.Content>
            <TextInput
              label="Current Password"
              value={currentPassword}
              onChangeText={setCurrentPassword}
              mode="outlined"
              secureTextEntry
              style={styles.dialogInput}
            />
            <TextInput
              label="New Password"
              value={newPassword}
              onChangeText={setNewPassword}
              mode="outlined"
              secureTextEntry
              style={styles.dialogInput}
            />
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setShowPasswordDialog(false)}>Cancel</Button>
            <Button onPress={handlePasswordChange}>Update</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
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
  section: {
    margin: 16,
    borderRadius: 8,
    elevation: 2,
  },
  logoutButton: {
    margin: 16,
  },
  version: {
    textAlign: 'center',
    color: '#666',
    marginBottom: 24,
  },
  dialogInput: {
    marginBottom: 12,
  },
});

export default SettingsScreen;
