import { useEffect, useState } from "react";

const measure = () =>
  Math.round(document.documentElement.clientHeight || window.innerHeight);

export function useStableViewportHeight() {
  const [height, setHeight] = useState(measure);

  useEffect(() => {
    const touch = window.matchMedia("(pointer: coarse)").matches;
    let width = window.innerWidth;
    const onResize = () => {
      const w = window.innerWidth;
      if (touch && Math.abs(w - width) < 2) return;
      width = w;
      setHeight(measure());
    };
    window.addEventListener("resize", onResize);
    window.addEventListener("orientationchange", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
      window.removeEventListener("orientationchange", onResize);
    };
  }, []);

  return height;
}
