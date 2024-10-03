'use client'

import { useEffect, useState } from 'react'

const SnakeGame = ({ onClose }: { onClose: () => void }) => {
  const [snake, setSnake] = useState([[0, 0]])
  const [food, setFood] = useState([Math.floor(Math.random() * 20), Math.floor(Math.random() * 20)])
  const [direction, setDirection] = useState<[number, number]>([0, 1])
  const [gameOver, setGameOver] = useState(false)

  const moveSnake = () => {
    setSnake(prevSnake => {
      const head = prevSnake[0]
      const newHead = [head[0] + direction[0], head[1] + direction[1]]

      if (newHead[0] < 0 || newHead[0] >= 20 || newHead[1] < 0 || newHead[1] >= 20 || prevSnake.slice(1).some(segment => segment[0] === newHead[0] && segment[1] === newHead[1])) {
        setGameOver(true)
        return prevSnake
      }

      const newSnake = [newHead, ...prevSnake]
      if (newHead[0] === food[0] && newHead[1] === food[1]) {
        setFood([Math.floor(Math.random() * 20), Math.floor(Math.random() * 20)])
      } else {
        newSnake.pop()
      }

      return newSnake
    })
  }

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowUp':
          setDirection([-1, 0])
          break
        case 'ArrowDown':
          setDirection([1, 0])
          break
        case 'ArrowLeft':
          setDirection([0, -1])
          break
        case 'ArrowRight':
          setDirection([0, 1])
          break
      }
    }

    const interval = setInterval(moveSnake, 200)
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      clearInterval(interval)
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [direction, food])

  if (gameOver) {
    return (
      <div className="game-over">
        <h2>Game Over</h2>
        <button onClick={onClose}>Close</button>
      </div>
    )
  }

  return (
    <div className="snake-game">
      <div className="grid">
        {Array.from({ length: 20 }).map((_, row) =>
          <div key={row} className="row">
            {Array.from({ length: 20 }).map((_, col) =>
              <div key={col} className={`cell ${snake.some(segment => segment[0] === row && segment[1] === col) ? 'snake' : ''} ${food[0] === row && food[1] === col ? 'food' : ''}`}></div>
            )}
          </div>
        )}
      </div>
    </div>
  )
};

export default SnakeGame

