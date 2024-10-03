import { useState, useEffect, useCallback } from 'react'
import { X } from 'lucide-react'

interface SnakeGameProps {
  language: 'en' | 'es'
  onClose: () => void
}

export default function SnakeGame({ language, onClose }: SnakeGameProps) {
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