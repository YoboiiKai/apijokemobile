import { useState, useEffect, useRef } from 'react';
import { Stack, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useFrameworkReady } from '@/hooks/useFrameworkReady';
import { JokeProvider } from '@/contexts/JokeContext';
import { View, TouchableOpacity, Text, Image, StyleSheet, Animated } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#1e3a8a',
  },
  content: {
    width: '100%',
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 20,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    color: 'white',
    textAlign: 'center',
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#1e90ff',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 30,
    marginTop: 40,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
  progressBarContainer: {
    height: 20,
    width: '80%',
    backgroundColor: '#333',
    borderRadius: 10,
    marginTop: 30,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#444',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#ff0000',
    borderRadius: 8,
  },
  image: {
    width: 150,
    height: 150,
    marginBottom: 30,
  },
});

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
  const [hacked, setHacked] = useState(false);
  const [countdown, setCountdown] = useState(5);
  const progress = useState(new Animated.Value(0))[0];

  useEffect(() => {
    if (!hacked) return;
    
    if (countdown <= 1) {
      const timeout = setTimeout(() => {
        onGetStarted();
      }, 1000);
      return () => clearTimeout(timeout);
    }
    
    const timer = setInterval(() => {
      setCountdown(prev => prev - 1);
    }, 1000);
    
    return () => clearInterval(timer);
  }, [hacked, countdown, onGetStarted]);

  const handleGetStarted = () => {
    setHacked(true);
    // Animate progress from 0 to 1 over 5 seconds (5000ms)
    Animated.timing(progress, {
      toValue: 1,
      duration: 5000,
      useNativeDriver: false,
    }).start();
  };

  const flashAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const flash = Animated.loop(
      Animated.sequence([
        Animated.timing(flashAnim, {
          toValue: 0.3,
          duration: 800,
          useNativeDriver: true
        }),
        Animated.timing(flashAnim, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true
        })
      ])
    );
    flash.start();
    return () => flash.stop();
  }, []);

  if (hacked) {
    return (
      <View style={[styles.container, { backgroundColor: 'black' }]}>
        <StatusBar style="light" />
        <View style={styles.content}>
          <Animated.Text style={[
            styles.title, 
            { 
              color: 'red',
              opacity: flashAnim,
              transform: [{
                scale: flashAnim.interpolate({
                  inputRange: [0.3, 1],
                  outputRange: [0.9, 1.1]
                })
              }]
            }
          ]}>
            WARNING!
          </Animated.Text>
          <Animated.Text style={[
            styles.subtitle, 
            { 
              color: 'red', 
              marginBottom: 30, 
              textAlign: 'center',
              opacity: flashAnim,
              transform: [{
                scale: flashAnim.interpolate({
                  inputRange: [0.3, 1],
                  outputRange: [0.95, 1.05]
                })
              }]
            }
          ]}>
            YOUR PHONE HAS BEEN HACKED!
          </Animated.Text>
          <View style={styles.progressBarContainer}>
            <Animated.View style={[
              styles.progressBar,
              {
                width: progress.interpolate({
                  inputRange: [0, 1],
                  outputRange: ['0%', '100%']
                })
              }
            ]} />
          </View>
          <Text style={[styles.subtitle, { color: 'lime', marginTop: 20 }]}>
            Launching app in {countdown}...
          </Text>
        </View>
      </View>
    );
  }

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
        <TouchableOpacity style={styles.button} onPress={handleGetStarted}>
          <Text style={styles.buttonText}>Get Started</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

