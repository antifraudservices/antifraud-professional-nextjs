import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import { Inter } from 'next/font/google'
import 'antifraud-portal-components-react/styles.css'
import 'uhc-portal-components-react/styles.css'
import './globals.css'

export const metadata: Metadata = {
  title: 'antifraud.online Professional',
  description: 'Sector-neutral professional management and Trust portal.',
}
const inter = Inter({subsets: ['latin'], display: 'swap', variable: '--font-inter'})

export default function RootLayout({children}: Readonly<{children: ReactNode}>) {
  return <html lang="en" suppressHydrationWarning className={inter.variable}><body>{children}</body></html>
}
