import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeScreen } from './src/screens/HomeScreen';
import { ProductsScreen } from './src/screens/ProductsScreen';
import { initDatabase } from './src/database';
import { colors } from './src/theme';
import { useSyncEngine } from './src/sync/hooks';
import { registerBackgroundSync } from './src/sync/background';

const Stack = createNativeStackNavigator();

const AppWithHooks = () => {
  useSyncEngine();

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
        <Stack.Screen name="Products" component={ProductsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default function App() {
  const [dbReady, setDbReady] = useState(false);

  useEffect(() => {
    const initApp = async () => {
        try {
            await initDatabase();
            await registerBackgroundSync();
            setDbReady(true);
        } catch (error) {
            console.error("Initialization error:", error);
        }
    };
    initApp();
  }, []);

  if (!dbReady) {
      // Prevent AppWithHooks from mounting (and calling SQLite) before DB is ready
      return (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
             <Text>Cargando base de datos...</Text>
          </View>
      );
  }

  return <AppWithHooks />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
