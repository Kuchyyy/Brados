import { useLayoutEffect, useRef, useState, type ImgHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export function Img({
  className,
  skeletonClassName,
  tone = "light",
  onLoad,
  ...props
}: ImgHTMLAttributes<HTMLImageElement> & {
  skeletonClassName?: string;
  tone?: "light" | "dark";
}) {
  const ref = useRef<HTMLImageElement>(null);
  const [loaded, setLoaded] = useState(false);

  useLayoutEffect(() => {
    const el = ref.current;
    setLoaded(!!el && el.complete && el.naturalWidth > 0);
  }, [props.src]);

  return (
    <img
      ref={ref}
      {...props}
      onLoad={(e) => {
        setLoaded(true);
        onLoad?.(e);
      }}
      className={cn(
        className,
        loaded ? "ns-img-in" : [tone === "dark" ? "ns-skel-dark" : "ns-skel", skeletonClassName],
      )}
    />
  );
}
