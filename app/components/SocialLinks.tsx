'use client'
import { Download, Terminal as TerminalIcon, Gamepad2, Music, Linkedin, Twitter, Github, FileText, CalendarClock, Bot } from 'lucide-react'

const SocialLinks = ({ generatePDF, toggleTerminal, toggleGame, toggleSpotify }: any) => (
  <div className="social-links">
    <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
      <a href="https://linkedin.com/in/carmen-cruzado/" target="_blank" className="social-link">
        <Linkedin />
      </a>
      <a href="https://medium.com/@carcruz97" target="_blank" className="social-link">
        <FileText />
      </a>
      <a href="https://x.com/carcruz97" target="_blank" className="social-link">
        <Twitter />
      </a>
      <a href="https://github.com/carcruz97/" target="_blank" className="social-link">
        <Github />
      </a>
      <a href="https://replicate.com/carcruz97" target="_blank" className="social-link">
        <Bot />
      </a>
      <a href="https://calendly.com/carmencruzado97/data-ai" target="_blank" className="social-link">
        <CalendarClock />
      </a>
      <button onClick={generatePDF} className="social-link">
        <Download />
      </button>
      <button onClick={toggleTerminal} className="social-link">
        <TerminalIcon />
      </button>
      <button onClick={toggleGame} className="social-link">
        <Gamepad2 />
      </button>
      <button onClick={toggleSpotify} className="social-link">
        <Music />
      </button>
    </div>
  </div>
)

export default SocialLinks

