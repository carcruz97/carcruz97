'use client'
import React from 'react'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import Link from 'next/link'
import { Linkedin, FileText, Twitter, Bot, Download, Github, CalendarClock, Terminal, Gamepad2, Music } from 'lucide-react'

const DynamicPortfolioContent = dynamic(() => import('@/PortfolioContent'), { ssr: false });

export default function Page() {
  return (
    <div 
      className="min-h-screen bg-cover bg-center flex flex-col items-center p-4 sm:p-6 md:p-8 font-mono"
      style={{
        backgroundImage: "url('http://raw.githubusercontent.com/carcruz97/carcruz97/refs/heads/main/forest.png')"
      }}
    >
      <DynamicPortfolioContent />
    </div>
  )
}
