import { useParams } from "react-router-dom";
import { pages } from "../data/page";
import Navbar from "./Navbar";
import Hero from "../components/Hero";
import CTAAndFooter from "./CTAAndFooter";
import Description from "./Description";

const Subpages = () => {
  const { id } = useParams<{ id: string }>();
  const page = pages.find((p) => p.id === id);

  if (!page) return <p>Strona nie znaleziona</p>;

  return (
    <div>
      <Navbar />
      <Hero />
      <Description
        title={page.title}
        description={page.description}
        products={page.products}
        producers={page.producers}
      />
      <CTAAndFooter />
    </div>
  );
};

export default Subpages;
