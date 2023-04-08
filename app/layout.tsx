import { Nunito } from 'next/font/google'

import './globals.css'
import NavBar from './components/navbar/NavBar';

{/* <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png"></link> */}

export const metadata = {
  title: 'RENTLY',
  description: 'Rental app for everyone',
  icons: {
    icon: '/icon.png',
  },
}

const font = Nunito({
  subsets: ['latin'],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">      
      <body className={font.className}>
        <NavBar />
        {children}
      </body>
    </html>
  )
}
