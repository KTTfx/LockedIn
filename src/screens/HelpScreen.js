import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Animated,
  Dimensions,
} from 'react-native';
import {
  Surface,
  Text,
  List,
  Searchbar,
  Button,
  Card,
  Portal,
  Dialog,
  TextInput,
  useTheme,
  Chip,
  IconButton,
} from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { fadeIn, slideUp } from '../utils/animations';

const FAQ_DATA = [
  {
    question: 'How do focus sessions work?',
    answer: 'Focus sessions are timed periods where you concentrate on a specific task. The app blocks distracting apps and tracks your progress. You can customize the duration in settings.',
    icon: 'timer',
    category: 'basics',
  },
  {
    question: 'What happens if I end a session early?',
    answer: 'Ending a session early requires a small fee to maintain accountability. This helps ensure you stay committed to your focus goals.',
    icon: 'clock-alert',
    category: 'sessions',
  },
  {
    question: 'How do I earn points and rewards?',
    answer: 'You earn points by completing focus sessions, maintaining streaks, and achieving goals. These points can be redeemed for rewards in the Rewards section.',
    icon: 'trophy',
    category: 'rewards',
  },
  {
    question: 'Can I customize blocked apps?',
    answer: 'Yes, you can manage your blocked apps list in the Settings section. This allows you to customize which apps are restricted during focus sessions.',
    icon: 'cellphone-lock',
    category: 'settings',
  },
  {
    question: 'How do breaks work?',
    answer: 'Breaks are scheduled rest periods between focus sessions. You can customize their duration in settings. During breaks, blocked apps become accessible again.',
    icon: 'coffee',
    category: 'sessions',
  },
  {
    question: 'What are achievement badges?',
    answer: 'Achievement badges are special rewards earned by completing specific challenges. They showcase your progress and dedication to maintaining focus.',
    icon: 'medal',
    category: 'rewards',
  },
  {
    question: 'How do I track my progress?',
    answer: 'Your progress is tracked in the Analytics section, showing daily, weekly, and monthly statistics. You can view focus time, completed tasks, and productivity trends.',
    icon: 'chart-line',
    category: 'basics',
  },
  {
    question: 'Can I sync across devices?',
    answer: 'Yes, your progress and settings sync automatically across all your devices when you\'re signed in to your account.',
    icon: 'sync',
    category: 'settings',
  },
];

const CATEGORIES = [
  { label: 'All', value: 'all', icon: 'apps' },
  { label: 'Basics', value: 'basics', icon: 'book-open-variant' },
  { label: 'Sessions', value: 'sessions', icon: 'timer' },
  { label: 'Rewards', value: 'rewards', icon: 'trophy' },
  { label: 'Settings', value: 'settings', icon: 'cog' },
];

const QUICK_TIPS = [
  {
    title: 'Start Small',
    description: 'Begin with 25-minute focus sessions and gradually increase duration.',
    icon: 'clock-start',
  },
  {
    title: 'Take Regular Breaks',
    description: 'Use the break time to stretch, hydrate, and reset your mind.',
    icon: 'coffee',
  },
  {
    title: 'Track Progress',
    description: 'Review your analytics weekly to identify peak productivity times.',
    icon: 'chart-line',
  },
];

