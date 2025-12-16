import { useState } from 'react'
import ProfileManager from './components/ProfileManager'
import Sidebar from './components/Sidebar'
import ConfigPanel from './components/ConfigPanel'
import type { TikTokProfile, TikTokFunction, FunctionConfig } from './types/profile'

const availableFunctions: TikTokFunction[] = [
  {
    id: 'video-downloader',
    name: 'Video Downloader',
    description: 'Download TikTok videos',
    icon: '📥',
  },
  {
    id: 'analytics',
    name: 'Analytics',
    description: 'View account analytics',
    icon: '📊',
  },
  {
    id: 'scheduler',
    name: 'Post Scheduler',
    description: 'Schedule posts',
    icon: '📅',
  },
  {
    id: 'hashtag-generator',
    name: 'Hashtag Generator',
    description: 'Generate trending hashtags',
    icon: '🏷️',
  },
]

function App() {
  const [selectedProfile, setSelectedProfile] = useState<TikTokProfile | null>(null)
  const [selectedFunction, setSelectedFunction] = useState<TikTokFunction | null>(null)

  const handleProfileSelect = (profile: TikTokProfile) => {
    setSelectedProfile(profile)
  }

  const handleFunctionSelect = (func: TikTokFunction) => {
    setSelectedFunction(func)
  }

  const handleRun = (config: FunctionConfig) => {
    console.log('Running function:', selectedFunction?.name)
    console.log('With config:', config)
    console.log('For profile:', selectedProfile?.name)
    // Here you would implement the actual functionality
  }

  return (
    <div className="flex flex-col h-screen bg-gray-900">
      <header className="bg-gray-800 border-b border-gray-700 p-4">
        <ProfileManager onProfileSelect={handleProfileSelect} />
      </header>
      <div className="flex flex-1 overflow-hidden">
        <Sidebar
          functions={availableFunctions}
          selectedFunction={selectedFunction}
          onFunctionSelect={handleFunctionSelect}
        />
        <ConfigPanel selectedFunction={selectedFunction} onRun={handleRun} />
      </div>
    </div>
  )
}

export default App