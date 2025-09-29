import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';
import { Smile, ArrowRight } from 'lucide-react-native';

export default function WelcomeScreen() {
  const router = useRouter();

  const handleGetStarted = () => {
    router.push('/(tabs)');
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      
      <View style={styles.content}>
        <View style={styles.logoContainer}>
          <Smile size={64} color="#fbbf24" />
          <Text style={styles.title}>JokeAPI</Text>
          <Text style={styles.subtitle}>Endless Laughs, One Tap Away</Text>
        </View>

        <View style={styles.features}>
          <View style={styles.featureItem}>
            <View style={styles.featureIcon}>
              <Text style={styles.featureEmoji}>😄</Text>
            </View>
            <Text style={styles.featureText}>Daily Jokes</Text>
          </View>
          
          <View style={styles.featureItem}>
            <View style={styles.featureIcon}>
              <Text style={styles.featureEmoji}>🎭</Text>
            </View>
            <Text style={styles.featureText}>Multiple Categories</Text>
          </View>
          
          <View style={styles.featureItem}>
            <View style={styles.featureIcon}>
              <Text style={styles.featureEmoji}>📱</Text>
            </View>
            <Text style={styles.featureText}>Mobile Friendly</Text>
          </View>
        </View>
      </View>

      <View style={styles.footer}>
        <TouchableOpacity 
          style={styles.button}
          onPress={handleGetStarted}
          activeOpacity={0.8}
        >
          <Text style={styles.buttonText}>Get Started</Text>
          <ArrowRight size={20} color="#1e3a8a" style={styles.buttonIcon} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1e3a8a',
    padding: 24,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 48,
  },
  title: {
    fontSize: 42,
    fontWeight: 'bold',
    color: '#fbbf24',
    marginTop: 16,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    color: '#e2e8f0',
    marginTop: 8,
    textAlign: 'center',
    opacity: 0.9,
  },
  features: {
    marginTop: 32,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    backgroundColor: 'rgba(251, 191, 36, 0.1)',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(251, 191, 36, 0.2)',
  },
  featureIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(251, 191, 36, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  featureEmoji: {
    fontSize: 20,
  },
  featureText: {
    fontSize: 16,
    color: '#f8fafc',
    fontWeight: '500',
  },
  footer: {
    paddingBottom: 40,
  },
  button: {
    backgroundColor: '#fbbf24',
    paddingVertical: 18,
    borderRadius: 25,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  buttonText: {
    color: '#1e3a8a',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  buttonIcon: {
    marginLeft: 10,
  },
});
