"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Loader2, RefreshCw } from "lucide-react"

// Mock jokes for demonstration
const mockJokes = [
  "Why don't scientists trust atoms? Because they make up everything!",
  "I told my wife she was drawing her eyebrows too high. She looked surprised.",
  "Parallel lines have so much in common. It's a shame they'll never meet.",
  "Why did the scarecrow win an award? Because he was outstanding in his field!",
  "I'm reading a book about anti-gravity. It's impossible to put down!",
  "Did you hear about the mathematician who's afraid of negative numbers? He'll stop at nothing to avoid them.",
  "Why don't eggs tell jokes? They'd crack each other up.",
  "What's the best thing about Switzerland? I don't know, but the flag is a big plus.",
  "I used to play piano by ear, but now I use my hands.",
  "Why did the bicycle fall over? Because it was two tired!",
]

export default function JokeGenerator() {
  const [customPrompt, setCustomPrompt] = useState("")
  const [topic, setTopic] = useState("animals")
  const [tone, setTone] = useState("silly")
  const [jokeType, setJokeType] = useState("one-liner")
  const [temperature, setTemperature] = useState([0.7])
  const [joke, setJoke] = useState("")
  const [loading, setLoading] = useState(false)
  const [hasGenerated, setHasGenerated] = useState(false)

  const generateJoke = () => {
    setLoading(true)

    // Simulate API call delay
    setTimeout(() => {
      // Get a random joke from our mock collection
      const randomJoke = mockJokes[Math.floor(Math.random() * mockJokes.length)]

      // Format the joke based on type
      let formattedJoke = randomJoke
      if (jokeType === "knock-knock") {
        formattedJoke = `Knock knock!\nWho's there?\n${randomJoke.split(" ")[0]}.\n${randomJoke.split(" ")[0]} who?\n${randomJoke}`
      }

      setJoke(formattedJoke)
      setLoading(false)
      setHasGenerated(true)
    }, 1500)
  }

  return (
    <div className="grid gap-8 md:grid-cols-2">
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle>Joke Parameters</CardTitle>
          <CardDescription>Customize your joke preferences</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="custom-prompt">Custom Prompt (Optional)</Label>
            <Input
              id="custom-prompt"
              placeholder="Add specific details for your joke..."
              value={customPrompt}
              onChange={(e) => setCustomPrompt(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="topic">Topic</Label>
            <Select value={topic} onValueChange={setTopic}>
              <SelectTrigger id="topic">
                <SelectValue placeholder="Select a topic" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="work">Work</SelectItem>
                <SelectItem value="people">People</SelectItem>
                <SelectItem value="animals">Animals</SelectItem>
                <SelectItem value="food">Food</SelectItem>
                <SelectItem value="television">Television</SelectItem>
                <SelectItem value="sports">Sports</SelectItem>
                <SelectItem value="technology">Technology</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="tone">Tone</Label>
            <Select value={tone} onValueChange={setTone}>
              <SelectTrigger id="tone">
                <SelectValue placeholder="Select a tone" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="witty">Witty</SelectItem>
                <SelectItem value="sarcastic">Sarcastic</SelectItem>
                <SelectItem value="silly">Silly</SelectItem>
                <SelectItem value="dark">Dark</SelectItem>
                <SelectItem value="goofy">Goofy</SelectItem>
                <SelectItem value="clean">Clean</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="joke-type">Joke Type</Label>
            <Select value={jokeType} onValueChange={setJokeType}>
              <SelectTrigger id="joke-type">
                <SelectValue placeholder="Select a joke type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pun">Pun</SelectItem>
                <SelectItem value="knock-knock">Knock-knock</SelectItem>
                <SelectItem value="one-liner">One-liner</SelectItem>
                <SelectItem value="story">Story</SelectItem>
                <SelectItem value="dad-joke">Dad Joke</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between">
              <Label htmlFor="temperature">Creativity Level</Label>
              <span className="text-sm text-gray-500">{temperature[0].toFixed(1)}</span>
            </div>
            <Slider
              id="temperature"
              min={0.1}
              max={1.0}
              step={0.1}
              value={temperature}
              onValueChange={setTemperature}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-gray-500">
              <span>Predictable</span>
              <span>Creative</span>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button
            onClick={generateJoke}
            className="w-full bg-purple-600 hover:bg-purple-700 text-white"
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating...
              </>
            ) : (
              "Generate Joke"
            )}
          </Button>
        </CardFooter>
      </Card>

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle>Your Joke</CardTitle>
          <CardDescription>{hasGenerated ? "Here's your custom joke!" : "Your joke will appear here"}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="min-h-[200px] flex items-center justify-center">
            {loading ? (
              <div className="text-center">
                <Loader2 className="h-8 w-8 animate-spin mx-auto text-purple-600" />
                <p className="mt-2 text-gray-500">Crafting your joke...</p>
              </div>
            ) : hasGenerated ? (
              <div className="bg-purple-50 dark:bg-gray-800 p-6 rounded-lg w-full">
                <p className="text-lg font-medium whitespace-pre-line">{joke}</p>
              </div>
            ) : (
              <p className="text-gray-400 text-center italic">
                Adjust the parameters and click "Generate Joke" to see the result
              </p>
            )}
          </div>
        </CardContent>
        {hasGenerated && (
          <CardFooter className="flex justify-end">
            <Button
              variant="outline"
              size="sm"
              onClick={generateJoke}
              disabled={loading}
              className="flex items-center gap-1"
            >
              <RefreshCw className="h-4 w-4" />
              Try Again
            </Button>
          </CardFooter>
        )}
      </Card>
    </div>
  )
}

