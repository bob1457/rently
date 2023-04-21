import { Nunito } from 'next/font/google'
import {ClientOnly} from './components/ClientOnly'
import './globals.css'
import NavBar from './components/navbar/NavBar';
import Modal from './components/modals/Modal';
import RegisterModal from './components/modals/RegisterModal';
import ToasterProvider from './providers/ToasterProvider';
import LoginModal from './components/modals/LoginModal';
import getCurrentUser from './actions/getCurrentUser';

{/* <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png"></link> */}

export const metadata = {
  title: 'RENTLY',
  description: 'Rental app for everyone',
  icons: {
    icon: '/icon.png',
    // icon: '/favicon.ico',
  },
}

const font = Nunito({
  subsets: ['latin'],
});

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const currentUser = await getCurrentUser();
  return (
    <html lang="en">      
      <body className={font.className}>
        {/* possible hydration error fix */}
        {/* <ClientOnly>
          <RegisterModal />
          <NavBar />
        </ClientOnly> */}
        {/* <Modal isOpen title="hello"  /> */}
        <ToasterProvider />
        <RegisterModal />
        <LoginModal />
        <NavBar currentUser={currentUser} /> 
        {children}
      </body>
    </html>
  )
}
