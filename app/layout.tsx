"use client"

import "./globals.css"

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>
        <div className="min-h-screen bg-background text-foreground relative overflow-hidden">
          <div className="absolute inset-0 bg-grid z-0"></div>
          <div className="relative z-10">{children}</div>
        </div>
      </body>
    </html>
  )
}

