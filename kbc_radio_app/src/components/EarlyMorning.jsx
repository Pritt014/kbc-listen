import { useRef } from "react";

const sample = [
  { id:1, title:"The Big Conversation", host:"KBC English Service", img:"/assets/breakfast.png" },
  { id:2, title:"Zinga", host:"Radio Taifa", img:"/assets/zinga.png" },
  { id:3, title:"Twitwe Ita", host:"Mwatu FM", img:"/assets/twitwe.png" },
  { id:4, title:"Ngagurio", host:"Ngemi FM", img:"/assets/ngagurio.png" },
  { id:5, title:"Newsline", host:"KBC English Service", img:"/assets/newsline.png" },
  { id:6, title:"The Big Conversation", host:"KBC English Service", img:"/assets/breakfast.png" },
  { id:7, title:"Zinga", host:"Radio Taifa", img:"/assets/zinga.png" },
  { id:8, title:"Twitwe Ita", host:"Mwatu FM", img:"/assets/twitwe.png" },
  { id:9, title:"Ngagurio", host:"Ngemi FM", img:"/assets/ngagurio.png" },
  { id:10, title:"Newsline", host:"KBC English Service", img:"/assets/newsline.png" },
];

export default function EarlyMorning() {
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
        {sample.map((s) => (
          <article
            key={s.id}
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

              <div className="flex justify-between items-center">
                <button className="bg-kbcGold text-black px-3 py-1 rounded text-xs">
                  Play
                </button>
                <button className="text-xs text-gray-500">Details</button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
