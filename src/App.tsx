import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Przebudowa from "./components/Przebudowa";
import ScrollToTop from "./components/ScrollToTop";

function App() {
  return (
    <div className="w-full flex justify-center items-center" >

      <div className=" w-full">
        <Router>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Przebudowa />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Router>
      </div>
    </div>
  );
}

export default App;
