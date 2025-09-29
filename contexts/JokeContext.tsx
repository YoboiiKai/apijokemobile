import React, { createContext, useContext, useState, ReactNode } from 'react';

interface JokeEntry {
  id: string;
  timestamp: string;
  type: 'official' | 'random';
  content: string;
  source: string;
}

interface JokeContextType {
  jokeHistory: JokeEntry[];
  addToHistory: (joke: { type: 'official' | 'random'; content: string; source: string }) => void;
  clearHistory: () => void;
}

const JokeContext = createContext<JokeContextType | undefined>(undefined);

export const JokeProvider: React.FC<{children: ReactNode}> = ({ children }) => {
  const [jokeHistory, setJokeHistory] = useState<JokeEntry[]>([]);

  const addToHistory = (joke: { type: 'official' | 'random'; content: string; source: string }) => {
    // Use a counter to ensure unique keys even if timestamps are the same
    const counter = Math.floor(Math.random() * 10000);
    const newEntry: JokeEntry = {
      id: `${Date.now()}-${counter}`,
      timestamp: new Date().toISOString(),
      ...joke,
    };
    setJokeHistory(prev => [newEntry, ...prev].slice(0, 100)); // Keep last 100 entries
  };

  const clearHistory = () => {
    setJokeHistory([]);
  };

  return (
    <JokeContext.Provider value={{ jokeHistory, addToHistory, clearHistory }}>
      {children}
    </JokeContext.Provider>
  );
};

export const useJokeHistory = (): JokeContextType => {
  const context = useContext(JokeContext);
  if (!context) {
    throw new Error('useJokeHistory must be used within a JokeProvider');
  }
  return context;
};
