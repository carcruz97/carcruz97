import { Flag } from '@/components/Flag'

interface HeaderProps {
  language: 'en' | 'es'
  toggleLanguage: () => void
}

export default function Header({ language, toggleLanguage }: HeaderProps) {
  return (
    <>
      <div className="w-full flex justify-end mb-4">
        <button 
          onClick={toggleLanguage} 
          className="bg-black bg-opacity-30 backdrop-blur-sm rounded-lg shadow-lg overflow-hidden border border-white border-opacity-20 p-2 text-white hover:text-green-400 transition-colors"
          aria-label={language === 'en' ? "Switch to Spanish" : "Cambiar a Inglés"}
        >
          <Flag country={language === 'en' ? 'Spain' : 'UK'} />
        </button>
      </div>

      <div className="w-full max-w-md mx-auto bg-black bg-opacity-30 backdrop-blur-sm rounded-lg shadow-lg overflow-hidden border border-white border-opacity-20 mb-4">
        <div className="flex items-center justify-center p-4">
          <div 
            className="w-24 h-24 rounded-full bg-cover bg-center"
            style={{
              backgroundImage: "url('http://raw.githubusercontent.com/carcruz97/carcruz97/refs/heads/main/perfil.png')"
            }}
          />
        </div>
        <div className="text-center text-white p-4">
          <h1 className="text-2xl font-bold mb-2">Carmen Cruzado</h1>
          <p className="text-lg">{language === 'en' ? 'Machine Learning Engineer' : 'Ingeniera de Aprendizaje Automático'}</p>
        </div>
      </div>
    </>
  )
}
