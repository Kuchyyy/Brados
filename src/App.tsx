import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Trusted from "./components/Trusted";

import Team1 from "./components/Team1";
import About from "./components/About";
import Photo from "./components/Photo";
import LocationMap from "./components/LocationMap";
import CTAAndFooter from "./components/CTAAndFooter";
import Faq from "./components/Faq";

import Subpages from "./components/Subpages";
import ScrollLoader from "./components/ScrollLoader";
import ScrollToTop from "./components/ScrollToTop";
import NewSite from "./NewSite/index";
import CategoryPage from "./NewSite/category/CategoryPage";


function App() {
  return (
    <div className="w-full flex justify-center items-center" >

      <div className=" w-full">
        <Router>
          <ScrollToTop />
          <ScrollLoader />
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <Navbar />
                  <Link
                    to="/nowa"
                    className="fixed bottom-5 right-5 z-[100] rounded-sm bg-[#EA6100] px-4 py-2.5 text-sm text-white shadow-lg"
                  >
                    Zobacz nową stronę →
                  </Link>
                  <Hero />
                  <Trusted />
                  <Team1 />
                  <Photo />
                  <About />
                  <LocationMap />

                  <CTAAndFooter />
                </>
              }
            />

            <Route
              path="/faq"
              element={
                <>
                  <Navbar />
                  <Faq />
                  <CTAAndFooter />
                </>
              }
            />

            <Route path="/nowa" element={<NewSite />} />
            <Route path="/nowa/:slug" element={<CategoryPage />} />

            <Route path="/:slug" element={<Subpages />} />
          </Routes>
        </Router>
      </div>
    </div>
  );
}

export default App;
