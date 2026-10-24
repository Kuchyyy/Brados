import { useEffect, useRef, useState, type RefObject } from "react";

export function useInView<T extends Element>(
  margin = "0px",
  threshold = 0.25,
): [RefObject<T | null>, boolean] {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), {
      rootMargin: margin,
      threshold,
    });
    io.observe(el);
    return () => io.disconnect();
  }, [margin, threshold]);
  return [ref, inView];
}
