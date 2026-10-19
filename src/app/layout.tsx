import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import 'antifraud-portal-components-react/styles.css'
import './globals.css'

export const metadata: Metadata = {
  title: 'Antifraud Professional',
  description: 'Education evidence and issuer review portal.',
}

export default function RootLayout({children}: Readonly<{children: ReactNode}>) {
  return <html lang="en"><body>{children}</body></html>
}
