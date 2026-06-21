import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { DashboardScreen } from '../modules/dashboard/screens/DashboardScreen';
import { InventoryScreen } from '../modules/inventory/screens/InventoryScreen';
import { InventoryDetailScreen } from '../modules/inventory/screens/InventoryDetailScreen';
import { ScannerScreen } from '../modules/scanner/screens/ScannerScreen';
import { MovementsScreen } from '../modules/movements/screens/MovementsScreen';
import { ProfileScreen } from '../modules/profile/screens/ProfileScreen';
import { LayoutDashboard, List, ScanLine, ArrowLeftRight, User } from 'lucide-react-native';
import { colors } from '../theme';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const InventoryStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="InventoryList" component={InventoryScreen} />
    <Stack.Screen name="InventoryDetail" component={InventoryDetailScreen} />
  </Stack.Navigator>
);

export const MainNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textSecondary,
        tabBarStyle: {
          backgroundColor: colors.surface,
          borderTopColor: colors.border,
        },
      }}
    >
      <Tab.Screen
        name="DashboardTab"
        component={DashboardScreen}
        options={{
          tabBarLabel: 'Inicio',
          tabBarIcon: ({ color }) => <LayoutDashboard color={color} size={24} />
        }}
      />
      <Tab.Screen
        name="InventoryTab"
        component={InventoryStack}
        options={{
          tabBarLabel: 'Inventario',
          tabBarIcon: ({ color }) => <List color={color} size={24} />
        }}
      />
      <Tab.Screen
        name="ScannerTab"
        component={ScannerScreen}
        options={{
          tabBarLabel: 'Escanear',
          tabBarIcon: ({ color }) => <ScanLine color={color} size={24} />
        }}
      />
      <Tab.Screen
        name="MovementsTab"
        component={MovementsScreen}
        options={{
          tabBarLabel: 'Mover',
          tabBarIcon: ({ color }) => <ArrowLeftRight color={color} size={24} />
        }}
      />
      <Tab.Screen
        name="ProfileTab"
        component={ProfileScreen}
        options={{
          tabBarLabel: 'Perfil',
          tabBarIcon: ({ color }) => <User color={color} size={24} />
        }}
      />
    </Tab.Navigator>
  );
};
