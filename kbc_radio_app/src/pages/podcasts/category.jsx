// src/pages/podcasts/category.jsx
import { useEffect, useRef, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import ColorThief from "colorthief";

const API_URL = "http://localhost:1337";

/** Safely picks poster url */
function getPosterUrl(poster) {
  if (!poster) return null;
  const f = poster.formats || {};
  return f.medium?.url || f.small?.url || poster.url || null;
}

/** Extract text from Strapi rich text */
function extractDescription(desc) {
  if (Array.isArray(desc)) {
    return desc
      .map((blk) => blk?.children?.map((c) => c.text).join("") || "")
      .join("\n\n");
  }
  return desc || "";
}

/* shimmer utility (used for skeletons) */
const shimmer =
  "relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_1.6s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/40 before:to-transparent";

export default function PodcastCategoryPage() {
  const { categorySlug } = useParams();

  // Data & UI hooks
  const [category, setCategory] = useState(null);
  const [episodes, setEpisodes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [dominantColor, setDominantColor] = useState("rgb(195,244,249)");

  const heroRef = useRef(null);
  const posterRef = useRef(null);

  /** 🚨 DATA LOGIC — UNCHANGED */
  useEffect(() => {
    if (!categorySlug) return;

    async function load() {
      setLoading(true);
      setError(null);
      setCategory(null);
      setEpisodes([]);

      try {
        const encoded = encodeURIComponent(categorySlug);

        const catRes = await fetch(
          `${API_URL}/api/podcast-categories?filters[slug][$eq]=${encoded}&populate=*`
        );
        const catJson = await catRes.json();

        if (!catJson?.data || catJson.data.length === 0) {
          setError("Category not found");
          setLoading(false);
          return;
        }

        const cat = catJson.data[0];
        setCategory(cat);

        const epRes = await fetch(
          `${API_URL}/api/podcast-episodes?filters[podcast_category]=${cat.id}&populate=*`
        );
        const epJson = await epRes.json();

        setEpisodes(epJson?.data || []);
      } catch (e) {
        console.error("Category load error:", e);
        setError("Failed to load category.");
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [categorySlug]);

  // Normalized category
  const cat = category ? category.attributes || category : null;

  const catPosterObj = cat
    ? cat.thumbnail?.data?.attributes ||
      cat.thumbnail?.attributes ||
      cat.thumbnail ||
      cat.poster?.data?.attributes ||
      cat.poster?.attributes ||
      cat.poster
    : null;

  const catPoster = getPosterUrl(catPosterObj);
  const description = cat ? extractDescription(cat.description) : "";

  // Extract dominant color
  useEffect(() => {
    if (!catPoster) return;
    const img = new Image();
    img.crossOrigin = "Anonymous";
    img.src = `${API_URL}${catPoster}`;

    img.onload = () => {
      try {
        const thief = new ColorThief();
        const rgb = thief.getColor(img);
        setDominantColor(`rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`);
      } catch (err) {
        console.error("Dominant color error:", err);
      }
    };
  }, [catPoster]);

  // ---------------- LOADING ----------------
  if (loading)
    return (
      <>
        <Header />

        <div
          className={`w-full h-80 ${shimmer}`}
          style={{
            background: `linear-gradient(180deg, ${dominantColor} 0%, rgba(0,0,0,0.18) 50%, transparent 100%)`,
          }}
        ></div>

        <main className="max-w-7xl mx-auto px-6 -mt-40 relative z-10 pb-10">
          <div className="flex flex-col md:flex-row gap-12 mb-14">
            <div className="md:w-1/3">
              <div className={`rounded-2xl h-64 bg-gray-300 ${shimmer}`} />
            </div>
            <div className="flex-1 space-y-4">
              <div className={`h-8 w-56 rounded bg-gray-300 ${shimmer}`} />
              <div className={`h-5 w-3/4 rounded bg-gray-200 ${shimmer}`} />
              <div className={`h-5 w-2/3 rounded bg-gray-200 ${shimmer}`} />
            </div>
          </div>

          {/* skeleton episodes */}
          <section>
            <h2 className="text-3xl font-bold mb-6">Episodes</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
              {Array.from({ length: 12 }).map((_, i) => (
                <div key={i} className="bg-white p-2 rounded-lg shadow-sm border border-gray-100">
                  <div className={`aspect-square bg-gray-300 rounded ${shimmer}`} />
                  <div className="mt-2 space-y-2">
                    <div className={`h-3 bg-gray-200 w-3/4 rounded ${shimmer}`} />
                    <div className={`h-2 bg-gray-200 w-1/3 rounded ${shimmer}`} />
                  </div>
                </div>
              ))}
            </div>
          </section>
        </main>

        <Footer />
      </>
    );

  // ---------------- ERROR / NOT FOUND ----------------
  if (error)
    return (
      <>
        <Header />
        <main className="p-20 text-center text-red-500">{error}</main>
        <Footer />
      </>
    );

  if (!category)
    return (
      <>
        <Header />
        <main className="p-20 text-center">Category not found.</main>
        <Footer />
      </>
    );

  // ---------------- NORMAL UI ----------------
  return (
    <>
      <Header />

      {/* Dynamic gradient */}
      <div
        className="w-full h-80"
        style={{
          background:
            `linear-gradient(180deg, ${dominantColor} 0%, rgba(0,0,0,0.16) 40%, rgba(255,255,255,0) 100%)`,
        }}
      />

      <main className="max-w-7xl mx-auto px-6 -mt-40 relative z-10 pb-12">

        {/* HERO SECTION — cleaned per your instructions */}
        <section ref={heroRef} className="relative mb-16">

          {/* ambient soft glow */}
          <div
            aria-hidden
            className="absolute -inset-8 rounded-3xl opacity-40 blur-3xl"
            style={{
              background: `radial-gradient(circle at 60% 20%, ${dominantColor}, transparent)`,
            }}
          />

          <div className="flex flex-col md:flex-row gap-10 items-start relative z-10">

            {/* POSTER — black frame removed */}
            <div className="w-full md:w-1/3 relative">
              <div
                ref={posterRef}
                className="rounded-3xl overflow-hidden shadow-2xl bg-gray-100 transition-transform duration-300"
                style={{ transformStyle: "preserve-3d" }}
              >
                {catPoster ? (
                  <img
                    src={`${API_URL}${catPoster}`}
                    alt={cat.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="h-72 flex items-center justify-center text-gray-400">
                    No Image
                  </div>
                )}
              </div>
            </div>

            {/* INFO PANEL — removed Browse All + episode count */}
            <div className="flex-1 backdrop-blur-xl bg-white/5 p-8 rounded-2xl border border-white/10 shadow-xl">

              <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-white drop-shadow-[0_6px_20px_rgba(0,0,0,0.5)] leading-tight">
                {cat.name}
              </h1>

              {description && (
                <p className="text-kbcBlue max-w-3xl leading-relaxed text-base md:text-lg">
                  {description}
                </p>
              )}

            </div>
          </div>
        </section>

        {/* EPISODES GRID */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold mb-6">Episodes</h2>

          {episodes.length === 0 ? (
            <p className="text-gray-500">No episodes found.</p>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
              {episodes.map((ep) => {
                const epAttrs = ep.attributes || ep;
                const epPosterObj =
                  epAttrs.poster?.data?.attributes ||
                  epAttrs.poster?.attributes ||
                  epAttrs.poster;
                const p = getPosterUrl(epPosterObj);

                return (
                  <Link
                    key={ep.id}
                    to={`/podcasts/${epAttrs.slug}`}
                    className="group bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transform transition hover:-translate-y-1"
                  >
                    <div className="relative aspect-square bg-gray-200 overflow-hidden">
                      {p ? (
                        <img
                          src={`${API_URL}${p}`}
                          alt={epAttrs.title}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-400">
                          No Image
                        </div>
                      )}

                      {/* waveform */}
                      <div className="absolute bottom-2 left-2 flex items-end gap-[3px] opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        <span className="w-[3px] bg-kbcRed rounded bar bar1"></span>
                        <span className="w-[3px] bg-kbcRed rounded bar bar2"></span>
                        <span className="w-[3px] bg-kbcRed rounded bar bar3"></span>
                        <span className="w-[3px] bg-kbcRed rounded bar bar2"></span>
                        <span className="w-[3px] bg-kbcRed rounded bar bar1"></span>
                      </div>
                    </div>

                    <div className="p-2">
                      <h3 className="font-semibold text-gray-900 text-sm line-clamp-2">
                        {epAttrs.title}
                      </h3>
                      <p className="text-xs text-gray-500 mt-1">{cat.name}</p>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </section>
      </main>

      <Footer />

      <style>{`
        @keyframes wave1 { 0%,100%{height:20%} 50%{height:90%} }
        @keyframes wave2 { 0%,100%{height:40%} 50%{height:100%} }
        @keyframes wave3 { 0%,100%{height:25%} 50%{height:75%} }

        .bar { height:20%; transition:height .2s ease; }
        .group:hover .bar1 { animation: wave1 1s infinite ease-in-out; }
        .group:hover .bar2 { animation: wave2 1.1s infinite ease-in-out; }
        .group:hover .bar3 { animation: wave3 0.9s infinite ease-in-out; }
      `}</style>
    </>
  );
}
