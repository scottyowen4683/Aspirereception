import React from 'react'
import Home from './pages/Home.jsx'
import { Toaster } from 'sonner'

export default function App() {
  return (
    <div className="App">
      <Home />
      <Toaster position="top-right" richColors />
    </div>
  )
}
