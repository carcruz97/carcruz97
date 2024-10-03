'use client'
import { useState, useRef, useEffect } from 'react'
import Terminal from './components/Terminal'
import SocialLinks from './components/SocialLinks'
import ProfileCard from './components/ProfileCard'
import SnakeGame from './components/SnakeGame'
import SpotifyTerminal from './components/SpotifyTerminal'
import { cvData } from './services/cvData'
import { generatePDF } from './services/cvGenerator'
import { SpainFlag, UKFlag, Download, Terminal as TerminalIcon, X } from 'lucide-react'

const HomePage = () => {
  const [language, setLanguage] = useState<'en' | 'es'>('en')
  const [isTerminalOpen, setIsTerminalOpen] = useState(false)
  const [isGameOpen, setIsGameOpen] = useState(false)
  const [isSpotifyOpen, setIsSpotifyOpen] = useState(false)
  const cvRef = useRef<HTMLDivElement>(null)

  const toggleLanguage = () => setLanguage(prev => prev === 'en' ? 'es' : 'en')
  const toggleTerminal = () => setIsTerminalOpen(prev => !prev)
  const toggleGame = () => setIsGameOpen(prev => !prev)
  const toggleSpotify = () => setIsSpotifyOpen(prev => !prev)

  return (
    <div 
      className="min-h-screen bg-cover bg-center flex flex-col items-center p-4 sm:p-6 md:p-8 font-mono"
      style={{ backgroundImage: "url('/forest.png')" }}
    >
      <div className="w-full flex justify-end mb-4">
        <button onClick={toggleLanguage} className="button-style">
          {language === 'en' ? <SpainFlag /> : <UKFlag />}
        </button>
      </div>

      {!isTerminalOpen && !isGameOpen && !isSpotifyOpen && (
        <>
          <ProfileCard language={language} />
          <SocialLinks generatePDF={() => generatePDF(cvRef, language)} toggleTerminal={toggleTerminal} toggleGame={toggleGame} toggleSpotify={toggleSpotify} />
        </>
      )}

      {isTerminalOpen && <Terminal language={language} toggleTerminal={toggleTerminal} />}
      {isGameOpen && <SnakeGame onClose={toggleGame} language={language} />}
      {isSpotifyOpen && <SpotifyTerminal onClose={toggleSpotify} language={language} />}

      <div className="hidden" ref={cvRef}>
        <h2>{cvData[language].name}</h2>
        <p>{cvData[language].title}</p>
        <p>{cvData[language].experience}</p>
        <p>{cvData[language].education}</p>
      </div>
    </div>
  )
};

export default HomePage

