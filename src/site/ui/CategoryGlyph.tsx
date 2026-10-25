import type { ReactNode } from "react";
import type { CategoryIcon } from "../data/categories";

const CATEGORY_PATHS: Record<CategoryIcon, ReactNode> = {
  aparatura: (
    <>
      <path d="M2 12H22" />
      <path d="M17 3H7V21H17V3Z" />
      <path d="M14 7H10V12H14V7Z" />
      <path d="M10 16H14" />
    </>
  ),
  kable: (
    <>
      <circle cx="11" cy="11" r="8" />
      <circle cx="11" cy="11" r="2.5" />
      <path d="M11 19H21V21" />
    </>
  ),
  rozdzielnice: (
    <>
      <path d="M20 3H4V21H20V3Z" />
      <path d="M4 8H20" />
      <path d="M7.5 12V17M10.5 12V17M13.5 12V17M16.5 12V17" />
    </>
  ),
  osprzet: (
    <>
      <path d="M21 3H3V21H21V3Z" />
      <circle cx="12" cy="12" r="5" />
      <path d="M10 12H10.01M14 12H14.01" strokeWidth={2.25} />
    </>
  ),
  swiatlo: (
    <>
      <path d="M12 2V6" />
      <path d="M5 13a7 7 0 0 1 14 0H5Z" />
      <path d="M10 17a2 2 0 0 0 4 0" />
      <path d="M4 20L5.5 18.5M20 20L18.5 18.5" />
    </>
  ),
  trasy: (
    <>
      <path d="M3 7V17H21V7" />
      <path d="M7 12H8M11.5 12H12.5M16 12H17" strokeWidth={2} />
    </>
  ),
  sieci: (
    <>
      <path d="M4 4H20V16H16V20H8V16H4V4Z" />
      <path d="M8.25 8V12M10.75 8V12M13.25 8V12M15.75 8V12" />
    </>
  ),
  mierniki: (
    <>
      <path d="M18 2H6V22H18V2Z" />
      <path d="M15.5 4.5H8.5V9.5H15.5V4.5Z" />
      <circle cx="12" cy="15.5" r="3" />
      <path d="M12 15.5L13.5 14" />
    </>
  ),
  odgromowa: (
    <>
      <path d="M13 2L7 11H12L10 18L17 8H12L13 2Z" />
      <path d="M5 21H19" />
      <path d="M8 23H16" />
    </>
  ),
};

export function CategoryGlyph({ name, className = "size-6" }: { name: CategoryIcon; className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="square"
      aria-hidden="true"
    >
      {CATEGORY_PATHS[name]}
    </svg>
  );
}
