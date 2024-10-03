export const commandData = {
  about: {
    en: { command: 'about', output: 'I am Carmen Cruzado, a Machine Learning Engineer with a passion for AI.' },
    es: { command: 'sobre mí', output: 'Soy Carmen Cruzado, una ingeniera de aprendizaje automático apasionada por la IA.' }
  },
  stack: {
    en: { command: 'stack', output: 'Python, TensorFlow, PyTorch, Kubernetes, Docker.' },
    es: { command: 'stack', output: 'Python, TensorFlow, PyTorch, Kubernetes, Docker.' }
  }
  // Add more commands as necessary
}

export const findCommand = (input: string, language: 'en' | 'es') => {
  const lowerInput = input.trim().toLowerCase()

  if (lowerInput === 'clear') {
    return 'clear'
  }

  for (const command in commandData) {
    if (commandData[command][language].command === lowerInput) {
      return command
    }
  }

  return null
}

