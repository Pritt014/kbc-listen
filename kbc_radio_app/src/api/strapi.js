const rawApiUrl =
  import.meta.env.VITE_API_URL ||
  (import.meta.env.DEV ? "http://localhost:1337" : "");

if (!rawApiUrl) {
  throw new Error(
    "Missing VITE_API_URL. Set it to your deployed Strapi URL, for example https://your-strapi-service.onrender.com."
  );
}

export const API_URL = rawApiUrl.replace(/\/+$/, "");

export function unwrapEntity(entity) {
  if (!entity) return null;
  return entity.attributes || entity;
}

export function unwrapRelation(relation) {
  if (!relation) return null;
  if (Array.isArray(relation?.data)) {
    return relation.data.map(unwrapEntity).filter(Boolean);
  }
  if (relation?.data) {
    return unwrapEntity(relation.data);
  }
  return unwrapEntity(relation);
}

export function getMediaUrl(media) {
  const file = unwrapRelation(media);
  if (!file?.url) return null;
  return file.url.startsWith("http") ? file.url : `${API_URL}${file.url}`;
}

export function getBestImageUrl(media) {
  const file = unwrapRelation(media);
  if (!file) return null;

  const formats = file.formats || {};
  const imageUrl =
    formats.medium?.url ||
    formats.small?.url ||
    formats.thumbnail?.url ||
    file.url ||
    null;

  if (!imageUrl) return null;
  return imageUrl.startsWith("http") ? imageUrl : `${API_URL}${imageUrl}`;
}
