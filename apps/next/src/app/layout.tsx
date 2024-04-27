import { ReactNode } from 'react'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Link from 'next/link'
import { GitHubLogoIcon } from '@radix-ui/react-icons'
import { Coffee } from 'lucide-react'
import { Toaster } from '@/components/ui/sonner'
import { ThemeProvider } from 'next-themes'
import { cn } from '@/lib/utils'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Pl Poker',
  description: 'Minimal planning',
}

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn(inter.className, 'bg-background')}>
        <ThemeProvider attribute='class'>
          <div vaul-drawer-wrapper="" className='max-h-screen min-h-screen grid-cols-1 grid grid-rows-[auto_32px]'>
            <main className="flex flex-col items-center justify-between bg-background">
              {children}
            </main>
            <footer className='h-8 bg-accent text-white flex px-2 gap-2 items-baseline align-baseline flex-row-reverse'>
              <Link href='https://github.com/pedsm/pl-poker' target='_blank'>
                <GitHubLogoIcon width={18} height={18} className='inline h-8' />
              </Link>
              <Link href='https://ko-fi.com/pedsm' target='_blank'>
                <Coffee width={18} height={18} className='inline' />
              </Link>
            </footer>
          </div>
          <Toaster closeButton />
        </ThemeProvider>
      </body>
    </html>
  )
}
