import { GeistSans } from 'geist/font/sans'
import './globals.css'
import { UserProvider } from '@auth0/nextjs-auth0/client'
import Navbar from '@/components/Navbar'
import Header from '@/components/Header'
import { Suspense } from 'react'

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : 'http://localhost:3000'

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: 'Poetry.com',
  description: 'Poetry at its finest, come read the best poems there ever were.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={GeistSans.className}>
      <body className="bg-background text-foreground">
        <main className="min-h-screen flex flex-col items-center">
          <UserProvider>
            <Navbar/>
            <Suspense fallback={<p>Loading....</p>}>
          {children}
            </Suspense>
          </UserProvider>
        </main>
      </body>
    </html>
  )
}
