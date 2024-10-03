import { useCallback, useRef } from 'react';
import html2pdf from 'html2pdf.js';

export function usePDF() {
  const cvRef = useRef<HTMLDivElement>(null)

  const generatePDF = useCallback(() => {
    if (cvRef.current) {
      html2pdf().from(cvRef.current).save(`cv_${language}.pdf`)
    }
  }, [language])

  return { generatePDF, cvRef }
};
