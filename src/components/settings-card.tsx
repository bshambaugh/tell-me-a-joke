import { Card } from '@/components/ui/card';
import type { JokeSettings } from '@/types/settings';
import Link from 'next/link';
import { Button } from './ui/button';
import { Settings as SettingsIcon } from 'lucide-react';

interface SettingsCardProps {
  settings: JokeSettings;
  isCompact?: boolean;
}

export function SettingsCard({ settings, isCompact = false }: SettingsCardProps) {
  if (!settings) return null;

  const { topic, tone, jokeType, temperature } = settings;

  if (isCompact) {
    return (
      <Card className="bg-black/40 border border-amber-800/30 backdrop-blur-sm">
        <div className="flex items-center justify-between px-3 py-2">
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <SettingsIcon className="h-3.5 w-3.5 text-orange-400" />
            <span>
              {topic !== 'anything' && <span>{topic}, </span>}
              {tone} {jokeType !== 'any' && <span>{jokeType} </span>}
              jokes at {Math.round(temperature * 100)}% creativity
            </span>
          </div>
          <Link href="/settings">
            <Button variant="ghost" size="sm" className="h-7 px-2 -mr-2 text-orange-400 hover:text-orange-300 hover:bg-orange-400/10">
              Edit
            </Button>
          </Link>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-6 bg-black/40 border border-amber-800/30 backdrop-blur-sm">
      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-orange-400 flex items-center gap-2">
          <SettingsIcon className="h-5 w-5" />
          Current Settings
        </h2>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <div className="text-sm text-gray-400">Topic</div>
            <div className="text-white font-medium capitalize">{topic}</div>
          </div>
          <div className="space-y-1">
            <div className="text-sm text-gray-400">Tone</div>
            <div className="text-white font-medium capitalize">{tone}</div>
          </div>
          <div className="space-y-1">
            <div className="text-sm text-gray-400">Type</div>
            <div className="text-white font-medium capitalize">{jokeType}</div>
          </div>
          <div className="space-y-1">
            <div className="text-sm text-gray-400">Creativity</div>
            <div className="text-white font-medium">{Math.round(temperature * 100)}%</div>
          </div>
        </div>
      </div>
    </Card>
  );
} 