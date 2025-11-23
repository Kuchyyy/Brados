import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Trusted from "./components/Trusted";
import Offer from "./components/Offer";
import Team1 from "./components/Team1";
import About from "./components/About";
import Faq from "./components/Faq";
import CTAAndFooter from "./components/CTAAndFooter";

import Subpages from "./components/Subpages";
import ScrollLoader from "./components/ScrollLoader";

function App() {
  return (
    <div className="w-full flex justify-center items-center">
      <div className="max-w-[1440px] w-full">
        <Router>
          <ScrollLoader />
          <Routes>
            <Route
              path="/"
              element={
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
              }
            />

            <Route path="/:slug" element={<Subpages />} />
          </Routes>
        </Router>
      </div>
    </div>
  );
}

export default App;
