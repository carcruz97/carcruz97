import html2pdf from 'html2pdf.js'

export const generatePDF = (cvRef: React.RefObject<HTMLDivElement>, language: 'en' | 'es') => {
  if (cvRef.current) {
    html2pdf()
      .from(cvRef.current)
      .save(`cv_${language}.pdf`)
  }
}
