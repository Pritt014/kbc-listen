import { Link } from "react-router-dom";
import { useRef } from "react";

export default function PodcastGrid({ items = [] }) {
  const scrollRef = useRef(null);

  const scrollByAmount = (amount) => {
    scrollRef.current?.scrollBy({
      left: amount,
      behavior: "smooth",
    });
  };

  return (
    <div className="relative mt-4">

      {/* --- LEFT ARROW --- */}
      <button
        aria-label="Scroll left"
        onClick={() => scrollByAmount(-300)}
        className="absolute left-0 top-1/2 -translate-y-1/2 bg-white/80 
                   text-gray-700 hover:bg-white shadow-md rounded-full p-3 z-20"
      >
        ‹
      </button>

      {/* --- RIGHT ARROW --- */}
      <button
        aria-label="Scroll right"
        onClick={() => scrollByAmount(300)}
        className="absolute right-0 top-1/2 -translate-y-1/2 bg-white/80 
                   text-gray-700 hover:bg-white shadow-md rounded-full p-3 z-20"
      >
        ›
      </button>

      {/* --- SCROLLER ROW --- */}
      <div
        ref={scrollRef}
        className="flex gap-6 overflow-x-auto scrollbar-hide py-2 px-10 scroll-smooth"
      >
        {items.map((s) => (
          <Link
            key={s.id}
            to={s.path || "/podcasts"}
            className="flex-none w-48 bg-white rounded-lg overflow-hidden shadow hover:shadow-lg transition"
          >
            <img
              src={s.img}
              alt={s.title}
              className="w-full aspect-square bg-gray-200 object-cover"
            />

            <div className="p-4">
              <h4 className="font-semibold text-kbcBlue text-sm">
                {s.title}
              </h4>
              <p className="text-xs text-gray-600 mb-3">{s.host}</p>
              {s.dateLabel ? (
                <p className="text-xs text-gray-500 mb-3">{s.dateLabel}</p>
              ) : null}

              <div className="flex justify-between items-center">
                <span className="bg-kbcGold text-black px-3 py-1 rounded text-xs">
                  Play
                </span>
                <span className="text-xs text-gray-500">Details</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
