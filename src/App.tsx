import { BrowserRouter, Navigate, Route, Routes, useParams } from "react-router-dom";
import ScrollToTop from "./site/ScrollToTop";
import Home from "./site/Home";
import CategoryPage from "./site/category/CategoryPage";

function LegacyCategory() {
  const { slug } = useParams<{ slug: string }>();
  return <Navigate to={`/${slug}`} replace />;
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/nowa" element={<Navigate to="/" replace />} />
        <Route path="/nowa/:slug" element={<LegacyCategory />} />
        <Route path="/:slug" element={<CategoryPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
