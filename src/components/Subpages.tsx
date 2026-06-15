import { useParams } from "react-router-dom";
import { pages } from "../data/page";
import Navbar from "./Navbar";
import CTAAndFooter from "./CTAAndFooter";
import Description from "./Description";

const Subpages = () => {
  const { slug } = useParams<{ slug: string }>();
  const page = pages.find((p) => p.slug === slug);

  if (!page) return <p>Strona nie znaleziona</p>;

  return (
    <div>
      <Navbar />
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
