import { useCallback } from 'react'

export function useCommands(language: 'en' | 'es') {
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

  const comma
