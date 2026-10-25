import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { MAPS_URL, ORANGE } from "../../constants";
import { FOOTER_OFFER } from "../../data/categories";

const footerLink = "transition-colors hover:text-[#0A0A0A]";

function FooterGroup({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div>
      <p className="text-xs text-[#0A0A0A]">{title}</p>
      <ul className="mt-3 flex flex-col gap-2 text-xs leading-[1.5] text-neutral-500 [&>li]:transition-opacity [&>li]:duration-200">{children}</ul>
    </div>
  );
}

export function Footer() {
  return (
    <footer>
      <div className="maxw pb-8 pt-14">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8 [@media(hover:hover)]:[&:has(a:hover)_li:not(:has(a:hover))]:opacity-35">
          <div>
            <p className="max-w-[280px] text-xs leading-[1.6] text-neutral-500">
              Kompleksowe zaopatrzenie w materiały elektryczne i telekomunikacyjne dla firm
              wykonawczych oraz klientów biznesowych
            </p>
          </div>
          <div className="hidden lg:block" aria-hidden="true" />
          <FooterGroup title="Oferta">
            {FOOTER_OFFER.map((o) => (
              <li key={o.slug}>
                <Link to={`/nowa/${o.slug}`} className={footerLink}>
                  {o.label}
                </Link>
              </li>
            ))}
          </FooterGroup>
          <div className="flex flex-col gap-8">
            <FooterGroup title="Siedziba">
              <li>
                <a href={MAPS_URL} target="_blank" rel="noreferrer" className={footerLink}>
                  ul. Eugeniusza Kwiatkowskiego 17
                  <br />
                  52-326 Wrocław
                </a>
              </li>
              <li>Poniedziałek – Piątek, 07:30–16:00</li>
            </FooterGroup>
            <FooterGroup title="Dane">
              <li>Brados sp. z o.o.</li>
              <li>NIP: 8992556301</li>
              <li>KRS: 0000295667</li>
            </FooterGroup>
          </div>
        </div>
        <div className="mt-20 flex flex-col gap-2 text-xs text-neutral-400 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 Brados sp. z o.o. Wszystkie prawa zastrzeżone</p>
          <p className="flex items-center gap-[5px]">
            Made with
            <svg viewBox="0 0 24 24" className="size-[11px]" aria-label="miłością">
              <path
                d="M12 21s-7.5-4.6-9.6-9.2C.9 8.5 2.9 4.5 6.6 4.5c2.1 0 3.6 1.1 5.4 3 1.8-1.9 3.3-3 5.4-3 3.7 0 5.7 4 4.2 7.3C19.5 16.4 12 21 12 21z"
                fill={ORANGE}
              />
            </svg>
            by Kuchy
          </p>
        </div>
      </div>
    </footer>
  );
}
