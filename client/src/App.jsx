import { Route, Routes } from 'react-router-dom'
import './App.css'
import HomeLayout from './pages/HomeLayout.jsx'
import Home from './components/Home.jsx'
import Pnk from './components/Pnk.jsx'


function App() {

  return (
    <div className=''>
      <Routes>
        <Route path='/' element={<h1 className="text-3xl font-bold underline">Home</h1>} />
        <Route path='home' element={<HomeLayout />} >
          <Route path='' element={<Home />} />
          <Route path='pnk' element={<Pnk />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App
