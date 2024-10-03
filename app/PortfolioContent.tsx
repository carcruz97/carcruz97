'use client'

import React, { useState, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Linkedin, FileText, Twitter, Bot, Download, Github, CalendarClock, Terminal, X, Gamepad2, Music } from 'lucide-react'
import { UKFlag, SpainFlag } from './Flags'
import { SnakeGame } from './SnakeGame'
import { SpotifyTerminal } from './SpotifyTerminal'
import { useCommands } from '../hooks/useCommands'
import { generatePDF } from '../utils/generatePDF'

export default function PortfolioContent() {
  const [language, setLanguage] = useState<'en' | 'es'>('en')
  const [isTerminalOpen, setIsTerminalOpen] = useState(false)
  const [isGameOpen, setIsGameOpen] = useState(false)
  const [isSpotifyOpen, setIsSpotifyOpen] = useState(false)
  const cvRef = useRef<HTMLDivElement>(null)

  const { output, input, setInput, handleSubmit, inputRef, terminalRef } = useCommands(language)

  const cvData = {
    en: {
      name: 'Carmen Cruzado',
      title: 'Machine Learning Engineer',
      experience: '5+ years of experience in developing cutting-edge AI solutions. Skilled in Python, TensorFlow, PyTorch, and NLP.',
      education: 'Ph.D. in Computer Science, specialization in Machine Learning - Stanford University (2018-2022)',
    },
    es: {
      name: 'Carmen Cruzado',
      title: 'Ingeniera de Aprendizaje Automático',
      experience: 'Más de 5 años de experiencia en el desarrollo de soluciones de IA de vanguardia. Habilidades en Python, TensorFlow, PyTorch y PLN.',
      education: 'Doctorado en Ciencias de la Computación, especialización en Aprendizaje Automático - Universidad de Stanford (2018-2022)',
    }
  }

  const welcomeMessage = {
    en: [
      "Welcome to ML Engineer's Portfolio.",
      "Available commands: about, stack, projects, education, contact, clear, save cv",
      "Type a command to explore the portfolio.",
    ],
    es: [
      "Bienvenido al Portafolio del Ingeniero de Aprendizaje Automático.",
      "Comandos disponibles: sobre, stack, proyectos, formacion, contacto, clear, CV",
      "Escribe un comando para explorar el portafolio.",
    ]
  }

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'en' ? 'es' : 'en')
  }

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
    <>
      <div className="w-full flex justify-end mb-4">
        <button 
          onClick={toggleLanguage} 
          className="bg-black bg-opacity-30 backdrop-blur-sm rounded-lg shadow-lg overflow-hidden border border-white border-opacity-20 p-2 text-white hover:text-green-400 transition-colors"
          aria-label={language === 'en' ? "Switch to Spanish" : "Cambiar a Inglés"}
        >
          {language === 'en' ? <SpainFlag /> : <UKFlag />}
        </button>
      </div>

      {!isTerminalOpen && !isGameOpen && !isSpotifyOpen && (
        <>
          <div className="w-full max-w-md mx-auto bg-black bg-opacity-30 backdrop-blur-sm rounded-lg shadow-lg overflow-hidden border border-white border-opacity-20 mb-4">
            <div className="flex items-center justify-center p-4">
              <Image
                src="http://raw.githubusercontent.com/carcruz97/carcruz97/refs/heads/main/perfil.png"
                alt="Profile Picture"
                width={100}
                height={100}
                className="rounded-full border-2 border-white"
              />
            </div>
            <div className="text-center text-white p-4">
              <h1 className="text-2xl font-bold mb-2">Carmen Cruzado</h1>
              <p className="text-lg">{language === 'en' ? 'Machine Learning Engineer' : 'Ingeniera de Aprendizaje Automático'}</p>
            </div>
          </div>
          
          <div className="w-full max-w-md mx-auto bg-black bg-opacity-30 backdrop-blur-sm rounded-lg shadow-lg overflow-hidden border border-white border-opacity-20 p-2 sm:p-3 md:p-4">
            <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
              <Link href="https://www.linkedin.com/in/carmen-cruzado/" target="_blank" rel="noopener noreferrer" className="text-white hover:text-blue-400 transition-colors">
                <Linkedin className="w-5 h-5 sm:w-6 sm:h-6" />
                <span className="sr-only">LinkedIn</span>
              </Link>
              <Link href="https://medium.com/@carcruz97" target="_blank" rel="noopener noreferrer" className="text-white hover:text-green-400 transition-colors">
                <FileText className="w-5 h-5 sm:w-6 sm:h-6" />
                <span className="sr-only">Medium</span>
              </Link>
              <Link href="https://x.com/carcruz97" target="_blank" rel="noopener noreferrer" className="text-white hover:text-blue-300 transition-colors">
                <Twitter className="w-5 h-5 sm:w-6 sm:h-6" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link href="https://replicate.com/carcruz97" target="_blank" rel="noopener noreferrer" className="text-white hover:text-purple-400 transition-colors">
                <Bot className="w-5 h-5 sm:w-6 sm:h-6" />
                <span className="sr-only">Replicate</span>
              </Link>
              <Link href="https://calendly.com/carmencruzado97/data-ai" target="_blank" rel="noopener noreferrer" className="text-white hover:text-green-400 transition-colors">
                <CalendarClock className="w-5 h-5 sm:w-6 sm:h-6" />
                <span className="sr-only">Calendar</span>
              </Link>
              <Link href="https://github.com/carcruz97/" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-400 transition-colors">
                <Github className="w-5 h-5 sm:w-6 sm:h-6" />
                <span className="sr-only">GitHub</span>
              </Link>
              <button 
                onClick={() => generatePDF(cvRef, language)} 
                className="text-white hover:text-yellow-400 transition-colors"
                aria-label={language === 'en' ? "Download CV" : "Descargar CV"}
              >
                <Download className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
              <button
                onClick={toggleTerminal}
                className="text-white hover:text-cyan-400 transition-colors"
                aria-label={language === 'en' ? "Open Terminal" : "Abrir Terminal"}
              >
                <Terminal className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
              <button
                onClick={toggleGame}
                className="text-white hover:text-purple-400 transition-colors"
                aria-label={language === 'en' ? "Play Snake Game" : "Jugar Snake"}
              >
                <Gamepad2 className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
              <button
                onClick={toggleSpotify}
                className="text-white hover:text-green-400 transition-colors"
                aria-label={language === 'en' ? "Open Spotify Terminal" : "Abrir Terminal de Spotify"}
              >
                <Music className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
            </div>
          </div>
        </>
      )}
      
      {isTerminalOpen && (
        <div className="w-full max-w-md mx-auto bg-black bg-opacity-30 backdrop-blur-sm rounded-lg shadow-lg overflow-hidden border border-white border-opacity-20">
          <div className="bg-black bg-opacity-30 p-2 flex items-center">
            <div className="flex space-x-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            </div>
            <div className="flex-grow text-center">
              <span className="text-sm text-white font-medium">The Carmen's Forest</span>
            </div>
            <button
              onClick={toggleTerminal}
              className="text-white hover:text-red-400 transition-colors"
              aria-label={language === 'en' ? "Close Terminal" : "Cerrar Terminal"}
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="bg-black bg-opacity-30 text-white p-2 sm:p-3 md:p-4 text-xs sm:text-sm">
            {welcomeMessage[language] && welcomeMessage[language].map((line, index) => (
              <div key={index} className="mb-1 sm:mb-2 font-bold text-shadow">
                {line}
              </div>
            ))}
          </div>
          <div 
            ref={terminalRef}
            className="bg-black bg-opacity-30 text-white p-2 sm:p-3 md:p-4 text-xs sm:text-sm h-64 sm:h-80 md:h-96 overflow-y-auto"
          >
            {output.map((line, index) => (
              <div key={index} className="mb-1 sm:mb-2 font-bold text-shadow">
                {line}
              </div>
            ))}
            <form onSubmit={handleSubmit} className="flex items-center mt-2">
              <span className="mr-2 font-bold text-shadow">$</span>
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="flex-grow bg-transparent outline-none font-bold text-shadow"
                autoFocus
                ref={inputRef}
                aria-label={language === 'en' ? "Enter command" : "Ingrese el comando"}
              />
            </form>
          </div>
        </div>
      )}

      {isGameOpen && (
        <SnakeGame onClose={toggleGame} language={language} />
      )}

      {isSpotifyOpen && (
        <SpotifyTerminal onClose={toggleSpotify} language={language} />
      )}

      {/* Hidden CV content for PDF generation */}
      <div className="hidden" ref={cvRef}>
        <h2>{cvData[language].name}</h2>
        <p>{cvData[language].title}</p>
        <p>{cvData[language].experience}</p>
        <p>{cvData[language].education}</p>
      </div>
    </>
  )
}
