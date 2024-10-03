'use client'
'use client'

import { useState } from 'react'
import { useLanguage } from '../hooks/useLanguage'
import { useTerminal } from '../hooks/useTerminal'
import ProfileCard from '../components/ProfileCard'
import SocialLinks from '../components/SocialLinks'
import Terminal from '../components/Terminal'
import SnakeGame from '../components/SnakeGame'
import SpotifyTerminal from '../components/SpotifyTerminal'

export default function Home() {
  const { language, toggleLanguage } = useLanguage()
  const { output, input, setInput, handleSubmit } = useTerminal(language)
  const [activeComponent, setActiveComponent] = useState<'main' | 'terminal' | 'game' | 'spotify'>('main')

  const toggleComponent = (component: 'main' | 'terminal' | 'game' | 'spotify') => {
    setActiveComponent(component)
  }

  return (
    <main className="min-h-screen bg-cover bg-center flex flex-col items-center p-4 sm:p-6 md:p-8 font-mono"
          style={{backgroundImage: "url('https://raw.githubusercontent.com/carcruz97/carcruz97/refs/heads/main/forest.png')"}}>
      <div className="w-full flex justify-end mb-4">
        <button 
          onClick={toggleLanguage} 
          className="bg-black bg-opacity-30 backdrop-blur-sm rounded-lg shadow-lg overflow-hidden border border-white border-opacity-20 p-2 text-white hover:text-green-400 transition-colors"
          aria-label={language === 'en' ? "Switch to Spanish" : "Cambiar a Inglés"}
        >
          {language === 'en' ? 'ES' : 'EN'}
        </button>
      </div>

      {activeComponent === 'main' && (
        <>
          <ProfileCard language={language} />
          <SocialLinks 
            toggleTerminal={() => toggleComponent('terminal')}
            toggleGame={() => toggleComponent('game')}
            toggleSpotify={() => toggleComponent('spotify')}
            language={language}
          />
        </>
      )}
      
      {activeComponent === 'terminal' && (
        <Terminal 
          output={output}
          input={input}
          setInput={setInput}
          handleSubmit={handleSubmit}
          onClose={() => toggleComponent('main')}
          language={language}
        />
      )}

      {activeComponent === 'game' && (
        <SnakeGame onClose={() => toggleComponent('main')} language={language} />
      )}

      {activeComponent === 'spotify' && (
        <SpotifyTerminal onClose={() => toggleComponent('main')} language={language} />
      )}
    </main>
  )
}
