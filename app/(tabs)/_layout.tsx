import { Tabs } from 'expo-router';
import { Hop as Home, List as ListIcon } from 'lucide-react-native';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#1e3a8a', // Navy blue
          borderTopWidth: 0,
          elevation: 8,
          shadowOpacity: 0.1,
          shadowRadius: 8,
          height: 80,
          paddingBottom: 10,
        },
        tabBarActiveTintColor: '#fbbf24', // Yellow
        tabBarInactiveTintColor: '#94a3b8',
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
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
    </Tabs>
  );
}