import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { fetchCategories, fetchLatestEpisodes } from "../../api/podcasts";
import { getBestImageUrl, unwrapEntity, unwrapRelation } from "../../api/strapi";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import ColorThief from "colorthief";

/* Skeleton shimmer effect */
const shimmer =
  "relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_1.5s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/40 before:to-transparent";

export default function Podcasts() {
  const [categories, setCategories] = useState([]);
  const [episodes, setEpisodes] = useState([]);
  const [loading, setLoading] = useState(true);

  const [heroColor, setHeroColor] = useState("rgb(30, 41, 59)");
  const rowRef = useRef(null);

  // ----------------------------------------------------
  // DATA LOADING (unchanged)
  // ----------------------------------------------------
  useEffect(() => {
    async function loadData() {
      try {
        const cats = await fetchCategories();
        const eps = await fetchLatestEpisodes();

        setCategories(Array.isArray(cats) ? cats : []);
        setEpisodes(Array.isArray(eps) ? eps : []);

        // Extract hero color from featured poster
        if (eps && eps.length > 0) {
          const featured = unwrapEntity(eps[0]);
          const poster = getBestImageUrl(featured?.poster);

          if (poster) {
            const img = new Image();
            img.crossOrigin = "Anonymous";
            img.src = poster;

            img.onload = () => {
              try {
                const thief = new ColorThief();
                const rgb = thief.getColor(img);
                setHeroColor(`rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`);
              } catch (e) {
                console.error("Color extraction failed:", e);
              }
            };
          }
        }
      } catch (err) {
        console.error("Failed to load podcasts data:", err);
        setCategories([]);
        setEpisodes([]);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  // ----------------------------------------------------
  // SKELETON LOADERS
  // ----------------------------------------------------
  if (loading) {
    return (
      <>
        <Header />

        <main className="max-w-7xl mx-auto px-4 pb-12 pt-6">

          {/* HERO SKELETON */}
          <section
            className="relative rounded-2xl overflow-hidden mb-10 shadow-xl"
            style={{
              background: `linear-gradient(135deg, ${heroColor}, rgba(0,0,0,0.5))`,
            }}
          >
            <div className="relative p-8 md:p-12 lg:p-16 flex flex-col md:flex-row items-start gap-10">

              {/* LEFT CARD */}
              <div className="md:w-1/2 relative z-10">
                <div className="backdrop-blur-2xl bg-white/10 border border-white/20 rounded-2xl p-6 md:p-8 shadow-2xl">

                  <div className={`h-10 w-52 mb-6 rounded-md bg-white/20 ${shimmer}`} />

                  <div className={`h-4 w-72 mb-3 rounded bg-white/20 ${shimmer}`} />
                  <div className={`h-4 w-64 mb-3 rounded bg-white/20 ${shimmer}`} />
                  <div className={`h-4 w-48 mb-6 rounded bg-white/20 ${shimmer}`} />

                  <div className={`h-6 w-40 mb-4 rounded bg-white/20 ${shimmer}`} />

                  <div className={`h-10 w-36 rounded-md bg-yellow-300/40 ${shimmer}`} />
                </div>
              </div>

              {/* POSTER SKELETON */}
              <div className="md:w-1/2 flex justify-center relative z-10">
                <div
                  className={`relative w-64 sm:w-72 md:w-80 aspect-square rounded-xl bg-black/20 border border-white/20 shadow-xl ${shimmer}`}
                ></div>
              </div>
            </div>
          </section>

          {/* PROMO SKELETON */}
          <section className="flex items-center justify-between gap-4 bg-kbcBlue text-white rounded-lg px-6 py-4 mb-10 shadow opacity-70">
            <div className="flex items-center gap-3">
              <div className={`h-6 w-32 rounded bg-white/20 ${shimmer}`} />
              <div className={`h-4 w-40 rounded bg-white/20 ${shimmer}`} />
            </div>
            <div className={`h-10 w-28 rounded bg-white/30 ${shimmer}`} />
          </section>

          {/* CATEGORY GRID SKELETON */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">Categories</h2>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5">
              {Array.from({ length: 8 }).map((_, i) => (
                <div
                  key={i}
                  className="rounded-xl bg-gray-900 overflow-hidden shadow"
                >
                  <div
                    className={`w-full aspect-square bg-gray-700 ${shimmer}`}
                  />

                  <div className="p-3 space-y-2">
                    <div className={`h-4 w-32 rounded bg-gray-700 ${shimmer}`} />
                    <div className={`h-3 w-20 rounded bg-gray-700 ${shimmer}`} />
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* LATEST EPISODES SKELETON */}
          <section className="mb-8">
            <h2 className="text-3xl font-semibold mb-4">Latest Episodes</h2>

            <div className="overflow-x-auto no-scrollbar -mx-4 px-4 py-2">
              <div className="flex gap-4">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="flex-shrink-0 w-60 sm:w-56 lg:w-64">
                    <div className="bg-white rounded-xl overflow-hidden shadow-md flex flex-col h-full">

                      <div className={`w-full aspect-square bg-gray-300 ${shimmer}`} />

                      <div className="p-3 space-y-2">
                        <div className={`h-4 w-40 rounded bg-gray-300 ${shimmer}`} />
                        <div className={`h-3 w-24 rounded bg-gray-300 ${shimmer}`} />
                      </div>

                      <div className="p-3 flex items-center justify-between">
                        <div className={`h-8 w-20 bg-yellow-300/40 rounded ${shimmer}`} />
                        <div className={`h-4 w-10 bg-pink-300/40 rounded ${shimmer}`} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </>
    );
  }

  // ----------------------------------------------------
  // REAL UI (unchanged from your refactor)
  // ----------------------------------------------------
  const featured = episodes[0];
  const featuredData = unwrapEntity(featured);
  const featuredPoster = getBestImageUrl(featuredData?.poster);

  function scrollLeft() {
    const el = rowRef.current;
    if (el) el.scrollBy({ left: -el.clientWidth * 0.8, behavior: "smooth" });
  }

  function scrollRight() {
    const el = rowRef.current;
    if (el) el.scrollBy({ left: el.clientWidth * 0.8, behavior: "smooth" });
  }

  return (
    <>
      <Header />

      <main className="max-w-7xl mx-auto px-4 pb-12 pt-6">

        {/* ----------------------------------------------------------
            HERO SECTION — Dynamic Color + Drop Shadows
        ---------------------------------------------------------- */}
        <section
          className="relative rounded-2xl overflow-hidden mb-10 shadow-xl transition-all duration-700"
          style={{
            background: `linear-gradient(
              135deg,
              ${heroColor} 0%,
              rgba(0,0,0,0.6) 60%,
              rgba(0,0,0,0.3) 100%
            )`,
          }}
        >
          {featured && (
            <div className="relative p-8 md:p-12 lg:p-16 flex flex-col md:flex-row items-start gap-10">

              {/* POSTER GLOW */}
              <div
                className="absolute inset-0 opacity-40 blur-3xl"
                style={{
                  background: `radial-gradient(circle at 70% 40%, ${heroColor}, transparent)`
                }}
              />

              {/* LEFT GLASS PANEL */}
              <div className="md:w-1/2 relative z-10">
                <div className="backdrop-blur-2xl bg-white/10 border border-white/20 rounded-2xl p-6 md:p-8 shadow-2xl">

                  <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4 drop-shadow-[0_4px_12px_rgba(0,0,0,0.6)]">
                    KBC Podcasts
                  </h1>

                  <p className="text-slate-200 mb-6 leading-relaxed">
                    In-depth conversations, insightful interviews, and powerful stories
                    from across Kenya — all in one place.
                  </p>

                  <p className="text-xs text-kbcGold tracking-wide uppercase mb-1">
                    Featured Episode
                  </p>

                  <h2 className="text-2xl font-bold text-white mb-1">
                    {featured.title}
                  </h2>

                  <p className="text-sm text-slate-300 mb-4">
                    {unwrapRelation(featuredData?.podcast_category)?.name || ""}
                  </p>

                  <Link
                    to={`/podcasts/${featured.slug}`}
                    className="inline-block px-5 py-2 bg-yellow-400 hover:bg-yellow-500 text-black font-semibold rounded-md shadow-md"
                  >
                    ▶ Play Episode
                  </Link>
                </div>
              </div>

              {/* RIGHT — POSTER */}
              <div className="md:w-1/2 flex justify-center relative z-10">
                <div className="relative w-64 sm:w-72 md:w-80 aspect-square rounded-xl overflow-hidden shadow-2xl border border-white/20 bg-black/20 backdrop-blur-xl">
                  {featuredPoster ? (
                    <img
                      src={featuredPoster}
                      alt={featured.title}
                      className="w-full h-full object-cover drop-shadow-[0_20px_35px_rgba(0,0,0,0.45)]"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-300">
                      No Image
                    </div>
                  )}
                </div>
              </div>

            </div>
          )}
        </section>

        {/* ----------------------------------------------------------
            PROMO BAR
        ---------------------------------------------------------- */}
        <section className="flex items-center justify-between gap-4 bg-kbcBlue text-white rounded-lg px-6 py-4 mb-10 shadow">
          <div className="flex items-center gap-3">
            <span className="font-semibold text-lg">KBC Listen</span>
            <span className="opacity-90">Download the app and take us with you.</span>
          </div>
          <button className="bg-white text-black px-4 py-2 rounded-md font-semibold">
            Get the App
          </button>
        </section>

        {/* ----------------------------------------------------------
            CATEGORIES
        ---------------------------------------------------------- */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">Categories</h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5">
            {categories.map((cat) => {
              const catData = unwrapEntity(cat);
              const thumb = getBestImageUrl(catData?.thumbnail);

              return (
                <Link
                  key={cat.id}
                  to={`/podcasts/category/${catData?.slug}`}
                  className="group rounded-xl bg-gray-900 overflow-hidden shadow hover:shadow-xl hover:-translate-y-1 transition-all duration-200"
                >
                  <div className="relative w-full aspect-square bg-gray-800 overflow-hidden">
                    {thumb ? (
                      <img
                        src={thumb}
                        alt={catData?.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-500 text-sm">
                        No Image
                      </div>
                    )}
                  </div>

                  <div className="p-3">
                    <h3 className="font-semibold text-base group-hover:text-white transition">
                      {catData?.name}
                    </h3>
                    <p className="text-xs text-gray-400 line-clamp-2">
                      {catData?.description}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        {/* ----------------------------------------------------------
            LATEST EPISODES
        ---------------------------------------------------------- */}
        <section className="mb-8">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-3xl font-semibold">Latest Episodes</h2>

            <div className="hidden sm:flex items-center gap-3">
              <button
                aria-label="Scroll left"
                onClick={scrollLeft}
                className="w-9 h-9 rounded-md bg-white/90 text-gray-700 shadow hover:bg-white"
              >
                ‹
              </button>

              <Link
                to="/podcasts"
                className="text-sm text-kbcBlue hover:underline"
              >
                See all →
              </Link>

              <button
                aria-label="Scroll right"
                onClick={scrollRight}
                className="w-9 h-9 rounded-md bg-white/90 text-gray-700 shadow hover:bg-white"
              >
                ›
              </button>
            </div>
          </div>

          <div className="relative">
            <div className="pointer-events-none absolute left-0 top-0 w-10 h-full bg-gradient-to-r from-white"></div>
            <div className="pointer-events-none absolute right-0 top-0 w-10 h-full bg-gradient-to-l from-white"></div>

            <div
              ref={rowRef}
              className="overflow-x-auto no-scrollbar -mx-4 px-4 py-2"
              style={{
                scrollSnapType: "x mandatory",
                WebkitOverflowScrolling: "touch",
              }}
            >
              <div className="flex gap-4">
                {episodes.map((ep) => {
                  const epData = unwrapEntity(ep);
                  const poster = getBestImageUrl(epData?.poster);
                  const category = unwrapRelation(epData?.podcast_category);

                  return (
                    <div
                      key={ep.id}
                      className="flex-shrink-0 w-60 sm:w-56 lg:w-64"
                      style={{ scrollSnapAlign: "start" }}
                    >
                      <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all overflow-hidden flex flex-col h-full group">

                        <div className="relative w-full aspect-square bg-gray-200">
                          {poster ? (
                            <img
                              src={poster}
                              alt={ep.title}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-slate-400">
                              No Image
                            </div>
                          )}

                          {ep.duration && (
                            <div className="absolute left-2 bottom-2 bg-black/70 text-white px-2 py-1 rounded text-xs">
                              {ep.duration}
                            </div>
                          )}
                        </div>

                        <div className="p-3 flex-1 flex flex-col justify-between">
                          <div>
                            <h3 className="font-semibold text-sm leading-tight mb-1 line-clamp-2">
                              {epData?.title}
                            </h3>

                            <p className="text-xs text-gray-500 mb-1">
                              {category?.name || ""}
                            </p>

                            <div className="flex items-end gap-[3px] h-5 mt-1 opacity-70 group-hover:opacity-100 transition">
                              <span className="w-[3px] bg-kbcRed rounded wavebar animate-wave1"></span>
                              <span className="w-[3px] bg-kbcRed rounded wavebar animate-wave2"></span>
                              <span className="w-[3px] bg-kbcRed rounded wavebar animate-wave3"></span>
                              <span className="w-[3px] bg-kbcRed rounded wavebar animate-wave2"></span>
                              <span className="w-[3px] bg-kbcRed rounded wavebar animate-wave1"></span>
                            </div>
                          </div>

                          <div className="flex items-center justify-between mt-3">
                            <Link
                              to={`/podcasts/${epData?.slug}`}
                              className="px-3 py-1.5 bg-yellow-400 hover:bg-yellow-500 text-black rounded-md text-sm font-semibold"
                            >
                              Play
                            </Link>

                            <Link
                              to={`/podcasts/${epData?.slug}`}
                              className="px-2 py-1 text-xs text-pink-600 hover:underline"
                            >
                              Details
                            </Link>
                          </div>
                        </div>

                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Waveform Animations */}
          <style>
            {`
              @keyframes wave1 {
                0%, 100% { height: 15%; }
                50% { height: 70%; }
              }
              @keyframes wave2 {
                0%, 100% { height: 35%; }
                50% { height: 100%; }
              }
              @keyframes wave3 {
                0%, 100% { height: 20%; }
                50% { height: 60%; }
              }

              .wavebar {
                height: 20%;
                transition: height 0.3s ease;
              }

              .group:hover .animate-wave1 { animation: wave1 1s infinite ease-in-out; }
              .group:hover .animate-wave2 { animation: wave2 1.1s infinite ease-in-out; }
              .group:hover .animate-wave3 { animation: wave3 0.9s infinite ease-in-out; }

              @keyframes shimmer {
                100% { transform: translateX(100%); }
              }
            `}
          </style>
        </section>
      </main>

      <Footer />
    </>
  );
}