const HelpScreen = () => {
  const theme = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [showContactDialog, setShowContactDialog] = useState(false);
  const [contactSubject, setContactSubject] = useState('');
  const [contactMessage, setContactMessage] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showTutorial, setShowTutorial] = useState(false);

  // Animation values
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const searchBarAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    fadeIn(fadeAnim);
    slideUp(slideAnim);
    Animated.spring(searchBarAnim, {
      toValue: 1,
      tension: 20,
      friction: 7,
      useNativeDriver: true,
    }).start();
  }, []);

  const filteredFAQ = FAQ_DATA.filter(
    (item) =>
      (selectedCategory === 'all' || item.category === selectedCategory) &&
      (item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.answer.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleContactSubmit = () => {
    // TODO: Implement contact form submission
    setShowContactDialog(false);
    setContactSubject('');
    setContactMessage('');
  };

  const TutorialDialog = () => (
    <Portal>
      <Dialog visible={showTutorial} onDismiss={() => setShowTutorial(false)}>
        <Dialog.Title>Quick Start Tutorial</Dialog.Title>
        <Dialog.Content>
          <List.Section>
            <List.Item
              title="1. Set Up Your Profile"
              description="Customize your preferences and blocked apps"
              left={props => <List.Icon {...props} icon="account-cog" />}
            />
            <List.Item
              title="2. Start a Focus Session"
              description="Choose duration and task, then begin focusing"
              left={props => <List.Icon {...props} icon="play-circle" />}
            />
            <List.Item
              title="3. Complete Tasks"
              description="Mark tasks as done during or after sessions"
              left={props => <List.Icon {...props} icon="check-circle" />}
            />
            <List.Item
              title="4. Track Progress"
              description="View your stats and earn achievements"
              left={props => <List.Icon {...props} icon="chart-line" />}
            />
          </List.Section>
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={() => setShowTutorial(false)}>Got it!</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );

  return (
    <ScrollView style={styles.container}>
      <Animated.View style={{ opacity: fadeAnim, transform: [{ translateY: slideAnim }] }}>
        <Surface style={styles.header}>
          <Text variant="headlineMedium">Help & Support</Text>
        </Surface>

        <Animated.View style={{ transform: [{ scale: searchBarAnim }] }}>
          <Searchbar
            placeholder="Search help articles..."
            onChangeText={setSearchQuery}
            value={searchQuery}
            style={styles.searchBar}
          />
        </Animated.View>

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
              icon={category.icon}
            >
              {category.label}
            </Chip>
          ))}
        </ScrollView>

        <Surface style={styles.quickHelpSection}>
          <List.Section>
            <List.Subheader>Quick Help</List.Subheader>
            <List.Item
              title="Watch Tutorial"
              left={props => <List.Icon {...props} icon="play-circle" />}
              onPress={() => setShowTutorial(true)}
              right={props => <List.Icon {...props} icon="chevron-right" />}
            />
            <List.Item
              title="View Documentation"
              left={props => <List.Icon {...props} icon="book-open-variant" />}
              onPress={() => {}}
              right={props => <List.Icon {...props} icon="chevron-right" />}
            />
          </List.Section>
        </Surface>

        <Surface style={styles.tipsSection}>
          <Text variant="titleLarge" style={styles.sectionTitle}>
            Quick Tips
          </Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.tipsScrollView}
          >
            {QUICK_TIPS.map((tip, index) => (
              <Card key={index} style={styles.tipCard}>
                <Card.Content>
                  <MaterialCommunityIcons
                    name={tip.icon}
                    size={32}
                    color={theme.colors.primary}
                    style={styles.tipIcon}
                  />
                  <Text variant="titleMedium">{tip.title}</Text>
                  <Text variant="bodyMedium" style={styles.tipDescription}>
                    {tip.description}
                  </Text>
                </Card.Content>
              </Card>
            ))}
          </ScrollView>
        </Surface>

        <View style={styles.section}>
          <Text variant="titleLarge" style={styles.sectionTitle}>
            Frequently Asked Questions
          </Text>
          {filteredFAQ.map((item, index) => (
            <Card key={index} style={styles.faqCard}>
              <Card.Content>
                <View style={styles.faqHeader}>
                  <List.Icon icon={item.icon} />
                  <View style={styles.faqText}>
                    <Text variant="titleMedium">{item.question}</Text>
                    <Text variant="bodyMedium" style={styles.answer}>
                      {item.answer}
                    </Text>
                  </View>
                </View>
              </Card.Content>
            </Card>
          ))}
        </View>

        <Surface style={styles.contactSection}>
          <Text variant="titleLarge" style={styles.sectionTitle}>
            Still Need Help?
          </Text>
          <Button
            mode="contained"
            onPress={() => setShowContactDialog(true)}
            icon="email"
            style={styles.contactButton}
          >
            Contact Support
          </Button>
        </Surface>

        <Portal>
          <Dialog
            visible={showContactDialog}
            onDismiss={() => setShowContactDialog(false)}
          >
            <Dialog.Title>Contact Support</Dialog.Title>
            <Dialog.Content>
              <TextInput
                label="Subject"
                value={contactSubject}
                onChangeText={setContactSubject}
                mode="outlined"
                style={styles.dialogInput}
              />
              <TextInput
                label="Message"
                value={contactMessage}
                onChangeText={setContactMessage}
                mode="outlined"
                multiline
                numberOfLines={4}
                style={styles.dialogInput}
              />
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={() => setShowContactDialog(false)}>Cancel</Button>
              <Button onPress={handleContactSubmit}>Send</Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>

        <TutorialDialog />
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
  searchBar: {
    margin: 16,
    elevation: 2,
  },
  categoriesContainer: {
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  categoryChip: {
    marginRight: 8,
  },
  quickHelpSection: {
    margin: 16,
    borderRadius: 8,
    elevation: 2,
  },
  tipsSection: {
    margin: 16,
    padding: 16,
    borderRadius: 8,
    elevation: 2,
  },
  tipsScrollView: {
    marginTop: 8,
  },
  tipCard: {
    width: 200,
    marginRight: 12,
    borderRadius: 8,
  },
  tipIcon: {
    marginBottom: 8,
  },
  tipDescription: {
    marginTop: 4,
    color: '#666',
  },
  section: {
    margin: 16,
  },
  sectionTitle: {
    marginBottom: 16,
  },
  faqCard: {
    marginBottom: 12,
    borderRadius: 8,
  },
  faqHeader: {
    flexDirection: 'row',
  },
  faqText: {
    flex: 1,
  },
  answer: {
    marginTop: 8,
    color: '#666',
  },
  contactSection: {
    margin: 16,
    padding: 16,
    borderRadius: 8,
    elevation: 2,
    alignItems: 'center',
  },
  contactButton: {
    marginTop: 8,
  },
  dialogInput: {
    marginBottom: 12,
  },
});

export default HelpScreen;
