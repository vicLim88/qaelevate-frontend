import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'QA Elevate',
  description: 'Automated UI testing and BDD generation',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
