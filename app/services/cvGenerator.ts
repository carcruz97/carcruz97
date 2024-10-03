import html2pdf from 'html2pdf.js'
import { cvData } from './cvData'

export const generateCV = (language: 'en' | 'es') => {
  const cv = document.createElement('div')
  cv.innerHTML = `
    <h2>${cvData[language].name}</h2>
    <p>${cvData[language].title}</p>
    <p>${cvData[language].experience}</p>
    <p>${cvData[language].education}</p>
  `

  html2pdf().from(cv).save(`cv_${language}.pdf`)
}
