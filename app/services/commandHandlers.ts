import { commands, commandRegexes } from './commandData'

export const findCommand = (input: string): string | null => {
  for (const [command, regex] of Object.entries(commandRegexes)) {
    if (regex.test(input)) {
      return command
    }
  }
  return null
}

export const handleCommand = (input: string, language: 'en' | 'es'): string[] => {
  const trimmedInput = input.trim().toLowerCase()
  const matchedCommand = findCommand(trimmedInput)

  if (matchedCommand === 'clear') {
    return []
  } else if (matchedCommand) {
    const commandOutput = commands[matchedCommand as keyof typeof commands][language]
    return [`$ ${commandOutput.command}`, commandOutput.output]
  } else {
    return [`$ ${input}`, language === 'en' ? `Command not found: ${input}. Type a valid command to explore the portfolio.` : `Comando no encontrado: ${input}. Escribe un comando válido para explorar el portafolio.`]
  }
}
