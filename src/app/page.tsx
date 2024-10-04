'use client'

import { useState } from 'react'
import Header from '@/components/Header'
import SocialLinks from '@/components/SocialLinks'
import Terminal from '@/components/Terminal'
import SnakeGame from '@/components/SnakeGame'
import SpotifyTerminal from '@/components/SpotifyTerminal'
import { useLanguage } from '@/hooks/useLanguage'
import { useCV } from '@/hooks/useCV'

export default function Portfolio() {
  const [isTerminalOpen, setIsTerminalOpen] = useState(false)
  const [isGameOpen, setIsGameOpen] = useState(false)
  const [isSpotifyOpen, setIsSpotifyOpen] = useState(false)
  const { language, toggleLanguage } = useLanguage()
  const { generatePDF } = useCV()

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
      <Header language={language} toggleLanguage={toggleLanguage} />

      {!isTerminalOpen && !isGameOpen && !isSpotifyOpen && (
        <>
          <SocialLinks 
            language={language} 
            generatePDF={generatePDF} 
            toggleTerminal={toggleTerminal}
            toggleGame={toggleGame}
            toggleSpotify={toggleSpotify}
          />
        </>
      )}
      
      {isTerminalOpen && (
        <Terminal language={language} toggleTerminal={toggleTerminal} />
      )}

      {isGameOpen && (
        <SnakeGame onClose={toggleGame} language={language} />
      )}

      {isSpotifyOpen && (
        <SpotifyTerminal onClose={toggleSpotify} language={language} />
      )}
    </div>
  )
}
