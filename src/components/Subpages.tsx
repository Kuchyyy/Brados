import { useParams } from "react-router-dom";
import { pages } from "../data/page";
import Navbar from "./Navbar";
import Hero from "../components/Hero";
import CTAAndFooter2 from "./CTAAndFooter2";
import Description from "./Description";

const Subpages = () => {
  const { slug } = useParams<{ slug: string }>();
  const page = pages.find((p) => p.slug === slug);

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
      <CTAAndFooter2 />
    </div>
  );
};

export default Subpages;
