'use client' // Add this line at the top
import { useState } from 'react'
import { X } from 'lucide-react'

interface SpotifyTerminalProps {
  onClose: () => void
  language: 'en' | 'es'
}

export default function SpotifyTerminal({ onClose, language }: SpotifyTerminalProps) {
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
