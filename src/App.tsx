import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Trusted from './components/Trusted'
import Offer from './components/Offer'
import Team1 from './components/Team1'
import About from './components/About'
import Faq from './components/Faq'
import CTAAndFooter from './components/CTAAndFooter'

import Layout from './components/Layout'
import Subpages from './components/Subpages'
import ScrollLoader from './components/ScrollLoader';

function App() {
  return (
    <Router>
      <ScrollLoader />
      <Layout>
        <Routes>
          
          <Route path="/" element={
            <>
              <Navbar />
              <Hero />
              <Trusted />
              <Offer />
              <Team1 />
              <About />
              <Faq />
              <CTAAndFooter />
            </>
          } /> 

          {/* 🔹 Podstrony dynamiczne */}
          <Route path="/page/:id" element={<Subpages />} />
        </Routes>
      </Layout>
    </Router>
  )
}

export default App;
