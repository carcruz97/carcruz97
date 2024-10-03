import html2pdf from 'html2pdf.js'

export const generatePDF = (cvRef: any, language: 'en' | 'es') => {
  const options = {
    margin: 0,
    filename: language === 'en' ? 'Carmen_Cruzado_CV_EN.pdf' : 'Carmen_Cruzado_CV_ES.pdf',
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
  }

  html2pdf().from(cvRef.current).set(options).save()
}
