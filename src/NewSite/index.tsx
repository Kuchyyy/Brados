import { Layout } from "./Layout";
import { Cta } from "./sections/cta/Cta";
import { Gallery } from "./sections/gallery/Gallery";
import { Hero } from "./sections/hero/Hero";
import { HowItWorks } from "./sections/how-it-works/HowItWorks";
import { WhyScroll } from "./sections/why/WhyScroll";

export default function NewSite() {
  return (
    <Layout title="Brados – hurtownia materiałów elektrycznych we Wrocławiu">
      <Hero />
      <HowItWorks />
      <WhyScroll />
      <Gallery />
      <Cta />
    </Layout>
  );
}
