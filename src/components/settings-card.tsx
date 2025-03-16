import Link from "next/link"
import { Settings2, MessageSquare, Sparkles, Zap } from "lucide-react"
import type { JokeSettings } from "@/types/settings"
import { Button } from "@/components/ui/button"

interface SettingsCardProps {
  settings: JokeSettings
  compact?: boolean
}

export function SettingsCard({ settings, compact = false }: SettingsCardProps) {
  if (!settings) return null

  if (compact) {
    return (
      <div className="bg-gradient-to-br from-orange-500/10 to-amber-700/10 border border-amber-800/30 rounded-xl p-4 backdrop-blur-sm">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-medium text-orange-400 flex items-center gap-2">
            <Settings2 className="h-4 w-4" />
            Current Settings
          </h2>
          <Link href="/settings">
            <Button variant="ghost" size="sm" className="text-orange-400 hover:text-orange-300 hover:bg-orange-400/10">
              Edit
            </Button>
          </Link>
        </div>
        <div className="mt-3 grid grid-cols-2 gap-2 text-sm">
          <div className="flex items-center gap-1.5 text-gray-400">
            <MessageSquare className="h-3 w-3 text-orange-400" />
            {settings.topic.charAt(0).toUpperCase() + settings.topic.slice(1)}
          </div>
          <div className="flex items-center gap-1.5 text-gray-400">
            <Sparkles className="h-3 w-3 text-orange-400" />
            {settings.tone.charAt(0).toUpperCase() + settings.tone.slice(1)}
          </div>
          <div className="flex items-center gap-1.5 text-gray-400">
            <MessageSquare className="h-3 w-3 text-orange-400" />
            {settings.jokeType.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join('-')}
          </div>
          <div className="flex items-center gap-1.5 text-gray-400">
            <Zap className="h-3 w-3 text-orange-400" />
            {Math.round(settings.temperature * 100)}% Creative
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-gradient-to-br from-orange-500/10 to-amber-700/10 border border-amber-800/30 rounded-3xl p-6 backdrop-blur-sm">
      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-orange-400 flex items-center gap-2">
          <Settings2 className="h-5 w-5" />
          Current Settings
        </h2>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <div className="text-sm text-gray-400">Topic</div>
            <div className="text-white font-medium flex items-center gap-2">
              <MessageSquare className="h-4 w-4 text-orange-400" />
              {settings.topic.charAt(0).toUpperCase() + settings.topic.slice(1)}
            </div>
          </div>
          <div className="space-y-1">
            <div className="text-sm text-gray-400">Tone</div>
            <div className="text-white font-medium flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-orange-400" />
              {settings.tone.charAt(0).toUpperCase() + settings.tone.slice(1)}
            </div>
          </div>
          <div className="space-y-1">
            <div className="text-sm text-gray-400">Type</div>
            <div className="text-white font-medium flex items-center gap-2">
              <MessageSquare className="h-4 w-4 text-orange-400" />
              {settings.jokeType.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join('-')}
            </div>
          </div>
          <div className="space-y-1">
            <div className="text-sm text-gray-400">Creativity</div>
            <div className="text-white font-medium flex items-center gap-2">
              <Zap className="h-4 w-4 text-orange-400" />
              {Math.round(settings.temperature * 100)}%
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 