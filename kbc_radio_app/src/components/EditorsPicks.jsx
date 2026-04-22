import { Link } from "react-router-dom";
import { useRef } from "react";

export default function EditorsPicks({ items = [] }) {
  const scrollRef = useRef(null);

  const scrollByAmount = (amount) => {
    scrollRef.current?.scrollBy({
      left: amount,
      behavior: "smooth",
    });
  };

  return (
    <div className="relative mt-4">

      {/* LEFT ARROW */}
      <button
        onClick={() => scrollByAmount(-300)}
        aria-label="Scroll left"
        className="absolute left-0 top-1/2 -translate-y-1/2 bg-white/80 
                   text-gray-700 hover:bg-white shadow rounded-full p-3 z-20"
      >
        ‹
      </button>

      {/* RIGHT ARROW */}
      <button
        onClick={() => scrollByAmount(300)}
        aria-label="Scroll right"
        className="absolute right-0 top-1/2 -translate-y-1/2 bg-white/80 
                   text-gray-700 hover:bg-white shadow rounded-full p-3 z-20"
      >
        ›
      </button>

      {/* SCROLLER */}
      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto py-3 px-10 snap-x snap-mandatory scroll-smooth scrollbar-hide"
      >
        {items.map((i) => (
          <Link
            key={i.id}
            to={i.path || "/podcasts"}
            className="snap-start flex-none w-56 rounded-lg overflow-hidden shadow hover:shadow-lg transition"
          >
            {/* IMAGE */}
            <div className="relative">
              <img
                src={i.img}
                alt={i.title}
                className="w-full aspect-square object-cover bg-gray-200"
              />
              <div className="absolute left-2 bottom-2 bg-black/70 text-white px-2 py-1 rounded text-xs">
                {i.dur}
              </div>
            </div>

            {/* TEXT */}
            <div className="p-3">
              <div className="font-semibold text-kbcBlue text-sm">
                {i.title}
              </div>
              {i.dateLabel ? (
                <div className="mt-1 text-xs text-gray-500">{i.dateLabel}</div>
              ) : null}
            </div>
          </Link>
        ))}
      </div>

    </div>
  );
}
