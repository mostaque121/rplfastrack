"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export function NavigationProgressBar() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  // A ref to track the true navigation state, immune to stale closures.
  const navigationStateRef = useRef({
    isNavigating: false,
    delayTimeout: null as NodeJS.Timeout | null,
    animationIntervals: [] as NodeJS.Timeout[],
  });

  // --- Effect 1: Handle starting navigation on link clicks ---
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const link = target.closest("a");

      if (link && link.href) {
        try {
          const url = new URL(link.href);
          const currentUrl = new URL(window.location.href);

          if (
            url.origin === currentUrl.origin &&
            (url.pathname !== currentUrl.pathname ||
              url.search !== currentUrl.search) &&
            !url.hash
          ) {
            // A new navigation is starting.
            navigationStateRef.current.isNavigating = true;

            // Start a timer to only show the bar for slow navigations.
            navigationStateRef.current.delayTimeout = setTimeout(() => {
              setIsVisible(true);
              setProgress(10); // Initial progress

              // Animate to 90% and hold
              const intervals: NodeJS.Timeout[] = [];
              intervals.push(setTimeout(() => setProgress(50), 100));
              intervals.push(setTimeout(() => setProgress(80), 300));
              intervals.push(setTimeout(() => setProgress(90), 600));
              navigationStateRef.current.animationIntervals = intervals;
            }, 200);
          }
        } catch {} // Ignore invalid URLs
      }
    };

    document.addEventListener("click", handleClick, true);
    return () => document.removeEventListener("click", handleClick, true);
  }, []); // Runs only once to attach the event listener.

  // --- Effect 2: Handle completing navigation on URL change ---
  useEffect(() => {
    // A URL change has occurred, indicating navigation has finished.
    const state = navigationStateRef.current;

    // 1. Always clear any pending timers.
    if (state.delayTimeout) clearTimeout(state.delayTimeout);
    state.animationIntervals.forEach(clearTimeout);

    // 2. If we were navigating, complete the animation.
    if (state.isNavigating) {
      setProgress(100);
      setTimeout(() => {
        // Fade out and then reset.
        setIsVisible(false);
        setTimeout(() => setProgress(0), 300);
      }, 300);
    }

    // 3. IMPORTANT: Reset the navigation flag for the next click.
    state.isNavigating = false;
  }, [pathname, searchParams]); // Depends only on URL changes.

  return (
    <div
      className="fixed top-0 left-0 right-0 h-1 z-50 transition-all duration-300 ease-out"
      style={{
        width: `${progress}%`,
        opacity: isVisible ? 1 : 0, // Control visibility smoothly
        // 👇 EMERALD THEME APPLIED HERE 👇
        background: "linear-gradient(90deg, #059669, #10b981)",
        boxShadow: "0 0 10px rgba(16, 185, 129, 0.5)",
      }}
    >
      <div className="absolute right-0 top-0 h-full w-32 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse" />
    </div>
  );
}
