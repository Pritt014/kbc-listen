import { Link } from "react-router-dom";
import { useRef, useEffect, useState } from "react";

export default function HorizontalScroller({ items = [] }) {
  const containerRef = useRef(null);
  const [autoDir, setAutoDir] = useState(1); // 1 = left → right, -1 = right → left

  // auto-scroll logic: scroll by 1px repeatedly, and reverse when reaching ends
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    let rafId = null;

    const step = () => {
      // slow scroll
      el.scrollLeft += autoDir * 0.6;
      // reverse if near ends
      const nearStart = el.scrollLeft < 2;
      const nearEnd = el.scrollWidth - el.clientWidth - el.scrollLeft < 2;
      if(nearEnd) setAutoDir(-1);
      if(nearStart) setAutoDir(1);
      rafId = requestAnimationFrame(step);
    };

    rafId = requestAnimationFrame(step);
    // pause on hover
    const onEnter = () => cancelAnimationFrame(rafId);
    const onLeave = () => (rafId = requestAnimationFrame(step));
    el.addEventListener("mouseenter", onEnter);
    el.addEventListener("mouseleave", onLeave);

    return () => {
      cancelAnimationFrame(rafId);
      el.removeEventListener("mouseenter", onEnter);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, [autoDir]);

  const scrollByAmount = (amount) => {
    containerRef.current?.scrollBy({ left: amount, behavior: "smooth" });
  };

  return (
    <div className="relative">
      <button aria-label="Scroll left" onClick={() => scrollByAmount(-400)} className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 p-2 rounded-full shadow-sm hover:bg-white">‹</button>
      <div ref={containerRef} className="overflow-x-auto scrollbar-hide space-x-4 flex items-stretch py-4 px-10 scroll-smooth">
        {items.map((it) => {
          const content = (
            <div className="bg-white/90 rounded-lg shadow p-5 flex h-full flex-col items-center gap-3 transition hover:-translate-y-0.5 hover:shadow-md">
              <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center overflow-hidden border">
                <img src={it.img} alt={it.title} className="w-full h-full object-cover" />
              </div>
              <div className="text-center">
                <div className="text-sm font-semibold text-kbcBlue">{it.title}</div>
                <div className="text-xs text-gray-500">{it.subtitle}</div>
              </div>
            </div>
          );

          return (
            <div key={it.id} className="flex-none w-44">
              {it.path ? (
                <Link to={it.path} aria-label={`Open ${it.title}`}>
                  {content}
                </Link>
              ) : (
                content
              )}
            </div>
          );
        })}
      </div>
      <button aria-label="Scroll right" onClick={() => scrollByAmount(400)} className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 p-2 rounded-full shadow-sm hover:bg-white">›</button>
    </div>
  );
}
