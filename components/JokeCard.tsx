import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { Smile } from 'lucide-react-native';

interface JokeCardProps {
  title: string;
  joke: string | null;
  loading: boolean;
  source: string;
}

export default function JokeCard({ title, joke, loading, source }: JokeCardProps) {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Smile size={24} color="#fbbf24" />
        <Text style={styles.title}>{title}</Text>
      </View>
      
      <View style={styles.content}>
        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#fbbf24" />
            <Text style={styles.loadingText}>Loading a funny joke...</Text>
          </View>
        ) : joke ? (
          <>
            <Text style={styles.joke}>{joke}</Text>
            <View style={styles.sourceContainer}>
              <Text style={styles.source}>Source: {source}</Text>
            </View>
          </>
        ) : (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>Oops! Couldn't load this joke.</Text>
            <Text style={styles.errorSubtext}>Pull to refresh to try again</Text>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 20,
    marginVertical: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 10,
    borderWidth: 2,
    borderColor: 'rgba(251, 191, 36, 0.3)', // Yellow border
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(251, 191, 36, 0.2)',
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1e3a8a', // Navy blue
    marginLeft: 12,
  },
  content: {
    padding: 20,
    minHeight: 120,
  },
  loadingContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 80,
  },
  loadingText: {
    marginTop: 12,
    fontSize: 14,
    color: '#64748b',
    fontWeight: '500',
  },
  joke: {
    fontSize: 16,
    lineHeight: 24,
    color: '#374151',
    textAlign: 'left',
    fontWeight: '500',
  },
  sourceContainer: {
    marginTop: 16,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: 'rgba(251, 191, 36, 0.2)',
  },
  source: {
    fontSize: 12,
    color: '#6b7280',
    fontWeight: '600',
    textAlign: 'right',
  },
  errorContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 80,
  },
  errorText: {
    fontSize: 16,
    color: '#ef4444',
    fontWeight: '600',
    textAlign: 'center',
  },
  errorSubtext: {
    fontSize: 14,
    color: '#6b7280',
    textAlign: 'center',
    marginTop: 4,
  },
});