# LockedIn - Focus Timer & Productivity App

LockedIn is a modern focus timer and productivity app built with React Native and Expo. It helps users manage their focus sessions, track productivity, and block distractions with a beautiful Web3-inspired design.

## Features

- 🔐 **Authentication System**
  - Email/Password sign-in
  - Sign-up with email verification
  - Password recovery
  - Profile management

- ⏱️ **Focus Timer**
  - Customizable focus duration (default: 25 minutes)
  - Break timer (default: 5 minutes)
  - Auto-start breaks option
  - Visual and audio notifications
  - Background timer support

- 📊 **Statistics & Analytics**
  - Daily focus time tracking
  - Weekly/Monthly reports
  - Focus session history
  - Productivity trends
  - Achievement system

- ⚙️ **Settings & Customization**
  - Dark mode support
  - Timer customization
  - Notification preferences
  - Sound effects toggle
  - Profile settings

## Tech Stack

- **Frontend**
  - React Native
  - Expo
  - React Navigation
  - Redux Toolkit
  - React Native Paper
  - React Native Reanimated
  - Expo Router

- **Backend** (to be implemented)
  - Firebase Authentication
  - Firebase Firestore
  - Firebase Cloud Functions
  - Firebase Cloud Messaging

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/locked-in.git
cd locked-in
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

## Implementation Checklist

### 1. Authentication
- [ ] Implement Firebase Authentication
  - [ ] Email/Password sign-up
  - [ ] Email verification
  - [ ] Password reset
  - [ ] OAuth providers (Google, Apple)
- [ ] Set up user profiles in Firestore
- [ ] Add profile picture upload to Storage

### 2. Focus Timer
- [ ] Create timer logic
  - [ ] Countdown timer with pause/resume
  - [ ] Break timer
  - [ ] Background timer support
- [ ] Add notifications
  - [ ] Timer completion
  - [ ] Break reminders
  - [ ] Custom notifications
- [ ] Implement session tracking
  - [ ] Save completed sessions
  - [ ] Track interruptions
  - [ ] Calculate focus scores

### 3. Statistics
- [ ] Design database schema
  - [ ] Focus sessions
  - [ ] Daily stats
  - [ ] Achievement tracking
- [ ] Create analytics dashboard
  - [ ] Daily/Weekly views
  - [ ] Progress charts
  - [ ] Achievement badges
- [ ] Implement data visualization
  - [ ] Focus time charts
  - [ ] Productivity trends
  - [ ] Session history

### 4. Settings
- [ ] User preferences
  - [ ] Timer durations
  - [ ] Notification settings
  - [ ] Theme preferences
- [ ] Profile management
  - [ ] Update user info
  - [ ] Change password
  - [ ] Delete account
- [ ] App customization
  - [ ] Sound effects
  - [ ] Visual themes
  - [ ] Widget settings

### 5. UI/UX Improvements
- [ ] Add loading states
- [ ] Implement error handling
- [ ] Add success messages
- [ ] Improve animations
- [ ] Add haptic feedback
- [ ] Implement gesture controls

### 6. Data Management
- [ ] Set up Firestore rules
- [ ] Implement data backup
- [ ] Add offline support
- [ ] Optimize data queries
- [ ] Add data export feature

### 7. Testing
- [ ] Unit tests
- [ ] Integration tests
- [ ] E2E tests
- [ ] Performance testing
- [ ] User testing

## File Structure

```
locked-in/
├── app/
│   ├── (app)/
│   │   ├── (tabs)/
│   │   │   ├── _layout.tsx
│   │   │   ├── index.tsx
│   │   │   ├── stats.tsx
│   │   │   ├── focus.tsx
│   │   │   └── settings.tsx
│   │   └── _layout.tsx
│   ├── (auth)/
│   │   ├── welcome.tsx
│   │   ├── sign-in.tsx
│   │   └── sign-up.tsx
│   └── _layout.tsx
├── src/
│   ├── components/
│   ├── hooks/
│   ├── services/
│   ├── store/
│   ├── styles/
│   └── utils/
├── assets/
└── package.json
```

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support, email support@locked-in.app or join our Discord community.
