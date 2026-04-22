const API_URL = "http://localhost:1337";

/* -------------------------------------------
 * GET PODCAST CATEGORIES (now with thumbnails)
 * ------------------------------------------- */
export async function fetchCategories() {
  const res = await fetch(
    `${API_URL}/api/podcast-categories?populate=thumbnail`
  );

  const json = await res.json();
  return json.data ?? [];
}

/* ---------------------------------------------------------
 * GET LATEST PODCAST EPISODES (poster + category populated)
 * --------------------------------------------------------- */
export async function fetchLatestEpisodes() {
  const res = await fetch(
    `${API_URL}/api/podcast-episodes?populate[poster]=true&populate[podcast_category]=true&sort[0]=release_date:desc&sort[1]=createdAt:desc`
  );

  const json = await res.json();
  return json.data ?? [];
}
