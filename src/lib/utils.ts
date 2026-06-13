import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function mobileCarouselTrackClass(
  desktopBreakpoint: "sm" | "md" | "lg" = "md"
) {
  const resetClasses = {
    sm: "sm:w-full sm:ml-0 sm:max-w-full",
    md: "md:w-full md:ml-0 md:max-w-full",
    lg: "lg:w-full lg:ml-0 lg:max-w-full",
  }[desktopBreakpoint]

  return cn("w-screen ml-[calc(50%-50vw)] max-w-none", resetClasses)
}
