import { useEffect, useState } from 'react';
import { Stack, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useFrameworkReady } from '@/hooks/useFrameworkReady';
import { JokeProvider } from '@/contexts/JokeContext';
import { View, TouchableOpacity, Text, Image, StyleSheet } from 'react-native';

// This is our main navigation component
export default function RootLayout() {
  useFrameworkReady();
  const [showWelcome, setShowWelcome] = useState(true);

  if (showWelcome) {
    return (
      <JokeProvider>
        <WelcomeScreen onGetStarted={() => setShowWelcome(false)} />
      </JokeProvider>
    );
  }

  return (
    <JokeProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style="auto" />
    </JokeProvider>
  );
}

// Simple welcome screen component
function WelcomeScreen({ onGetStarted }: { onGetStarted: () => void }) {
  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <View style={styles.content}>
        <Image 
          source={require('@/assets/images/malupiton.png')} 
          style={styles.image}
          resizeMode="contain"
        />
        <Text style={styles.title}>Welcome to JokeAPI</Text>
        <Text style={styles.subtitle}>Get ready for some laughs!</Text>
      </View>
      <TouchableOpacity style={styles.button} onPress={onGetStarted}>
        <Text style={styles.buttonText}>Get Started</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = {
  container: {
    flex: 1,
    backgroundColor: '#1e3a8a',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fbbf24',
    marginBottom: 16,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    color: '#e2e8f0',
    textAlign: 'center',
    opacity: 0.9,
  },
  button: {
    backgroundColor: '#fbbf24',
    paddingVertical: 16,
    paddingHorizontal: 40,
    borderRadius: 30,
    marginBottom: 40,
    width: '100%',
  },
  buttonText: {
    color: '#1e3a8a',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 20,
    backgroundColor: 'transparent',
  },
} as const;
