import { useCallback } from 'react'
import html2pdf from 'html2pdf.js'

export function useCV() {
  const generatePDF = useCallback(() => {
    const cvRef = document.getElementById('cv-content')
    if (cvRef) {
      html2pdf().from(cvRef).save('cv.pdf')
    }
  }, [])

  return { generatePDF }
}
