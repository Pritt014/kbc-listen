import { API_URL } from "./strapi";

/* -------------------------------------------
 * GET PODCAST CATEGORIES (now with thumbnails)
 * ------------------------------------------- */
export async function fetchCategories() {
  const res = await fetch(
    `${API_URL}/api/podcast-categories?populate[thumbnail]=true&sort[0]=name:asc`
  );

  const json = await res.json();
  return json.data ?? [];
}

/* ---------------------------------------------------------
 * GET LATEST PODCAST EPISODES (poster + category populated)
 * --------------------------------------------------------- */
export async function fetchLatestEpisodes() {
  const res = await fetch(
    `${API_URL}/api/podcast-episodes?populate[poster]=true&populate[audio_file]=true&populate[podcast_category][populate][thumbnail]=true&sort[0]=release_date:desc&sort[1]=publishedAt:desc&sort[2]=createdAt:desc`
  );

  const json = await res.json();
  return json.data ?? [];
}
