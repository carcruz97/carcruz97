"use client" // Add this line at the top

import { useState, useEffect } from 'react';

const SpotifyTerminal = ({ onClose, language }: { onClose: () => void; language: 'en' | 'es' }) => {
  const [command, setCommand] = useState('');
  const [output, setOutput] = useState<string[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    processCommand(command);
    setCommand('');
  };

  const processCommand = (cmd: string) => {
    // Simulate command processing
    if (cmd.trim().toLowerCase() === 'play') {
      setOutput((prev) => [...prev, language === 'en' ? 'Playing music...' : 'Reproduciendo música...']);
    } else if (cmd.trim().toLowerCase() === 'stop') {
      setOutput((prev) => [...prev, language === 'en' ? 'Music stopped.' : 'Música detenida.']);
    } else {
      setOutput((prev) => [...prev, `${cmd}: Command not found.`]);
    }
  };

  return (
    <div className="spotify-terminal">
      <button onClick={onClose} className="close-button">Close</button>
      <div className="terminal-output">
        {output.map((line, index) => (
          <div key={index} className="terminal-line">{line}</div>
        ))}
      </div>
      <form onSubmit={handleSubmit} className="terminal-input-form">
        <input type="text" value={command} onChange={(e) => setCommand(e.target.value)} />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default SpotifyTerminal;

