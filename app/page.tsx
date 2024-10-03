'use client'

import { useState } from 'react'
import { Linkedin, FileText, Twitter, Bot, Download, Github, CalendarClock, Terminal, Gamepad2, Music } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { useLanguage } from '../hooks/useLanguage'
import { useTerminal } from '../hooks/useTerminal'
import ProfileCard from '../components/ProfileCard'
import SocialLinks from '../components/SocialLinks'
import TerminalWindow from '../components/TerminalWindow'
import SnakeGame from '../components/SnakeGame'
import SpotifyTerminal from '../components/SpotifyTerminal'

export default function Home() {
  const { language, toggleLanguage } = useLanguage()
  const { output, input, setInput, handleSubmit } = useTerminal(language)
  const [isTerminalOpen, setIsTerminalOpen] = useState(false)
  const [isGameOpen, setIsGameOpen] = useState(false)
  const [isSpotifyOpen, setIsSpotifyOpen] = useState(false)

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
    <main className="min-h-screen bg-cover bg-center flex flex-col items-center p-4 sm:p-6 md:p-8 font-mono">
      <div className="w-full flex justify-end mb-4">
        <button 
          onClick={toggleLanguage} 
          className="bg-black bg-opacity-30 backdrop-blur-sm rounded-lg shadow-lg overflow-hidden border border-white border-opacity-20 p-2 text-white hover:text-green-400 transition-colors"
          aria-label={language === 'en' ? "Switch to Spanish" : "Cambiar a Inglés"}
        >
          {language === 'en' ? 'ES' : 'EN'}
        </button>
      </div>

      {!isTerminalOpen && !isGameOpen && !isSpotifyOpen && (
        <>
          <ProfileCard language={language} />
          <SocialLinks 
            toggleTerminal={toggleTerminal}
            toggleGame={toggleGame}
            toggleSpotify={toggleSpotify}
            language={language}
          />
        </>
      )}
      
      {isTerminalOpen && (
        <TerminalWindow 
          output={output}
          input={input}
          setInput={setInput}
          handleSubmit={handleSubmit}
          onClose={toggleTerminal}
          language={language}
        />
      )}

      {isGameOpen && (
        <SnakeGame onClose={toggleGame} language={language} />
      )}

      {isSpotifyOpen && (
        <SpotifyTerminal onClose={toggleSpotify} language={language} />
      )}
    </main>
  )
}
