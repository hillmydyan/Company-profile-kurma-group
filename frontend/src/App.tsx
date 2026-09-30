import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToHash from './components/ScrollToHash';
import Home from './pages/Home';

import Career from './pages/Career';
import JobDetail from './pages/JobDetail';
import About from './pages/About';

function App() {
  return (
    <BrowserRouter>
      <ScrollToHash />
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/tentang" element={<About />} />
            <Route path="/karier" element={<Career />} />
            <Route path="/karier/:id" element={<JobDetail />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
