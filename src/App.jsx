import { useState } from 'react'
import EmailSender from './component/EmailSender'
import { Toaster } from 'react-hot-toast'
import './App.css'

function App() {
  

  return (
    <>
    <EmailSender/>
    <Toaster/>
    </>
  )
}

export default App
