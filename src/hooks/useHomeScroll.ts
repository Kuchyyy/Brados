import { useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export function useHomeScroll(onComplete?: () => void) {
  const navigate = useNavigate();
  const location = useLocation();

  const goHomeAndScroll = useCallback(
    (hash?: string) => {
      const scrollToHash = (attempt = 0) => {
        if (!hash) {
          window.scrollTo({ top: 0, behavior: "smooth" });
          return;
        }

        const element = document.querySelector(hash);
        if (!element) {
          if (attempt < 30) {
            setTimeout(() => scrollToHash(attempt + 1), 50);
          }
          return;
        }

        const top = element.getBoundingClientRect().top + window.scrollY;
        window.scrollTo({ top, behavior: "smooth" });
      };

      if (location.pathname !== "/") {
        navigate("/");
        setTimeout(() => scrollToHash(0), 200);
      } else {
        scrollToHash(0);
      }

      onComplete?.();
    },
    [location.pathname, navigate, onComplete]
  );

  return { goHomeAndScroll };
}
