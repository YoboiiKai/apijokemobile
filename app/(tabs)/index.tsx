import React, { useState, useEffect } from 'react';
import { useJokeHistory } from '@/contexts/JokeContext';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { RefreshCw } from 'lucide-react-native';
import JokeCard from '@/components/JokeCard';

interface OfficialJoke {
  setup: string;
  punchline: string;
}

interface JokeApiResponse {
  type: 'single' | 'twopart';
  joke?: string;
  setup?: string;
  delivery?: string;
}

export default function HomeScreen() {
  const [officialJoke, setOfficialJoke] = useState<OfficialJoke | null>(null);
  const [jokeApiJoke, setJokeApiJoke] = useState<JokeApiResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const { addToHistory } = useJokeHistory();

  const fetchOfficialJoke = async (): Promise<OfficialJoke | null> => {
    try {
      const response = await fetch('https://official-joke-api.appspot.com/random_joke');
      if (!response.ok) throw new Error('Failed to fetch official joke');
      return await response.json();
    } catch (error) {
      console.error('Error fetching official joke:', error);
      return null;
    }
  };

  const fetchJokeApiJoke = async (): Promise<JokeApiResponse | null> => {
    try {
      const response = await fetch('https://v2.jokeapi.dev/joke/Any?blacklistFlags=nsfw,religious,political,racist,sexist,explicit');
      if (!response.ok) throw new Error('Failed to fetch JokeAPI joke');
      return await response.json();
    } catch (error) {
      console.error('Error fetching JokeAPI joke:', error);
      return null;
    }
  };

  const fetchAllJokes = async () => {
    setLoading(true);
    try {
      const [official, jokeApi] = await Promise.all([
        fetchOfficialJoke(),
        fetchJokeApiJoke(),
      ]);

      if (official) {
        setOfficialJoke(official);
        const jokeContent = `${official.setup}\n\n${official.punchline}`;
        addToHistory({
          type: 'official',
          content: jokeContent,
          source: 'Official Joke API'
        });
      }

      if (jokeApi) {
        setJokeApiJoke(jokeApi);
        const jokeContent = jokeApi.type === 'single' 
          ? jokeApi.joke || ''
          : `${jokeApi.setup || ''}\n\n${jokeApi.delivery || ''}`;
        
        addToHistory({
          type: 'random',
          content: jokeContent,
          source: 'JokeAPI.dev'
        });
      }

      if (!official && !jokeApi) {
        Alert.alert('Error', 'Failed to load jokes. Please check your internet connection.');
      }
    } catch (error) {
      Alert.alert('Error', 'Something went wrong while fetching jokes.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllJokes();
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      
      <View style={styles.header}>
        <Text style={styles.title}>Daily Jokes</Text>
        <Text style={styles.subtitle}>Double the laughs, double the fun! 😄</Text>
      </View>

      <ScrollView 
        style={styles.content} 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <JokeCard
          title="Official Joke"
          joke={officialJoke ? `${officialJoke.setup}\n\n${officialJoke.punchline}` : null}
          loading={loading}
          source="Official Joke API"
        />

        <JokeCard
          title="Random Joke"
          joke={jokeApiJoke ? 
            jokeApiJoke.type === 'single' 
              ? jokeApiJoke.joke || null
              : `${jokeApiJoke.setup}\n\n${jokeApiJoke.delivery}`
            : null
          }
          loading={loading}
          source="JokeAPI.dev"
        />
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.refreshButton}
          onPress={fetchAllJokes}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator size="small" color="#1e3a8a" />
          ) : (
            <RefreshCw size={20} color="#1e3a8a" style={{ marginRight: 8 }} />
          )}
          <Text style={styles.refreshButtonText}>
            {loading ? 'Loading...' : 'Refresh Jokes'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1e3a8a', // Navy blue
  },
  header: {
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: '800',
    color: '#fbbf24', // Yellow
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#e2e8f0',
    textAlign: 'center',
    marginTop: 8,
    fontWeight: '500',
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  footer: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    paddingBottom: 30,
  },
  refreshButton: {
    backgroundColor: '#fbbf24', // Yellow
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 25,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  refreshButtonText: {
    color: '#1e3a8a', // Navy blue
    fontSize: 16,
    fontWeight: '700',
  },
});