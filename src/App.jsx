import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Signup from './pages/Signup';
import GalleryImage from './pages/GalleryImage';


function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/gallery-image' element={<GalleryImage />} />
      </Routes>
    </>
  )
}

export default App
