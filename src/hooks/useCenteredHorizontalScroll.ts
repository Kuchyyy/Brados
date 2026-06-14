import { useEffect, type RefObject } from "react";

type Options = {
  enabled?: boolean;
  settleMs?: number;
  skipSyncRef?: RefObject<boolean>;
};

export function useCenteredHorizontalScroll<T>(
  containerRef: RefObject<HTMLElement | null>,
  itemSelector: string,
  onActiveChange: (value: T) => void,
  parseValue: (element: HTMLElement) => T,
  { enabled = true, settleMs = 150, skipSyncRef }: Options = {}
) {
  useEffect(() => {
    if (!enabled) return;

    const container = containerRef.current;
    if (!container) return;

    let settleTimeoutId: number;
    let fallbackScrollTimeoutId: number;
    let isPointerActive = false;
    const supportsScrollEnd = "onscrollend" in window;

    const updateClosest = () => {
      if (skipSyncRef?.current || isPointerActive) return;

      const items = container.querySelectorAll<HTMLElement>(itemSelector);
      if (!items.length) return;

      const center = container.scrollLeft + container.clientWidth / 2;
      let closest: HTMLElement | null = null;
      let minDistance = Number.POSITIVE_INFINITY;

      items.forEach((item) => {
        const itemCenter = item.offsetLeft + item.offsetWidth / 2;
        const distance = Math.abs(center - itemCenter);
        if (distance < minDistance) {
          minDistance = distance;
          closest = item;
        }
      });

      if (closest) {
        onActiveChange(parseValue(closest));
      }
    };

    const scheduleSettledUpdate = () => {
      window.clearTimeout(settleTimeoutId);
      settleTimeoutId = window.setTimeout(updateClosest, settleMs);
    };

    const onPointerDown = () => {
      isPointerActive = true;
      window.clearTimeout(settleTimeoutId);
      window.clearTimeout(fallbackScrollTimeoutId);
    };

    const onPointerUp = () => {
      isPointerActive = false;
      if (supportsScrollEnd) {
        scheduleSettledUpdate();
      }
    };

    const onScrollEnd = () => {
      isPointerActive = false;
      scheduleSettledUpdate();
    };

    const onScrollFallback = () => {
      if (isPointerActive || supportsScrollEnd) return;

      window.clearTimeout(fallbackScrollTimeoutId);
      fallbackScrollTimeoutId = window.setTimeout(
        updateClosest,
        settleMs + 80
      );
    };

    updateClosest();

    container.addEventListener("pointerdown", onPointerDown);
    container.addEventListener("pointerup", onPointerUp);
    container.addEventListener("touchstart", onPointerDown, { passive: true });
    container.addEventListener("touchend", onPointerUp, { passive: true });
    container.addEventListener("scrollend", onScrollEnd);

    if (!supportsScrollEnd) {
      container.addEventListener("scroll", onScrollFallback, { passive: true });
    }

    return () => {
      container.removeEventListener("pointerdown", onPointerDown);
      container.removeEventListener("pointerup", onPointerUp);
      container.removeEventListener("touchstart", onPointerDown);
      container.removeEventListener("touchend", onPointerUp);
      container.removeEventListener("scrollend", onScrollEnd);

      if (!supportsScrollEnd) {
        container.removeEventListener("scroll", onScrollFallback);
      }

      window.clearTimeout(settleTimeoutId);
      window.clearTimeout(fallbackScrollTimeoutId);
    };
  }, [
    containerRef,
    itemSelector,
    onActiveChange,
    parseValue,
    enabled,
    settleMs,
    skipSyncRef,
  ]);
}
