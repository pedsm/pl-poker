import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Pl Poker',
  description: 'Minimal planning',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className='max-h-screen min-h-screen grid-cols-1 grid grid-rows-[auto_32px]'>
          <main className="flex flex-col items-center justify-between p-24">
            {children}
          </main>
          <footer className='h-8 bg-slate-400 text-white align-middle text-right'>
            Replace footer
          </footer>
        </div>
      </body>
    </html>
  )
}
