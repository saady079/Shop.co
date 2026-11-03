"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  end: number;
  suffix?: string;
  duration?: number; // ms
  className?: string;
};

export default function CountUp({
  end,
  suffix = "+",
  duration = 1500,
  className = "",
}: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const [value, setValue] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Accessibility: skip animation for users who prefer reduced motion
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setValue(end);
      return;
    }

    let raf = 0;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect(); // run only once

        const start = performance.now();
        const tick = (now: number) => {
          const p = Math.min((now - start) / duration, 1);
          setValue(Math.round(end * (1 - (1 - p) ** 3))); // ease-out
          if (p < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.5 },
    );

    observer.observe(el);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [end, duration]);

  return (
    <span ref={ref} className={`tabular-nums ${className}`}>
      <span className="sr-only">
        {end.toLocaleString("en-US")}
        {suffix}
      </span>
      <span aria-hidden="true">
        {value.toLocaleString("en-US")}
        {suffix}
      </span>
    </span>
  );
}
