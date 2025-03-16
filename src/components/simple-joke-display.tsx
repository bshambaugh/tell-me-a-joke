"use client"

import { useState, useEffect } from 'react';
import type { JokeSettings } from '@/types/settings';
import { defaultSettings } from '@/types/settings';

export default function SimpleJokeDisplay() {
  const [isLoading, setIsLoading] = useState(false);
  const [joke, setJoke] = useState('');
  const [settings, setSettings] = useState<JokeSettings>(defaultSettings);

  // Load settings from localStorage on mount
  useEffect(() => {
    const savedSettings = localStorage.getItem('jokeSettings');
    if (savedSettings) {
      try {
        setSettings(JSON.parse(savedSettings));
      } catch (e) {
        console.error('Error parsing saved settings:', e);
      }
    }
  }, []);

  const generateJoke = async () => {
    try {
      setIsLoading(true);
      setJoke('');

      const response = await fetch('/api/joke', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: [{ role: 'user', content: 'Tell me a joke' }],
          parameters: settings,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate joke');
      }

      const reader = response.body?.getReader();
      if (!reader) {
        throw new Error('No reader available');
      }

      const decoder = new TextDecoder();
      let jokeText = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const text = decoder.decode(value);
        const lines = text.split('\n').filter(line => line.trim() !== '');

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const data = line.slice(6);
            if (data === '[DONE]') continue;

            try {
              const json = JSON.parse(data);
              const content = json.choices[0]?.delta?.content;
              if (content) {
                jokeText += content;
                setJoke(jokeText);
              }
            } catch (e) {
              console.error('Error parsing JSON:', e);
            }
          }
        }
      }
    } catch (error) {
      console.error('Error generating joke:', error);
      setJoke('Failed to generate joke. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] p-4">
      <div className="text-9xl text-center animate-bounce mb-8">
        😜
      </div>
      <button
        onClick={generateJoke}
        disabled={isLoading}
        type="button"
        className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 px-8 rounded-full mb-8 disabled:opacity-50 transition-all transform hover:scale-105"
      >
        {isLoading ? 'Thinking of something funny...' : 'Tell me a joke!'}
      </button>
      {joke && (
        <div className="max-w-lg text-center p-6 bg-transparent border border-amber-800/30 rounded-3xl">
          <p className="text-white text-xl">{joke}</p>
        </div>
      )}
      <div className="mt-8 text-sm text-gray-400">
        Using settings: {settings.tone} {settings.jokeType} joke about {settings.topic}
      </div>
    </div>
  );
} 