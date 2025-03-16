"use client"

import Link from "next/link"
import { Settings } from "lucide-react"
import { Button } from "@/components/ui/button"
import SimpleJokeDisplay from "@/components/simple-joke-display"
import { useEffect, useState } from "react"
import type { JokeSettings } from "@/types/settings"
import { defaultSettings } from "@/types/settings"

export default function Home() {
  const [settings, setSettings] = useState<JokeSettings>(defaultSettings);

  useEffect(() => {
    const savedSettings = localStorage.getItem('jokeSettings');
    if (savedSettings) {
      try {
        setSettings(JSON.parse(savedSettings));
      } catch (error) {
        console.error('Error parsing settings:', error);
      }
    }
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-black to-amber-900/40">
      {/* Header */}
      <header className="p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">
          Tell Me A<span className="text-orange-500"> Joke</span>
        </h1>
        <Link href="/settings">
          <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
            <Settings className="h-5 w-5" />
            <span className="sr-only">Settings</span>
          </Button>
        </Link>
      </header>

      {/* Main content */}
      <main className="flex-1 flex flex-col items-center justify-center p-6">
        <div className="w-full max-w-xl mx-auto">
          <SimpleJokeDisplay settings={settings} />
        </div>
      </main>

      {/* Footer */}
      <footer className="p-4 text-center text-sm text-gray-400">
        <p>Powered by AI • Made with ❤️</p>
      </footer>
    </div>
  )
}

