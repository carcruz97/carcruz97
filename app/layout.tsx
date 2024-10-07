'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { Linkedin, FileText, Twitter, Bot, Download, Github, CalendarClock, Terminal, X, Gamepad2, Music } from 'lucide-react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import './global.css'

// Flag components
const Flag = ({ country }: { country: 'UK' | 'Spain' }) => {
  const ukFlag = (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 30" width="24" height="12">
      <clipPath id="s"><path d="M0,0 v30 h60 v-30 z"/></clipPath>
      <clipPath id="t"><path d="M30,15 h30 v15 z v15 h-30 z h-30 v-15 z v-15 h30 z"/></clipPath>
      <g clipPath="url(#s)">
        <path d="M0,0 v30 h60 v-30 z" fill="#012169"/>
        <path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" strokeWidth="6"/>
        <path d="M0,0 L60,30 M60,0 L0,30" clipPath="url(#t)" stroke="#C8102E" strokeWidth="4"/>
        <path d="M30,0 v30 M0,15 h60" stroke="#fff" strokeWidth="10"/>
        <path d="M30,0 v30 M0,15 h60" stroke="#C8102E" strokeWidth="6"/>
      </g>
    </svg>
  )

  const spainFlag = (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 30" width="24" height="12">
      <rect width="60" height="30" fill="#c60b1e"/>
      <rect width="60" height="15" fill="#ffc400" y="7.5"/>
    </svg>
  )

  return country === 'UK' ? ukFlag : spainFlag
}

