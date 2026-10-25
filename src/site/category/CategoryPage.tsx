import { Check } from "lucide-react";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { cn } from "@/lib/utils";
import { pages } from "../data/pages";
import { MENU_CATEGORIES } from "../data/categories";
import { Layout } from "../Layout";
import NotFound from "../NotFound";
import { Cta } from "../sections/cta/Cta";
import { CategoryGlyph } from "../ui/CategoryGlyph";
import { IconBox } from "../ui/IconBox";
import { Img } from "../ui/Img";

const LOGO_AREA = 1700;

function ProducerLogo({ src }: { src: string }) {
  const [ratio, setRatio] = useState<number | null>(null);
  const height = ratio ? Math.min(34, Math.max(14, Math.sqrt(LOGO_AREA / ratio))) : 20;
  return (
    <Img
      src={src}
      alt=""
      loading="lazy"
      skeletonClassName="w-20 rounded-xs"
      onLoad={(e) => setRatio(e.currentTarget.naturalWidth / e.currentTarget.naturalHeight)}
      style={{ height }}
      className={cn(
        "w-auto max-w-full object-contain grayscale",
        ratio && "opacity-60",
      )}
    />
  );
}

export default function CategoryPage() {
  const { slug } = useParams<{ slug: string }>();
  const page = pages.find((p) => p.slug === slug);
  if (!page) return <NotFound />;

  return (
    <Layout
      title={`${page.title} | Brados`}
      description={page.seo}
      path={`/${page.slug}`}
      solidNav
    >
      <div className="maxw grid gap-12 pt-24 md:pt-32 lg:grid-cols-[minmax(0,1fr)_260px] lg:gap-20">
        <article className="min-w-0">
          <p className="text-xs text-neutral-500">
            <Link to="/" className="transition-colors hover:text-[#0A0A0A]">
              Oferta
            </Link>
            <span className="px-1.5">/</span>
            {page.title}
          </p>
          <h1 className="mt-4 text-[6.4vw] leading-[1.1] tracking-[-0.025em] sm:text-[32px] sm:leading-[1.2]">
            {page.title}
          </h1>
          <p className="mt-5 max-w-[62ch] text-[15px] leading-[1.6] text-neutral-600">
            {page.description}
          </p>
          <ul className="mt-8 grid max-w-[640px] gap-x-8 gap-y-2.5 sm:grid-cols-2">
            {page.products.map((p) => (
              <li key={p} className="flex items-start gap-2.5 text-sm leading-[1.45]">
                <Check className="mt-0.5 size-4 shrink-0 text-neutral-400" strokeWidth={1.5} />
                <span className="first-letter:uppercase">{p}</span>
              </li>
            ))}
          </ul>
        </article>
        <aside className="hidden lg:block">
          <p className="text-xs text-neutral-500">Kategorie produktów</p>
          <ul className="mt-3 flex flex-col gap-0.5">
            {MENU_CATEGORIES.map((c) => {
              const active = c.slug === slug;
              return (
                <li key={c.slug}>
                  <Link
                    to={`/${c.slug}`}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "ns-hover flex h-10 items-center gap-3 rounded-xs px-1.5 text-sm transition-colors",
                      active ? "bg-neutral-100 text-[#0A0A0A]" : "text-neutral-500 hover:text-[#0A0A0A]",
                    )}
                  >
                    <IconBox className="size-7 border-transparent! [&_svg]:size-[15px]">
                      <CategoryGlyph name={c.icon} />
                    </IconBox>
                    <span className="truncate">{c.title}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </aside>
      </div>
      <div className="maxw mt-14 md:mt-20">
        <p className="text-xs text-neutral-500">Producenci</p>
        <ul className="mt-3 grid grid-cols-2 gap-1.5 sm:grid-cols-4 md:grid-cols-5">
          {page.producers.map((logo) => (
            <li key={logo} className="grid h-14 place-items-center rounded-xs bg-neutral-50 px-3">
              <ProducerLogo src={logo} />
            </li>
          ))}
        </ul>
      </div>
      <Cta />
    </Layout>
  );
}
