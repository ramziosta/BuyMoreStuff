import type {Metadata} from 'next'
import {Inter} from 'next/font/google'
import './globals.css'
import React from 'react'
import Navbar from '../app/Navbar/Navbar'
import Footer from '../app/Footer'

const inter = Inter({subsets: ['latin']})

export const metadata: Metadata = {
    title: 'Buy More Stuff',
    description: 'E-commerce app',
}

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
        <body className={inter.className}>
        <Navbar />
        <main className="p-4 max-w-7xl mx-auto min-w-[300px]">
            {children}
        </main>
        <Footer />
        </body>
        </html>
    )
}
