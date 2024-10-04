'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { Linkedin, FileText, Twitter, Bot, Download, Github, CalendarClock, Terminal, X, Gamepad2, Music } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import html2pdf from 'html2pdf.js'

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
  const [food, setFood] = useState<number[]>([2, 2])
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
          UP: () => head[0] = (head[0] - 1 + 5) % 5,
          DOWN: () => head[0] = (head[0] + 1) % 5,
          LEFT: () => head[1] = (head[1] - 1 + 5) % 5,
          RIGHT: () => head[1] = (head[1] + 1) % 5
        }

        movements[direction]()

        if (head[0] === food[0] && head[1] === food[1]) {
          setFood([Math.floor(Math.random() * 5), Math.floor(Math.random() * 5)])
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
    setFood([2, 2])
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
      <div className="bg-black bg-opacity-30 text-white p-4 text-sm">
        <div className="mb-4">
          <p>{language === 'en' ? 'Level' : 'Nivel'}: {level}</p>
          <p>{language === 'en' ? 'Score' : 'Puntuación'}: {score}</p>
        </div>
        <div className="grid grid-cols-5 gap-1 mb-4">
          {Array(5).fill(null).map((_, rowIndex) => (
            Array(5).fill(null).map((_, colIndex) => (
              <div
                key={`${rowIndex}-${colIndex}`}
                className={`w-full pb-[100%] relative ${
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
          <div className="text-center">
            <p className="mb-2">{language === 'en' ? 'Game Over!' : '¡Juego Terminado!'}</p>
            <button
              onClick={resetGame}
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
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
      <div className="bg-black bg-opacity-30 text-white p-4 text-sm">
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

// Main component
export default function Portfolio() {
  const [output, setOutput] = useState<string[]>([])
  const [input, setInput] = useState('')
  const [language, setLanguage] = useState<'en' | 'es'>('en')
  const [isTerminalOpen, setIsTerminalOpen] = useState(false)
  const [isGameOpen, setIsGameOpen] = useState(false)
  const [isSpotifyOpen, setIsSpotifyOpen] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const terminalRef = useRef<HTMLDivElement>(null)
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

  const commands = {
    about: {
      en: {
        command: "about",
        output: "I'm a Machine Learning Engineer with 5 years of experience in developing cutting-edge AI solutions."
      },
      es: {
        command: "sobre",
        output: "Soy un Ingeniero de Aprendizaje Automático con 5 años de experiencia en el desarrollo de soluciones de IA de vanguardia."
      }
    },
    stack: {
      en: {
        command: "stack",
        output: "Python, TensorFlow, PyTorch, Scikit-learn, Natural Language Processing, Computer Vision, Reinforcement Learning, Docker, Git"
      },
      es: {
        command: "stack",
        output: "Python, TensorFlow, PyTorch, Scikit-learn, Procesamiento del Lenguaje Natural, Visión por Computadora, Aprendizaje por Refuerzo, Docker, Git"
      }
    },
    projects: {
      en: {
        command: "projects",
        output: `
    1. Sentiment Analysis API: Built a scalable API for real-time sentiment analysis of social media posts.
    2. Object Detection System: Developed a computer vision system for autonomous vehicles using YOLO architecture.
    3. Chatbot Framework: Created a flexible framework for building domain-specific chatbots using transformer models.
        `
      },
      es: {
        command: "proyectos",
        output: `
    1. API de Análisis de Sentimientos: Construí una API escalable para el análisis de sentimientos en tiempo real de publicaciones en redes sociales.
    2. Sistema de Detección de Objetos: Desarrollé un sistema de visión por computadora para vehículos autónomos utilizando la arquitectura YOLO.
    3. Marco de Chatbot: Creé un marco flexible para construir chatbots de dominio específico utilizando modelos de transformadores.
        `
      }
    },
    education: {
      en: {
        command: "education",
        output: "Ph.D. in Computer Science, specialization in Machine Learning - Stanford University (2018-2022)"
      },
      es: {
        command: "formacion",
        output: "Doctorado en Ciencias de la Computación, especialización en Aprendizaje Automático - Universidad de Stanford (2018-2022)"
      }
    },
    contact: {
      en: {
        command: "contact",
        output: "Email: ml.engineer@example.com | LinkedIn: linkedin.com/in/ml-engineer | GitHub: github.com/ml-engineer"
      },
      es: {
        command: "contacto",
        output: "Correo: ml.engineer@example.com | LinkedIn: linkedin.com/in/ml-engineer | GitHub: github.com/ml-engineer"
      }
    },
    clear: {
      en: {
        command: "clear",
        output: "clear"
      },
      es: {
        command: "clear",
        output: "clear"
      }
    },
    savecv: {
      en: {
        command: "save cv",
        output: "Saving CV as PDF...CV saved successfully! You can find it in your downloads folder."
      },
      es: {
        command: "CV",
        output: "Guardando CV como PDF... ¡CV guardado con éxito! Puedes encontrarlo en tu carpeta de descargas."
      }
    }
  }

  const commandRegexes = {
    about: /^(about|sobre)$/i,
    stack: /^(stack|stack)$/i,
    projects: /^(projects|proyectos)$/i,
    education: /^(education|formacion)$/i,
    contact: /^(contact|contacto)$/i,
    clear: /^(clear|clear)$/i,
    savecv: /^(save cv|CV)$/i
  }

  const welcomeMessage = {
    en: [
      "Welcome to ML Engineer's Portfolio.",
      "Available commands: " + Object.keys(commands).map(cmd => commands[cmd as keyof typeof commands].en.command).join(', '),
      "Type a command to explore the portfolio.",
    ],
    es: [
      "Bienvenido al Portafolio del Ingeniero de Aprendizaje Automático.",
      "Comandos disponibles: " + Object.keys(commands).map(cmd => commands[cmd as keyof typeof commands].es.command).join(', '),
      "Escribe un comando para explorar el portafolio.",
    ]
  }

  useEffect(() => {
    setOutput([])
  }, [language])

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight
    }
  }, [output])

  const findCommand = useCallback((input: string): string | null => {
    for (const [command, regex] of Object.entries(commandRegexes)) {
      if (regex.test(input)) {
        return command
      }
    }
    return null
  }, [])

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault()
    const trimmedInput = input.trim().toLowerCase()
    let newOutput: string[]

    const matchedCommand = findCommand(trimmedInput)

    if (matchedCommand === 'clear') {
      newOutput = []
    } else if (matchedCommand) {
      const commandOutput = commands[matchedCommand as keyof typeof commands][language]
      newOutput = [...output, `$ ${commandOutput.command}`, commandOutput.output]
    } else {
      newOutput = [...output, `$ ${input}`, language === 'en' ? `Command not found: ${input}. Type a valid command to explore the portfolio.` : `Comando no encontrado: ${input}. Escribe un comando válido para explorar el portafolio.`]
    }

    setOutput(newOutput)
    setInput('')
    inputRef.current?.focus()
  }, [input, language, output, findCommand])

  const toggleLanguage = useCallback(() => setLanguage(prev => prev === 'en' ? 'es' : 'en'), [])

  const toggleTerminal = useCallback(() => {
    setIsTerminalOpen(prev => !prev)
    setIsGameOpen(false)
    setIsSpotifyOpen(false)
  }, [])

  const toggleGame = useCallback(() => {
    setIsGameOpen(prev => !prev)
    setIsTerminalOpen(false)
    setIsSpotifyOpen(false)
  }, [])

  const toggleSpotify = useCallback(() => {
    setIsSpotifyOpen(prev => !prev)
    setIsTerminalOpen(false)
    setIsGameOpen(false)
  }, [])

  const generatePDF = useCallback(() => {
    if (cvRef.current) {
      html2pdf().from(cvRef.current).save(`cv_${language}.pdf`)
    }
  }, [language])

  return (
    <div 
      className="min-h-screen bg-cover bg-center flex flex-col items-center p-4 sm:p-6 md:p-8 font-mono"
      style={{
        backgroundImage: "url('http://raw.githubusercontent.com/carcruz97/carcruz97/refs/heads/main/forest.png')"
      }}
    >
      <div className="w-full flex justify-end mb-4">
        <button 
          onClick={toggleLanguage} 
          className="bg-black bg-opacity-30 backdrop-blur-sm rounded-lg shadow-lg overflow-hidden border border-white border-opacity-20 p-2 text-white hover:text-green-400 transition-colors"
          aria-label={language === 'en' ? "Switch to Spanish" : "Cambiar a Inglés"}
        >
          <Flag country={language === 'en' ? 'Spain' : 'UK'} />
        </button>
      </div>

      {!isTerminalOpen && !isGameOpen && !isSpotifyOpen && (
        <>
          <div className="w-full max-w-md mx-auto bg-black bg-opacity-30 backdrop-blur-sm rounded-lg shadow-lg overflow-hidden border border-white border-opacity-20 mb-4">
            <div className="flex items-center justify-center p-4">
              <div 
                className="w-24 h-24 rounded-full bg-cover bg-center"
                style={{
                  backgroundImage: "url('http://raw.githubusercontent.com/carcruz97/carcruz97/refs/heads/main/perfil.png')"
                }}
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
                onClick={generatePDF} 
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
    </div>
  )
}
