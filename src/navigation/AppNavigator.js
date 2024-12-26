import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ActivityIndicator, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import AuthScreen from '../screens/AuthScreen';
import DashboardScreen from '../screens/DashboardScreen';
import FocusSessionScreen from '../screens/FocusSessionScreen';
import BreakScreen from '../screens/BreakScreen';
import PaymentScreen from '../screens/PaymentScreen';
import AnalyticsScreen from '../screens/AnalyticsScreen';
import SettingsScreen from '../screens/SettingsScreen';
import GamificationScreen from '../screens/GamificationScreen';
import HelpScreen from '../screens/HelpScreen';
import { initializeAuth } from '../store/slices/authSlice';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  const dispatch = useDispatch();
  const { user, initialized } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(initializeAuth());
  }, [dispatch]);

  if (!initialized) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        {!user ? (
          // Auth Stack
          <Stack.Group>
            <Stack.Screen 
              name="Auth" 
              component={AuthScreen}
              options={{
                animationTypeForReplace: !user ? 'pop' : 'push',
              }}
            />
          </Stack.Group>
        ) : (
          // App Stack
          <Stack.Group>
            <Stack.Screen name="Dashboard" component={DashboardScreen} />
            <Stack.Screen name="FocusSession" component={FocusSessionScreen} />
            <Stack.Screen name="Break" component={BreakScreen} />
            <Stack.Screen name="Payment" component={PaymentScreen} />
            <Stack.Screen name="Analytics" component={AnalyticsScreen} />
            <Stack.Screen name="Settings" component={SettingsScreen} />
            <Stack.Screen name="Gamification" component={GamificationScreen} />
            <Stack.Screen name="Help" component={HelpScreen} />
          </Stack.Group>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
