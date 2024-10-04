import { useState, useRef, useEffect } from 'react'
import { X } from 'lucide-react'
import { useCommands } from '@/hooks/useCommands'

interface TerminalProps {
  language: 'en' | 'es'
  toggleTerminal: () => void
}

export default function Terminal({ language, toggleTerminal }: TerminalProps) {
  const [output, setOutput] = useState<string[]>([])
  const [input, setInput] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)
  const terminalRef = useRef<HTMLDivElement>(null)
  const { handleCommand, welcomeMessage } = useCommands(language)

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight
    }
  }, [output])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const trimmedInput = input.trim().toLowerCase()
    const newOutput = handleCommand(trimmedInput, output)
    setOutput(newOutput)
    setInput('')
    inputRef.current?.focus()
  }

  return (
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
        {welcomeMessage.map((line, index) => (
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
  )
}
