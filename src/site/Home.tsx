import { Layout } from "./Layout";
import { Cta } from "./sections/cta/Cta";
import { lazy, Suspense } from "react";
import { Hero } from "./sections/hero/Hero";
import { HowItWorks } from "./sections/how-it-works/HowItWorks";
import { WhyScroll } from "./sections/why/WhyScroll";

const Gallery = lazy(() => import("./sections/gallery/Gallery").then((m) => ({ default: m.Gallery })));

export default function Home() {
  return (
    <Layout
      title="Brados"
      description="Hurtownia materiałów elektrycznych i teletechnicznych we Wrocławiu. Kable, aparatura modułowa, rozdzielnice, osprzęt i oświetlenie dla instalatorów i firm."
      path="/"
    >
      <Hero />
      <HowItWorks />
      <WhyScroll />
      <Suspense fallback={<div className="h-[70vh]" />}>
        <Gallery />
      </Suspense>
      <Cta />
    </Layout>
  );
}
