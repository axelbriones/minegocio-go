import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeScreen } from './src/screens/HomeScreen';
import { initDatabase } from './src/database';
import { colors } from './src/theme';

const Stack = createNativeStackNavigator();

export default function App() {
  useEffect(() => {
    // Initialize SQLite DB on startup
    initDatabase().catch(console.error);
  }, []);

  return (
    <NavigationContainer>
      <StatusBar style="dark" />
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: colors.background },
        }}
      >
        <Stack.Screen name="Home" component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
