import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeScreen } from './src/app/dashboard/HomeScreen';
import { InventoryScreen } from './src/app/inventory/InventoryScreen';
import { ProductsScreen } from './src/app/inventory/products/ProductsScreen';
import { MovementsScreen } from './src/app/inventory/movements/MovementsScreen';
import { KardexScreen } from './src/app/inventory/kardex/KardexScreen';
import { LotsScreen } from './src/app/inventory/lots/LotsScreen';
import { WarehousesScreen } from './src/app/inventory/warehouses/WarehousesScreen';
import { InventoryAI } from './src/app/inventory/ai/InventoryAI';
import { SalesScreen } from './src/app/sales/SalesScreen';
import { PurchasesScreen } from './src/app/purchases/PurchasesScreen';
import { CustomersScreen } from './src/app/customers/CustomersScreen';
import { SuppliersScreen } from './src/app/suppliers/SuppliersScreen';
import { ReportsScreen } from './src/app/reports/ReportsScreen';
import { SettingsScreen } from './src/app/settings/SettingsScreen';
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
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: colors.background },
        }}
      >
        <Stack.Screen name="Dashboard" component={HomeScreen} />
        <Stack.Screen name="Inventory" component={InventoryScreen} />
        <Stack.Screen name="Products" component={ProductsScreen} />
        <Stack.Screen name="Movements" component={MovementsScreen} />
        <Stack.Screen name="Kardex" component={KardexScreen} />
        <Stack.Screen name="Lots" component={LotsScreen} />
        <Stack.Screen name="Warehouses" component={WarehousesScreen} />
        <Stack.Screen name="InventoryAI" component={InventoryAI} />
        <Stack.Screen name="Sales" component={SalesScreen} />
        <Stack.Screen name="Purchases" component={PurchasesScreen} />
        <Stack.Screen name="Customers" component={CustomersScreen} />
        <Stack.Screen name="Suppliers" component={SuppliersScreen} />
        <Stack.Screen name="Reports" component={ReportsScreen} />
        <Stack.Screen name="Settings" component={SettingsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
