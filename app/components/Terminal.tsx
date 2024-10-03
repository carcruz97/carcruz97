import { useState, useRef, useEffect } from 'react'
import { commandData, findCommand } from '../services/commandHandlers'

const Terminal = ({ language, toggleTerminal }: { language: 'en' | 'es', toggleTerminal: () => void }) => {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState<string[]>([])
  const terminalRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight
    }
  }, [output])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const trimmedInput = input.trim().toLowerCase()
    let newOutput: string[] = []

    const matchedCommand = findCommand(trimmedInput, language)

    if (matchedCommand === 'clear') {
      newOutput = []
    } else if (matchedCommand) {
      const commandOutput = commandData[matchedCommand][language]
      newOutput = [...output, `$ ${commandOutput.command}`, commandOutput.output]
    } else {
      newOutput = [...output, `$ ${input}`, language === 'en' ? `Command not found: ${input}.` : `Comando no encontrado: ${input}.`]
    }

    setOutput(newOutput)
    setInput('')
  }

  return (
    <div className="terminal-wrapper">
      <div className="terminal-header">
        <div className="terminal-buttons">
          <div className="button-red"></div>
          <div className="button-yellow"></div>
          <div className="button-green"></div>
        </div>
        <span className="terminal-title">The Carmen's Forest</span>
        <button onClick={toggleTerminal} className="close-button">
          <X />
        </button>
      </div>

      <div ref={terminalRef} className="terminal-output">
        {output.map((line, index) => (
          <div key={index} className="terminal-line">{line}</div>
        ))}
        <form onSubmit={handleSubmit} className="terminal-input-form">
          <span className="terminal-prompt">$</span>
          <input type="text" value={input} onChange={(e) => setInput(e.target.value)} className="terminal-input" />
        </form>
      </div>
    </div>
  )
}

export default Terminal

