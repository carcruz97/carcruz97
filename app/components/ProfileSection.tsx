import Image from 'next/image'

interface ProfileSectionProps {
  language: 'en' | 'es'
}

export default function ProfileSection({ language }: ProfileSectionProps) {
  return (
    <div className="w-full max-w-md mx-auto bg-black bg-opacity-30 backdrop-blur-sm rounded-lg shadow-lg overflow-hidden border border-white border-opacity-20 mb-4">
      <div className="flex items-center justify-center p-4">
        <Image
          src="http://raw.githubusercontent.com/carcruz97/carcruz97/refs/heads/main/perfil.png"
          alt="Profile Picture"
          width={100}
          height={100}
          className="rounded-full border-2 border-white"
        />
      </div>
      <div className="text-center text-white p-4">
        <h1 className="text-2xl font-bold mb-2">Carmen Cruzado</h1>
        <p className="text-lg">{language === 'en' ? 'Machine Learning Engineer' : 'Ingeniera de Aprendizaje Automático'}</p>
      </div>
    </div>
  )
}
