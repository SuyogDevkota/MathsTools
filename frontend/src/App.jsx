import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './Components/Navbar';
import About from './Pages/About';
import Home from './Pages/Home';
import Practice from "./Pages/Practice";
import Olympiad from "./Pages/Olympiad";
import Fun from "./Pages/Fun";
import SequenceAndSeries from './Pages/SequenceAndSeries';
import Books from './Pages/Books';
import TeachersGuide from './Pages/TeachersGuide';
import GeogebraTools from './Pages/Geogebra';
import Admin from './Pages/Admin';
import CalculatorPage from './Pages/Calculator';

function App() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <>
      {!isAdminRoute && <Navbar />}
      <div style={{ padding: '20px' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/practice" element={<Practice />} />
          <Route path="/olympiad" element={<Olympiad />} />
          <Route path="/fun" element={<Fun />} />
          <Route path="/topics/sequence-series" element={<SequenceAndSeries />} />
          <Route path='/books' element={<Books/>}></Route>
          <Route path='/teachersguide' element={<TeachersGuide/>}></Route>
          <Route path='/tools/geogebra' element={<GeogebraTools/>}></Route>
          <Route path='/calculator' element={<CalculatorPage/>}></Route>
          <Route path='/admin' element={<Admin/>}></Route>
          
        </Routes>
      </div>
    </>
  );
}

export default App;
