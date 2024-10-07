import Link from 'next/link'
import { Linkedin, FileText, Twitter, Bot, Download, Github, CalendarClock, Terminal, Gamepad2, Music } from 'lucide-react'

export default function Page() {
  return (
    <>
      <div className="bg-black bg-opacity-30 backdrop-blur-sm rounded-lg shadow-lg overflow-hidden border border-white border-opacity-20 mb-4">
        <div className="flex items-center p-4">
          <div 
            className="w-24 h-24 rounded-full bg-cover bg-center mr-4 flex-shrink-0"
            style={{
              backgroundImage: "url('http://raw.githubusercontent.com/carcruz97/carcruz97/refs/heads/main/perfil.png')"
            }}
            aria-label="Profile photo of Carmen Cruzado"
          />
          <div className="text-white">
            <h1 className="text-2xl font-bold mb-2">Carmen Cruzado</h1>
            <p className="text-lg">Machine Learning Engineer</p>
          </div>
        </div>
      </div>
      
      <div className="bg-black bg-opacity-30 backdrop-blur-sm rounded-lg shadow-lg overflow-hidden border border-white border-opacity-20 p-2 sm:p-3 md:p-4">
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
            className="text-white hover:text-yellow-400 transition-colors"
            aria-label="Download CV"
          >
            <Download className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
          <button
            className="text-white hover:text-cyan-400 transition-colors"
            aria-label="Open Terminal"
          >
            <Terminal className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
          <button
            className="text-white hover:text-purple-400 transition-colors"
            aria-label="Play Snake Game"
          >
            <Gamepad2 className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
          <button
            className="text-white hover:text-green-400 transition-colors"
            aria-label="Open Spotify Terminal"
          >
            <Music className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
        </div>
      </div>
    </>
  )
}
