import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { RefreshCw, Clock, Trash2 } from 'lucide-react-native';
import { useJokeHistory } from '@/contexts/JokeContext';

export default function LogsScreen() {
  const { jokeHistory, clearHistory } = useJokeHistory();
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const handleClearHistory = () => {
    Alert.alert(
      'Clear History',
      'Are you sure you want to clear your joke history?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Clear', onPress: () => clearHistory(), style: 'destructive' },
      ]
    );
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#fbbf24" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      
      <View style={styles.header}>
        <Text style={styles.headerText}>Joke History</Text>
        <View style={styles.headerActions}>
          <TouchableOpacity 
            onPress={handleClearHistory} 
            style={styles.clearButton}
            disabled={jokeHistory.length === 0}
          >
            <Trash2 size={20} color={jokeHistory.length === 0 ? '#64748b' : '#f87171'} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setRefreshing(true)} disabled={refreshing}>
            <RefreshCw 
              size={20} 
              color="#fbbf24" 
              style={[refreshing ? styles.refreshing : {}, { marginLeft: 16 }]}
            />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.logsContainer}>
        {jokeHistory.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Clock size={48} color="#94a3b8" />
            <Text style={styles.emptyText}>No joke history yet</Text>
            <Text style={styles.emptySubtext}>Your viewed jokes will appear here</Text>
          </View>
        ) : (
          jokeHistory.map((joke) => (
            <View key={joke.id} style={[
              styles.logCard,
              joke.type === 'official' ? styles.officialJoke : styles.randomJoke
            ]}>
              <View style={styles.logHeader}>
                <Text style={styles.jokeType}>
                  {joke.type === 'official' ? 'Official Joke' : 'Random Joke'}
                </Text>
                <Text style={styles.logTime}>
                  {formatDate(joke.timestamp)}
                </Text>
              </View>
              <Text style={styles.logDetails}>{joke.content}</Text>
              <Text style={styles.jokeSource}>{joke.source}</Text>
            </View>
          ))
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1e3a8a', // Navy blue
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 16,
    paddingHorizontal: 4,
  },
  headerText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#f8fafc',
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  clearButton: {
    padding: 4,
  },
  loadingContainer: {
    flex: 1,
    backgroundColor: '#1e3a8a',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logsContainer: {
    flex: 1,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 100,
    paddingHorizontal: 20,
  },
  emptyText: {
    color: '#f8fafc',
    fontSize: 18,
    fontWeight: '600',
    marginTop: 16,
    textAlign: 'center',
  },
  emptySubtext: {
    color: '#94a3b8',
    fontSize: 14,
    marginTop: 8,
    textAlign: 'center',
  },
  logCard: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  officialJoke: {
    backgroundColor: '#1e40af',
    borderLeftWidth: 4,
    borderLeftColor: '#fbbf24',
  },
  randomJoke: {
    backgroundColor: '#1e3a8a',
    borderLeftWidth: 4,
    borderLeftColor: '#38bdf8',
  },
  logHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
    alignItems: 'center',
  },
  jokeType: {
    color: '#fbbf24',
    fontSize: 16,
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  logTime: {
    color: '#94a3b8',
    fontSize: 12,
  },
  logDetails: {
    color: '#e2e8f0',
    fontSize: 15,
    lineHeight: 22,
    marginBottom: 8,
  },
  jokeSource: {
    color: '#94a3b8',
    fontSize: 12,
    fontStyle: 'italic',
  },
  refreshing: {
    transform: [{ rotate: '360deg' }],
  },
});
