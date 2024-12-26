import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Animated,
  TouchableOpacity,
  Platform,
} from 'react-native';
import {
  Surface,
  Text,
  List,
  Switch,
  Button,
  IconButton,
  Searchbar,
  Chip,
  Portal,
  Dialog,
  useTheme,
} from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { fadeIn, slideUp } from '../utils/animations';

// Mock installed apps (In real implementation, this would come from native modules)
const INSTALLED_APPS = [
  {
    id: '1',
    name: 'Instagram',
    icon: 'instagram',
    category: 'social',
    isBlocked: true,
  },
  {
    id: '2',
    name: 'Facebook',
    icon: 'facebook',
    category: 'social',
    isBlocked: true,
  },
  {
    id: '3',
    name: 'YouTube',
    icon: 'youtube',
    category: 'entertainment',
    isBlocked: true,
  },
  {
    id: '4',
    name: 'TikTok',
    icon: 'music-note',
    category: 'social',
    isBlocked: false,
  },
  {
    id: '5',
    name: 'WhatsApp',
    icon: 'whatsapp',
    category: 'communication',
    isBlocked: false,
  },
  {
    id: '6',
    name: 'Gmail',
    icon: 'gmail',
    category: 'productivity',
    isBlocked: false,
  },
];

const CATEGORIES = [
  { label: 'All', value: 'all' },
  { label: 'Social', value: 'social' },
  { label: 'Entertainment', value: 'entertainment' },
  { label: 'Communication', value: 'communication' },
  { label: 'Productivity', value: 'productivity' },
];

const AppLockScreen = () => {
  const theme = useTheme();
  const [apps, setApps] = useState(INSTALLED_APPS);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showPermissionDialog, setShowPermissionDialog] = useState(false);

  // Animation values
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;

  useEffect(() => {
    fadeIn(fadeAnim);
    slideUp(slideAnim);
  }, []);

  const toggleAppBlock = (appId) => {
    setApps(apps.map(app =>
      app.id === appId
        ? { ...app, isBlocked: !app.isBlocked }
        : app
    ));
  };

  const filteredApps = apps.filter(app =>
    (selectedCategory === 'all' || app.category === selectedCategory) &&
    app.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const blockedAppsCount = apps.filter(app => app.isBlocked).length;

  const requestPermission = () => {
    // In real implementation, this would request system permissions
    setShowPermissionDialog(false);
  };

  return (
    <View style={styles.container}>
      <Animated.View style={{
        opacity: fadeAnim,
        transform: [{ translateY: slideAnim }],
      }}>
        <LinearGradient
          colors={['#4834d4', '#686de0']}
          style={styles.header}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <View style={styles.headerContent}>
            <View>
              <Text style={styles.headerTitle}>App Blocker</Text>
              <Text style={styles.headerSubtitle}>
                {blockedAppsCount} apps blocked
              </Text>
            </View>
            <IconButton
              icon="cog"
              iconColor="#fff"
              size={24}
              onPress={() => {}}
            />
          </View>
        </LinearGradient>

        <View style={styles.content}>
          <Searchbar
            placeholder="Search apps..."
            onChangeText={setSearchQuery}
            value={searchQuery}
            style={styles.searchBar}
          />

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.categoriesContainer}
          >
            {CATEGORIES.map((category) => (
              <Chip
                key={category.value}
                selected={selectedCategory === category.value}
                onPress={() => setSelectedCategory(category.value)}
                style={styles.categoryChip}
              >
                {category.label}
              </Chip>
            ))}
          </ScrollView>

          <Surface style={styles.appsContainer}>
            <List.Section>
              <List.Subheader>Installed Apps</List.Subheader>
              {filteredApps.map((app) => (
                <List.Item
                  key={app.id}
                  title={app.name}
                  left={() => (
                    <MaterialCommunityIcons
                      name={app.icon}
                      size={24}
                      color={theme.colors.primary}
                      style={styles.appIcon}
                    />
                  )}
                  right={() => (
                    <Switch
                      value={app.isBlocked}
                      onValueChange={() => toggleAppBlock(app.id)}
                    />
                  )}
                />
              ))}
            </List.Section>
          </Surface>

          <Surface style={styles.infoCard}>
            <MaterialCommunityIcons
              name="information"
              size={24}
              color={theme.colors.primary}
            />
            <Text style={styles.infoText}>
              Blocked apps will be inaccessible during focus sessions. You can modify
              this list anytime.
            </Text>
          </Surface>
        </View>

        <Portal>
          <Dialog
            visible={showPermissionDialog}
            onDismiss={() => setShowPermissionDialog(false)}
          >
            <Dialog.Title>Permission Required</Dialog.Title>
            <Dialog.Content>
              <Text>
                To block apps, FocusLock needs permission to manage your device's
                app usage. This permission is required for the app blocking feature
                to work.
              </Text>
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={() => setShowPermissionDialog(false)}>
                Cancel
              </Button>
              <Button onPress={requestPermission}>Grant Permission</Button>
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
    paddingHorizontal: 20,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#fff',
    opacity: 0.8,
  },
  content: {
    padding: 20,
  },
  searchBar: {
    marginBottom: 16,
    borderRadius: 12,
    elevation: 2,
  },
  categoriesContainer: {
    marginBottom: 16,
  },
  categoryChip: {
    marginRight: 8,
  },
  appsContainer: {
    borderRadius: 12,
    elevation: 2,
    marginBottom: 16,
  },
  appIcon: {
    marginRight: 8,
  },
  infoCard: {
    padding: 16,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    elevation: 2,
  },
  infoText: {
    flex: 1,
    marginLeft: 12,
    color: '#666',
  },
});

export default AppLockScreen;
