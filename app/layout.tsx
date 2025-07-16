import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ClerkProvider } from '@clerk/nextjs'
import { ThemeProvider } from '@/components/theme-provider'
import { Toaster } from '@/components/ui/toaster'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'PngFy Pro - AI Background Removal SaaS',
  description: 'Professional AI-powered background removal tool. Remove image backgrounds instantly with our premium SaaS platform.',
  keywords: ['background removal', 'AI', 'image processing', 'SaaS', 'PNG', 'photo editor'],
  authors: [{ name: 'PngFy Pro Team' }],
  openGraph: {
    title: 'PngFy Pro - AI Background Removal SaaS',
    description: 'Professional AI-powered background removal tool. Remove image backgrounds instantly.',
    type: 'website',
    url: 'https://pngfy-pro.com',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PngFy Pro - AI Background Removal SaaS',
    description: 'Professional AI-powered background removal tool.',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body className={inter.className}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
            <Toaster />
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  )
}