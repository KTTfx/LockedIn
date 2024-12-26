import React from 'react';
import { Provider as PaperProvider, MD3LightTheme, MD3DarkTheme } from 'react-native-paper';
import { Provider as StoreProvider } from 'react-redux';
import { store } from './src/store/store';
import AppNavigator from './src/navigation/AppNavigator';
import { useSelector } from 'react-redux';

const lightTheme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: '#2196F3',
    secondary: '#4CAF50',
  },
};

const darkTheme = {
  ...MD3DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    primary: '#2196F3',
    secondary: '#4CAF50',
  },
};

const ThemedApp = () => {
  const theme = useSelector((state) => state.settings.theme);
  return (
    <PaperProvider theme={theme === 'dark' ? darkTheme : lightTheme}>
      <AppNavigator />
    </PaperProvider>
  );
};

export default function App() {
  return (
    <StoreProvider store={store}>
      <ThemedApp />
    </StoreProvider>
  );
}
