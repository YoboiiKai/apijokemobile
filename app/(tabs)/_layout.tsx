import { Tabs, useRouter } from 'expo-router';
import { Hop as Home, List as ListIcon, LogOut } from 'lucide-react-native';
import { TouchableOpacity, Text } from 'react-native';

export default function TabLayout() {
  const router = useRouter();

  return (
    <Tabs
      screenOptions={{
        headerShown: true,
        headerStyle: {
          backgroundColor: '#1e3a8a',
          elevation: 0,
          shadowOpacity: 0,
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        tabBarStyle: {
          backgroundColor: '#1e3a8a',
          borderTopWidth: 0,
          elevation: 8,
          shadowOpacity: 0.1,
          shadowRadius: 8,
          height: 80,
          paddingBottom: 10,
          paddingHorizontal: 10,
        },
        tabBarActiveTintColor: '#fbbf24',
        tabBarInactiveTintColor: '#94a3b8',
        tabBarItemStyle: {
          padding: 4,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
          marginBottom: 8,
        },
        tabBarIconStyle: {
          marginTop: 4,
        },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Jokes',
          tabBarIcon: ({ size, color }) => (
            <Home size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="logs"
        options={{
          title: 'Logs',
          tabBarIcon: ({ size, color }) => (
            <ListIcon size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="exit"
        options={{
          title: 'Exit',
          tabBarIcon: ({ size }) => (
            <LogOut size={size} color="#ef4444" />
          ),
          tabBarLabel: () => (
            <Text style={{ color: '#ef4444', fontSize: 12, fontWeight: '600' }}>Exit</Text>
          ),
        }}
        listeners={{
          tabPress: (e) => {
            e.preventDefault();
            router.replace('/');
          },
        }}
      />
    </Tabs>
  );
}