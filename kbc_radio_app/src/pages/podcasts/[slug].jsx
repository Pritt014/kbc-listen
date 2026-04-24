import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import {
  API_URL,
  getBestImageUrl,
  getMediaUrl,
  unwrapEntity,
  unwrapRelation,
} from "../../api/strapi";
import ColorThief from "colorthief";

/** Safely extract category id */
function getCategoryId(ep) {
  return unwrapRelation(unwrapEntity(ep)?.podcast_category)?.id || null;
}

/* PREMIUM shimmer utility */
const shimmer =
  "relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_1.6s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/50 before:to-transparent";

export default function EpisodeDetail() {
  const { slug } = useParams();

  // core state
  const [episode, setEpisode] = useState(null);
  const [relatedTop, setRelatedTop] = useState([]);
  const [relatedRest, setRelatedRest] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // dominant color state
  const [dominantColor, setDominantColor] = useState("#c3f4f9");

  /** ----------------------------
   * FETCH DATA (DO NOT MODIFY)
   * ---------------------------- */
  useEffect(() => {
    if (!slug) return;

    async function load() {
      setLoading(true);
      setError(null);
      setEpisode(null);
      setRelatedTop([]);
      setRelatedRest([]);

      try {
        const encoded = encodeURIComponent(slug);

        const res = await fetch(
          `${API_URL}/api/podcast-episodes?filters[slug][$eq]=${encoded}&populate=*`
        );
        const json = await res.json();

        if (!json?.data || json.data.length === 0) {
          setEpisode(null);
          setLoading(false);
          return;
        }

        const ep = json.data[0];
        setEpisode(ep);

        const catId = getCategoryId(ep);

        if (catId) {
          const relRes = await fetch(
            `${API_URL}/api/podcast-episodes?filters[podcast_category][id][$eq]=${catId}` +
              `&filters[slug][$ne]=${encoded}` +
              `&populate[poster]=true` +
              `&populate[audio_file]=true` +
              `&populate[podcast_category][populate][thumbnail]=true` +
              `&sort[0]=release_date:desc&sort[1]=publishedAt:desc&sort[2]=createdAt:desc&pagination[pageSize]=200`
          );

          const relJson = await relRes.json();
          const all = relJson?.data || [];

          setRelatedTop(all.slice(0, 10));
          setRelatedRest(all.slice(10));
        }
      } catch (err) {
        console.error("Episode load error:", err);
        setError("Failed to load episode. Check server or network.");
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [slug]);

  /** ----------------------------
   * SAFE NORMALIZATION
   * ---------------------------- */
  const data = unwrapEntity(episode);
  const poster = getBestImageUrl(data?.poster);
  const audioUrl = getMediaUrl(data?.audio_file);
  const category = unwrapRelation(data?.podcast_category);

  // description preview
  let descriptionPreview = "";
  if (data && Array.isArray(data.description) && data.description.length > 0) {
    descriptionPreview = data.description?.[0]?.children?.[0]?.text ?? "";
    if (descriptionPreview.length > 180) descriptionPreview += "…";
  } else if (data && typeof data.description === "string") {
    descriptionPreview =
      data.description.length > 180
        ? data.description.slice(0, 180) + "…"
        : data.description;
  }

  // full description
  let fullDescription = "";
  if (data && Array.isArray(data.description)) {
    fullDescription = data.description
      .map((blk) => blk?.children?.map((c) => c.text).join("") || "")
      .join("\n\n");
  } else {
    fullDescription = (data && data.description) || "";
  }

  /** ----------------------------
   * EXTRACT DOMINANT COLOR
   * ---------------------------- */
  useEffect(() => {
    if (!poster) return;

    const img = new Image();
    img.crossOrigin = "Anonymous";
    img.src = poster;

    img.onload = () => {
      try {
        const thief = new ColorThief();
        const rgb = thief.getColor(img);
        setDominantColor(`rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`);
      } catch (e) {
        console.error("Color extraction failed:", e);
      }
    };
  }, [poster]);

  /** ----------------------------
   * FULL PREMIUM SKELETON (STYLE C)
   * ---------------------------- */
  if (loading) {
    return (
      <>
        <Header />

        {/* Skeleton Gradient */}
        <div
          className={`w-full h-64 ${shimmer}`}
          style={{
            background: `linear-gradient(to bottom, ${dominantColor}, transparent)`,
          }}
        ></div>

        <main className="max-w-7xl mx-auto px-6 pb-16 -mt-32">
          <div className="flex flex-col md:flex-row gap-10">

            {/* Poster Skeleton */}
            <div className="w-full md:w-1/3">
              <div
                className={`rounded-2xl h-80 bg-gray-300 ${shimmer}`}
              ></div>
            </div>

            {/* Info Skeleton */}
            <div className="flex-1 space-y-4 pt-4">
              <div className={`h-4 w-32 bg-gray-300 rounded ${shimmer}`} />
              <div className={`h-10 w-3/4 bg-gray-300 rounded ${shimmer}`} />
              <div className={`h-4 w-1/2 bg-gray-300 rounded ${shimmer}`} />

              <div className={`h-20 w-full bg-gray-200 rounded-xl ${shimmer} mt-6`} />
            </div>
          </div>

          {/* Summary Skeleton */}
          <section className="mt-16 space-y-4 mb-10">
            <div className={`h-6 w-48 bg-gray-300 rounded ${shimmer}`} />
            <div className={`h-4 w-full bg-gray-200 rounded ${shimmer}`} />
            <div className={`h-4 w-5/6 bg-gray-200 rounded ${shimmer}`} />
            <div className={`h-4 w-3/4 bg-gray-200 rounded ${shimmer}`} />
          </section>

          {/* Horizontal Carousel Skeleton */}
          <section className="mb-16">
            <div className={`h-6 w-56 bg-gray-300 rounded mb-4 ${shimmer}`} />

            <div className="flex gap-4 overflow-x-auto">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="w-44 flex-shrink-0">
                  <div className={`w-full aspect-square bg-gray-300 rounded-lg ${shimmer}`} />
                  <div className={`h-4 w-32 mt-2 bg-gray-200 rounded ${shimmer}`} />
                </div>
              ))}
            </div>
          </section>

          {/* Grid Skeleton */}
          <section>
            <div className={`h-6 w-40 bg-gray-300 rounded mb-4 ${shimmer}`} />

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="flex gap-3 bg-white shadow p-4 rounded-xl">
                  <div className={`w-20 h-20 bg-gray-300 rounded ${shimmer}`} />
                  <div className="flex-1 space-y-2">
                    <div className={`h-4 w-32 bg-gray-300 rounded ${shimmer}`} />
                    <div className={`h-3 w-20 bg-gray-200 rounded ${shimmer}`} />
                  </div>
                </div>
              ))}
            </div>
          </section>
        </main>

        <Footer />

        {/* shimmer keyframes */}
        <style>{`
          @keyframes shimmer {
            100% { transform: translateX(100%); }
          }
        `}</style>
      </>
    );
  }

  /** ----------------------------
   * ERROR + NOT FOUND
   * ---------------------------- */
  if (error)
    return (
      <>
        <Header />
        <main className="max-w-5xl mx-auto px-4 py-20 text-center text-red-600">
          {error}
        </main>
        <Footer />
      </>
    );

  if (!episode)
    return (
      <>
        <Header />
        <main className="max-w-5xl mx-auto px-4 py-20 text-center">
          <h2 className="text-2xl font-semibold mb-4">Episode not found</h2>
          <Link to="/podcasts" className="text-pink-600 underline">
            Back to podcasts
          </Link>
        </main>
        <Footer />
      </>
    );

  /** ----------------------------
   * REAL UI STARTS HERE
   * ---------------------------- */
  return (
    <>
      <Header />

      {/* Dynamic Gradient */}
      <div
        className="w-full h-64"
        style={{
          background: `linear-gradient(to bottom, ${dominantColor}, transparent)`,
        }}
      ></div>

      <main className="max-w-7xl mx-auto px-6 pb-8 -mt-32">

        {/* HERO */}
        <div className="flex flex-col md:flex-row gap-10 items-start">

          {/* Poster */}
          <div className="w-full md:w-1/3">
            <div className="rounded-2xl overflow-hidden shadow-xl bg-white">
              {poster ? (
                <img
                  src={poster}
                  alt={data.title}
                  className="w-full object-cover"
                />
              ) : (
                <div className="h-80 flex items-center justify-center text-gray-400">
                  No Image
                </div>
              )}
            </div>
          </div>

          {/* Info */}
          <div className="flex-1 md:pl-6">
            <p className="text-pink-600 text-sm font-semibold tracking-wide mb-2">
              {category?.name}
            </p>

            <h1 className="text-4xl md:text-5xl font-bold leading-tight text-gray-900 mb-4">
              {data.title}
            </h1>

            {descriptionPreview && (
              <p className="text-lg text-gray-600 leading-relaxed mb-6 max-w-xl">
                {descriptionPreview}
              </p>
            )}

            {audioUrl ? (
              <div className="sticky top-4 bg-white p-4 rounded-xl shadow-md border">
                <audio controls src={audioUrl} className="w-full" />
              </div>
            ) : (
              <p className="text-sm text-gray-500">No audio available</p>
            )}
          </div>
        </div>

        {/* SUMMARY */}
        <section className="mt-16 mb-20">
          <h2 className="text-2xl font-semibold mb-4">Episode Summary</h2>

          <div className="prose max-w-none text-gray-800">
            {fullDescription.split("\n\n").map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </section>

        {/* TOP RELATED */}
        {relatedTop.length > 0 && (
          <section className="mb-20">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-semibold">
                More episodes from {category?.name}
              </h2>
              <Link to="/podcasts" className="text-sm text-kbcBlue hover:underline">
                See all →
              </Link>
            </div>

            <div className="relative">
              <div className="pointer-events-none absolute right-0 top-0 w-16 h-full bg-gradient-to-l from-white"></div>

              <div className="overflow-x-auto flex gap-6 py-3 scrollbar-hide">
                {relatedTop.map((ep) => {
                  const epAttrs = unwrapEntity(ep);
                  const p = getBestImageUrl(epAttrs?.poster);

                  return (
                    <Link
                      key={ep.id}
                      to={`/podcasts/${epAttrs.slug}`}
                      className="w-44 flex-shrink-0"
                    >
                      <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition overflow-hidden">
                        <div className="aspect-square w-full bg-gray-200">
                          {p ? (
                            <img
                              src={p}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-gray-400">
                              No Image
                            </div>
                          )}
                        </div>

                        <div className="p-3">
                          <h3 className="text-sm font-semibold line-clamp-2">
                            {epAttrs.title}
                          </h3>
                          <p className="text-xs text-gray-500">
                            {unwrapRelation(epAttrs?.podcast_category)?.name}
                          </p>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          </section>
        )}

        {/* REMAINING GRID */}
        {relatedRest.length > 0 && (
          <section className="mb-16">
            <h3 className="text-xl font-semibold mb-4">More episodes</h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {relatedRest.map((ep) => {
                const epAttrs = unwrapEntity(ep);
                const p = getBestImageUrl(epAttrs?.poster);

                return (
                  <Link
                    key={ep.id}
                    to={`/podcasts/${epAttrs.slug}`}
                    className="flex gap-4 items-center p-4 bg-white rounded-xl shadow border hover:shadow-md transition"
                  >
                    <div className="w-20 h-20 rounded-md overflow-hidden bg-gray-100">
                      {p ? (
                        <img src={p} className="w-full h-full" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-300">
                          No
                        </div>
                      )}
                    </div>

                    <div>
                      <h4 className="font-medium">{epAttrs.title}</h4>
                      <p className="text-xs text-gray-500">
                        {unwrapRelation(epAttrs?.podcast_category)?.name}
                      </p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>
        )}
      </main>

      <Footer />

      {/* Shimmer keyframe */}
      <style>{`
        @keyframes shimmer {
          100% { transform: translateX(100%); }
        }
      `}</style>
    </>
  );
}