// Game component
const SnakeGame = ({ onClose, language }: { onClose: () => void; language: 'en' | 'es' }) => {
  const [snake, setSnake] = useState<number[][]>([[0, 0]])
  const [food, setFood] = useState<number[]>([5, 5])
  const [direction, setDirection] = useState<'UP' | 'DOWN' | 'LEFT' | 'RIGHT'>('RIGHT')
  const [gameOver, setGameOver] = useState(false)
  const [level, setLevel] = useState(1)
  const [score, setScore] = useState(0)

  const handleKeyPress = useCallback((e: KeyboardEvent) => {
    const directions: { [key: string]: 'UP' | 'DOWN' | 'LEFT' | 'RIGHT' } = {
      ArrowUp: 'UP',
      ArrowDown: 'DOWN',
      ArrowLeft: 'LEFT',
      ArrowRight: 'RIGHT'
    }
    if (directions[e.key]) {
      setDirection(directions[e.key])
    }
  }, [])

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [handleKeyPress])

  useEffect(() => {
    if (gameOver) return

    const moveSnake = setInterval(() => {
      setSnake(prevSnake => {
        const newSnake = [...prevSnake]
        const head = [...newSnake[0]]

        const movements = {
          UP: () => head[0] = (head[0] - 1 + 10) % 10,
          DOWN: () => head[0] = (head[0] + 1) % 10,
          LEFT: () => head[1] = (head[1] - 1 + 10) % 10,
          RIGHT: () => head[1] = (head[1] + 1) % 10
        }

        movements[direction]()

        if (head[0] === food[0] && head[1] === food[1]) {
          setFood([Math.floor(Math.random() * 10), Math.floor(Math.random() * 10)])
          setScore(prevScore => {
            const newScore = prevScore + 1
            if (newScore % 5 === 0 && level < 3) {
              setLevel(prevLevel => prevLevel + 1)
            }
            return newScore
          })
        } else {
          newSnake.pop()
        }

        if (newSnake.some(segment => segment[0] === head[0] && segment[1] === head[1])) {
          setGameOver(true)
          return prevSnake
        }

        newSnake.unshift(head)
        return newSnake
      })
    }, 500 - (level - 1) * 100)

    return () => clearInterval(moveSnake)
  }, [direction, food, gameOver, level])

  const resetGame = () => {
    setSnake([[0, 0]])
    setFood([5, 5])
    setDirection('RIGHT')
    setGameOver(false)
    setLevel(1)
    setScore(0)
  }

  return (
    <div className="w-full max-w-md mx-auto bg-black bg-opacity-30 backdrop-blur-sm rounded-lg shadow-lg overflow-hidden border border-white border-opacity-20 font-mono">
      <div className="bg-black bg-opacity-30 p-2 flex items-center">
        <div className="flex space-x-2">
          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
          <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
        </div>
        <div className="flex-grow text-center">
          <span className="text-sm text-white font-medium">
            {language === 'en' ? 'Snake Game' : 'Juego de la Serpiente'}
          </span>
        </div>
        <button
          onClick={onClose}
          className="text-white hover:text-red-400 transition-colors"
          aria-label={language === 'en' ? "Close Snake Game" : "Cerrar Juego de la Serpiente"}
        >
          <X className="w-5 h-5" />
        </button>
      </div>
      <div className="bg-black bg-opacity-30 text-white p-4 text-sm h-[400px] overflow-y-auto">
        <div className="mb-4 text-center">
          <p>{language === 'en' ? 'Level' : 'Nivel'}: {level}</p>
          <p>{language === 'en' ? 'Score' : 'Puntuación'}: {score}</p>
        </div>
        <div className="grid grid-cols-10 gap-1 aspect-square w-full max-w-[300px] mx-auto">
          {Array(10).fill(null).map((_, rowIndex) => (
            Array(10).fill(null).map((_, colIndex) => (
              <div
                key={`${rowIndex}-${colIndex}`}
                className={`aspect-square ${
                  snake.some(([r, c]) => r === rowIndex && c === colIndex)
                    ? 'bg-green-500'
                    : food[0] === rowIndex && food[1] === colIndex
                    ? 'bg-red-500'
                    : 'bg-gray-800'
                }`}
              />
            ))
          ))}
        </div>
        {gameOver && (
          <div className="text-center mt-4">
            <p className="mb-2">{language === 'en' ? 'Game Over!' : '¡Juego Terminado!'}</p>
            <button
              onClick={resetGame}
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded text-sm"
            >
              {language === 'en' ? 'Play Again' : 'Jugar de Nuevo'}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

// Spotify Terminal component
const SpotifyTerminal = ({ onClose, language }: { onClose: () => void; language: 'en' | 'es' }) => {
  const [currentSong] = useState("Bohemian Rhapsody - Queen")

  return (
    <div className="w-full max-w-md mx-auto bg-black bg-opacity-30 backdrop-blur-sm rounded-lg shadow-lg overflow-hidden border border-white border-opacity-20 font-mono">
      <div className="bg-black bg-opacity-30 p-2 flex items-center">
        <div className="flex space-x-2">
          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
          <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
        </div>
        <div className="flex-grow text-center">
          <span className="text-sm text-white font-medium">Spotify Terminal</span>
        </div>
        <button
          onClick={onClose}
          className="text-white hover:text-red-400 transition-colors"
          aria-label={language === 'en' ? "Close Spotify Terminal" : "Cerrar Terminal de Spotify"}
        >
          <X className="w-5 h-5" />
        </button>
      </div>
      <div className="bg-black bg-opacity-30 text-white p-4 text-sm h-[400px] overflow-y-auto">
        <h2 className="text-lg font-bold mb-2">{language === 'en' ? 'Sound Processing Techniques' : 'Técnicas de Procesamiento de Sonido'}</h2>
        <h3 className="text-md font-semibold mb-1">Kalman Filter</h3>
        <p className="mb-2">
          {language === 'en' 
            ? "Kalman filtering is an algorithm that provides estimates of some unknown variables given the measurements observed over time. It's used in audio processing for noise reduction and audio enhancement."
            : "El filtrado de Kalman es un algoritmo que proporciona estimaciones de algunas variables desconocidas dadas las mediciones observadas a lo largo del tiempo. Se utiliza en el procesamiento de audio para la reducción de ruido y la mejora del audio."}
        </p>
        <h3 className="text-md font-semibold mb-1">Hugging Face</h3>
        <p className="mb-4">
          {language === 'en'
            ? "While Hugging Face is primarily known for NLP, it's expanding into audio processing. It offers pre-trained models for tasks like speech recognition, music generation, and audio classification using transformers."
            : "Aunque Hugging Face es conocido principalmente por el NLP, se está expandiendo al procesamiento de audio. Ofrece modelos pre-entrenados para tareas como reconocimiento de voz, generación de música y clasificación de audio utilizando transformers."}
        </p>
        <h2 className="text-lg font-bold mb-2">{language === 'en' ? 'Current Song' : 'Canción Actual'}</h2>
        <p>
          <a 
            href="https://open.spotify.com/" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-green-400 hover:underline"
          >
            {currentSong}
          </a>
        </p>
      </div>
    </div>
  )
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [language, setLanguage] = useState<'en' | 'es'>('en')
  const [activeSection, setActiveSection] = useState<'main' | 'terminal' | 'game' | 'spotify'>('main')
  const cvRef = useRef<HTMLDivElement>(null)

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

  const toggleLanguage = useCallback(() => setLanguage(prev => prev === 'en' ? 'es' : 'en'), [])

  const toggleSection = useCallback((section: 'main' | 'terminal' | 'game' | 'spotify') => {
    setActiveSection(prev => prev === section ? 'main' : section)
  }, [])

  const generatePDF = useCallback(() => {
    if (cvRef.current && typeof window !== 'undefined') {
      import('html2pdf.js').then(html2pdf => {
        html2pdf.default().from(cvRef.current).save(`cv_${language}.pdf`)
      }).catch(err => console.error('Error loading html2pdf:', err))
    }
  }, [language])

  return (
    <html lang={language}>
      <body>
        <div 
          className="min-h-screen bg-cover bg-center flex flex-col items-center justify-center p-4 sm:p-6 md:p-8 font-mono relative"
          style={{
            backgroundImage: "url('http://raw.githubusercontent.com/carcruz97/carcruz97/refs/heads/main/forest.png')"
          }}
        >
          <div className="absolute top-4 right-4">
            <button 
              onClick={toggleLanguage} 
              className="bg-black bg-opacity-30 backdrop-blur-sm rounded-lg shadow-lg overflow-hidden border border-white border-opacity-20 p-2 text-white hover:text-green-400 transition-colors"
              aria-label={language === 'en' ? "Switch to Spanish" : "Cambiar a Inglés"}
            >
              <Flag country={language ===   'en' ? 'UK' : 'Spain'} />
            </button>
          </div>

          <div className="w-full max-w-md mx-auto">
            <AnimatePresence mode="wait">
              {activeSection === 'main' && (
                <motion.div
                  key="main"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  {children}
                </motion.div>
              )}
              
              {activeSection === 'terminal' && (
                <motion.div
                  key="terminal"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  {children}
                </motion.div>
              )}

              {activeSection === 'game' && (
                <motion.div
                  key="game"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <SnakeGame onClose={() => toggleSection('main')} language={language} />
                </motion.div>
              )}

              {activeSection === 'spotify' && (
                <motion.div
                  key="spotify"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <SpotifyTerminal onClose={() => toggleSection('main')} language={language} />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Hidden CV content for PDF generation */}
            <div className="hidden" ref={cvRef}>
              <h2>{cvData[language].name}</h2>
              <p>{cvData[language].title}</p>
              <p>{cvData[language].experience}</p>
              <p>{cvData[language].education}</p>
            </div>
          </div>
        </div>
      </body>
    </html>
  )
}
