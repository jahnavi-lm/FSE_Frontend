import { useState } from 'react'
import './App.css'
import { Header } from './components/Header'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <h1 className="text-3xl font-bold underline text-sky-400">
      Welcome to FSE
    </h1>
    <Header />
    </>
  )
}

export default App
