import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from './Routes/Home';
import Tv from './Routes/Tv';
import Search from './Routes/Search';
import Header from './Components/Header';
function App(){
  return (
    <BrowserRouter>
      <Header/>
      <Routes>
        <Route path="/tv" element={<Tv/>}/>
        <Route path="/tv/:tvId" element={<Tv/>}/>
        <Route path="/search" element={<Search/>}/>
        <Route path="/search/:Id" element={<Search/>}/>
        <Route path={`${process.env.PUBLIC_URL}/`} element={<Home/>}/>
        <Route path="movies/:movieId" element={<Home/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App;