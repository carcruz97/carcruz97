import Image from 'next/image'
import { cvData } from '../services/cvData'

const ProfileCard = ({ language }: { language: 'en' | 'es' }) => (
  <div className="profile-card">
    <div className="profile-image-container">
      <Image
        src="/perfil.png"
        alt="Profile Picture"
        width={100}
        height={100}
        className="rounded-full border-2 border-white"
        unoptimized
      />
    </div>
    <div className="profile-info text-center">
      <h1 className="profile-name">{cvData[language].name}</h1>
      <p className="profile-title">{cvData[language].title}</p>
    </div>
  </div>
)

export default ProfileCard

