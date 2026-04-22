import { useState, useEffect, useRef } from "react";

const slides = [
  { id: 1, title: "Good Morning Kenya", desc: "Early Morning Conversations", vid: "/videos/gmk.mp4" },
  { id: 2, title: "Listen Now!", desc: "Tune into our live channels...", vid: "/videos/listen.mp4" },
  { id: 3, title: "Trending", desc: "Today's Highlights", vid: "/videos/trending.mp4" },
];

export default function HeroCarousel() {
  const [idx, setIdx] = useState(0);

  // Function to move to the next slide, automatically handled by the interval
  const nextSlide = () => {
    setIdx((currentIdx) => (currentIdx + 1) % slides.length);
  };

  const prevSlide = () => {
    setIdx((currentIdx) => (currentIdx - 1 + slides.length) % slides.length);
  };

  useEffect(() => {
    // We update the index directly, the CSS handles the transition when the index changes
    const t = setInterval(nextSlide, 7000);
    return () => clearInterval(t);
  }, []); // Empty dependency array means this only runs once on mount

  return (
    <div className="relative mt-6">

      {/* --- Slide Container --- */}
      {/* Set a fixed height on the parent container so absolutely positioned children don't collapse it */}
      <div className="relative w-full h-[420px] rounded-lg overflow-hidden">
        
        {/* Iterate over ALL slides and position them absolutely */}
        {slides.map((slide, index) => {
          // Determine if this slide is the currently active one
          const isActive = index === idx;
          
          return (
            // The container for each slide is absolutely positioned, fills the parent, 
            // and uses Tailwind for the opacity transition.
            <div
              key={slide.id}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                isActive ? "opacity-100 z-10" : "opacity-0 z-0"
              }`}
            >
              
              {/* --- Media Element (Video/Image) --- */}
              {slide.vid ? (
                // Only autoplay the active video. Muted is required for autoplay.
                <video
                  src={slide.vid}
                  className="w-full h-full object-cover filter brightness-75"
                  autoPlay={isActive} 
                  loop
                  muted
                  playsInline
                  poster={slide.poster}
                  preload="auto" 
                />
              ) : (
                <img
                  src={slide.img}
                  alt={slide.title}
                  className="w-full h-full object-cover filter brightness-75"
                />
              )}

              {/* --- Overlay Text --- */}
              <div className="absolute inset-0 flex items-center pl-8 z-20">
                <div className="max-w-2xl text-white">
                  <h2 className="text-3xl sm:text-4xl font-extrabold mb-3">
                    {slide.title}
                  </h2>
                  <p className="mb-6">{slide.desc}</p>
                  <div className="flex gap-3">
                    <button className="bg-kbcGold text-black px-4 py-2 rounded-lg font-semibold">
                      Listen
                    </button>
                    <button className="bg-white/20 text-white px-4 py-2 rounded-lg">
                      More info
                    </button>
                  </div>
                </div>
              </div>

            </div>
          );
        })}
      </div>

      {/* --- Left Arrow (Kept outside the absolute container) --- */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/4 -translate-y-1/2 bg-white/80 text-gray-700 hover:bg-white shadow-md rounded-full p-3 z-30"
      >
        ‹
      </button>

      {/* --- Right Arrow (Kept outside the absolute container) --- */}
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/4 -translate-y-1/2 bg-white/80 text-gray-700 hover:bg-white shadow-md rounded-full p-3 z-30"
      >
        ›
      </button>
    </div>
  );
}
