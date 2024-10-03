import { useState, useCallback } from 'react';

export function useLanguage() {
  const [language, setLanguage] = useState<'en' | 'es'>('en')

  const toggleLanguage = useCallback(() => {
    setLanguage(prev => prev === 'en' ? 'es' : 'en')
  }, [])

  return { language, toggleLanguage }
};
