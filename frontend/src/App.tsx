import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { All } from './components'
import './styles/index.css'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<All />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
