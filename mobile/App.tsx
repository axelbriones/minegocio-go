import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { initDatabase } from './src/database';
import { initOfflineDatabase } from './src/modules/shared/services/offline';
import { supabase } from './src/modules/shared/services/supabase';
import { useAuthStore } from './src/modules/auth/stores/useAuthStore';
import { LoginScreen } from './src/modules/auth/screens/LoginScreen';
import { MainNavigator } from './src/navigation/MainNavigator';
import { colors } from './src/theme';

const Stack = createNativeStackNavigator();

export default function App() {
  const { session, setSession } = useAuthStore();
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    // Initialize DBs
    Promise.all([
      initDatabase(),
      initOfflineDatabase()
    ]).catch(console.error);

    // Auth state listener
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setInitializing(false);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  if (initializing) return null; // Or a splash screen

  return (
    <NavigationContainer>
      <StatusBar style="dark" />
      <Stack.Navigator screenOptions={{ headerShown: false, contentStyle: { backgroundColor: colors.background } }}>
        {session ? (
          <Stack.Screen name="Main" component={MainNavigator} />
        ) : (
          <Stack.Screen name="Login" component={LoginScreen} />
        )}
      </Stack.Navigator>
    </>
  );
}
