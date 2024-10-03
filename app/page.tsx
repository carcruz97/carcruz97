'use client'

import { useState } from 'react'
import ProfileSection from '@/components/ProfileSection'
import SocialLinks from '@/components/SocialLinks'
import Terminal from '@/components/Terminal'
import SnakeGame from '@/components/SnakeGame'
import SpotifyTerminal from '@/components/SpotifyTerminal'
import LanguageToggle from '@/components/LanguageToggle'
import { useLanguage } from '@/hooks/useLanguage'
import { usePDF } from '@/hooks/usePDF'

export default function Portfolio() {
  const [isTerminalOpen, setIsTerminalOpen] = useState(false)
  const [isGameOpen, setIsGameOpen] = useState(false)
  const [isSpotifyOpen, setIsSpotifyOpen] = useState(false)
  const { language, toggleLanguage } = useLanguage()
  const { generatePDF } = usePDF()

  const toggleTerminal = () => {
    setIsTerminalOpen(prev => !prev)
    setIsGameOpen(false)
    setIsSpotifyOpen(false)
  }

  const toggleGame = () => {
    setIsGameOpen(prev => !prev)
    setIsTerminalOpen(false)
    setIsSpotifyOpen(false)
  }

  const toggleSpotify = () => {
    setIsSpotifyOpen(prev => !prev)
    setIsTerminalOpen(false)
    setIsGameOpen(false)
  }

  return (
    <div 
      className="min-h-screen bg-cover bg-center flex flex-col items-center p-4 sm:p-6 md:p-8 font-mono"
      style={{
        backgroundImage: "url('http://raw.githubusercontent.com/carcruz97/carcruz97/refs/heads/main/forest.png')"
      }}
    >
      <LanguageToggle language={language} toggleLanguage={toggleLanguage} />

      {!isTerminalOpen && !isGameOpen && !isSpotifyOpen && (
        <>
          <ProfileSection language={language} />
          <SocialLinks 
            language={language} 
            generatePDF={generatePDF} 
            toggleTerminal={toggleTerminal}
            toggleGame={toggleGame}
            toggleSpotify={toggleSpotify}
          />
        </>
      )}
      
      {isTerminalOpen && <Terminal language={language} onClose={toggleTerminal} />}
      {isGameOpen && <SnakeGame language={language} onClose={toggleGame} />}
      {isSpotifyOpen && <SpotifyTerminal language={language} onClose={toggleSpotify} />}
    </div>
  )
}
