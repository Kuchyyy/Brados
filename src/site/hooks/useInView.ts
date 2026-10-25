import { useEffect, useRef, useState, type RefObject } from "react";

export function useInView<T extends Element>(
  margin = "0px",
  threshold = 0.25,
  once = false,
): [RefObject<T | null>, boolean] {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (!once) return setInView(e.isIntersecting);
        if (!e.isIntersecting) return;
        setInView(true);
        io.disconnect();
      },
      { rootMargin: margin, threshold },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [margin, threshold, once]);
  return [ref, inView];
}
