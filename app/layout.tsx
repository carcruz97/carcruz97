import './global.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Carmen Cruzado - Machine Learning Engineer Portfolio',
  description: 'Portfolio of Carmen Cruzado, a Machine Learning Engineer with expertise in AI solutions.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-forest`}>
        <main className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-6 md:p-8">
          {children}
        </main>
      </body>
    </html>
  )
}
