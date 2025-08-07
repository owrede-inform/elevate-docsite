import type { Metadata } from 'next'
import '../styles/globals.css'

export const metadata: Metadata = {
  title: 'ELEVATE Design System',
  description: 'Comprehensive documentation for the ELEVATE Design System by INFORM',
  keywords: ['design system', 'ELEVATE', 'INFORM', 'components', 'patterns'],
  authors: [{ name: 'INFORM Design Team' }],
  viewport: 'width=device-width, initial-scale=1',
  themeColor: '#0066cc',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="theme-color" content="#0066cc" />
      </head>
      <body>
        <div id="root">
          {children}
        </div>
      </body>
    </html>
  )
}