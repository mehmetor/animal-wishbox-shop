import React from "react"

import Footer from "@modules/layout/templates/footer"
import Nav from "@modules/layout/templates/nav"

import { SpeedInsights } from "@vercel/speed-insights/next"

const Layout: React.FC<{
  children: React.ReactNode
}> = ({ children }) => {
  return (
    <div>
      <Nav />
      <main className="relative">{children}</main>
      <Footer />
      <SpeedInsights />
    </div>
  )
}

export default Layout
