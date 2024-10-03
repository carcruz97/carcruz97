import Link from 'next/link'
import { Linkedin, FileText, Twitter, Bot, Download, Github, CalendarClock, Terminal, Gamepad2, Music } from 'lucide-react'

interface SocialLinksProps {
  language: 'en' | 'es'
  generatePDF: () => void
  toggleTerminal: () => void
  toggleGame: () => void
  toggleSpotify: () => void
}

export default function SocialLinks({ language, generatePDF, toggleTerminal, toggleGame, toggleSpotify }: SocialLinksProps) {
  return (
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
  )
}