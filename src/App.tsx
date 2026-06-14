import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import { HeroIntro, HeroMedia } from "./components/Hero";
import Trusted from "./components/Trusted";
import Offer from "./components/Offer";
import Team1 from "./components/Team1";
import About from "./components/About";
import Photo from "./components/Photo";
import LocationMap from "./components/LocationMap";
import Faq from "./components/Faq";
import CTAAndFooter from "./components/CTAAndFooter";

import Subpages from "./components/Subpages";
import ScrollLoader from "./components/ScrollLoader";
import BottomScrollBlur from "./components/BottomScrollBlur";


function App() {
  window.scrollTo({ top: 0, behavior: "smooth" });
  return (
    <div className="w-full flex justify-center items-center" >

      <div className=" w-full">
        <Router>
          <ScrollLoader />
          <BottomScrollBlur />
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <Navbar />
                  <HeroIntro />
                  <HeroMedia />
                  <Trusted />
                  <Team1 />
                  <Offer />
                  <Photo />
                  <About />
                  <LocationMap />
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
