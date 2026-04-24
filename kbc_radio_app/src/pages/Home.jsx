import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import HeroCarousel from "../components/HeroCarousel";
import HorizontalScroller from "../components/HorizontalScroller";
import Podcasts from "../components/Podcasts";
import PodcastGrid from "../components/PodcastGrid";
import Footer from "../components/Footer";
import { fetchCategories, fetchLatestEpisodes } from "../api/podcasts";
import { getBestImageUrl, unwrapEntity, unwrapRelation } from "../api/strapi";
import { radioStations } from "../data/radioStations";

function formatEpisodeDate(value) {
  if (!value) return null;

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return null;

  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(date);
}

export default function Home() {
  const [podcastCategories, setPodcastCategories] = useState([]);
  const [latestEpisodes, setLatestEpisodes] = useState([]);

  useEffect(() => {
    let isMounted = true;

    async function loadHomepagePodcastData() {
      try {
        const [categories, episodes] = await Promise.all([
          fetchCategories(),
          fetchLatestEpisodes(),
        ]);

        if (!isMounted) return;

        const normalizedCategories = (Array.isArray(categories) ? categories : [])
          .map((category) => {
            const data = unwrapEntity(category);
            const thumbUrl = getBestImageUrl(data?.thumbnail);

            return {
              id: category.id,
              title: data?.name,
              host: data?.description || "Podcast category",
              img: thumbUrl || "/assets/home-bg.jpg",
              path: data.slug ? `/podcasts/category/${data.slug}` : "/podcasts",
            };
          })
          .filter((category) => category.title)
          .slice(0, 12);

        const normalizedEpisodes = (Array.isArray(episodes) ? episodes : [])
          .map((episode) => {
            const data = unwrapEntity(episode);
            const posterUrl = getBestImageUrl(data?.poster);
            const categoryObj = unwrapRelation(data?.podcast_category);
            const rawDate =
              data?.release_date || data?.publishedAt || data?.createdAt || null;

            return {
              id: episode.id,
              title: data?.title,
              host: categoryObj?.name || "Podcast episode",
              img: posterUrl || "/assets/home-bg.jpg",
              path: data.slug ? `/podcasts/${data.slug}` : "/podcasts",
              dateLabel: formatEpisodeDate(rawDate) || "Latest episode",
            };
          })
          .filter((episode) => episode.title)
          .slice(0, 12);

        setPodcastCategories(normalizedCategories);
        setLatestEpisodes(normalizedEpisodes);
      } catch (error) {
        console.error("Failed to load homepage podcast data:", error);
        if (isMounted) {
          setPodcastCategories([]);
          setLatestEpisodes([]);
        }
      }
    }

    loadHomepagePodcastData();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="relative min-h-screen text-gray-900">

      {/* 🔵 Background Image Layer */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('/assets/home-bg.jpg')",
          backgroundSize: "130%", // subtle zoom OUT
        }}
      />

      {/* 🔵 Soft overlay (keeps it readable) */}
      <div className="absolute inset-0 bg-white/120 backdrop-blur-sm" />

      {/* Content */}
      <div className="relative z-10">
        <Header />

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <HeroCarousel />

          <section className="mt-10">
            <h3 className="text-2xl font-bold text-kbcBlue mb-4 flex items-center">
              <span className="w-2 h-10 bg-kbcRed rounded mr-3"></span>
              Live Radio, On Air Now
            </h3>
            <HorizontalScroller
              items={radioStations.map((station) => ({
                ...station,
                path: `/radio/${station.id}`,
              }))}
              itemType="radio"
            />
          </section>

          <section className="mt-10">
            <h3 className="text-2xl font-bold text-kbcBlue mb-4 flex items-center">
              <span className="w-2 h-10 bg-kbcRed rounded mr-3"></span>
              Fresh Podcasts
            </h3>
            <Podcasts items={podcastCategories} />
          </section>

          <section className="mt-10">
            <h3 className="text-2xl font-bold text-kbcBlue mb-4 flex items-center">
              <span className="w-2 h-10 bg-kbcRed rounded mr-3"></span>
              Just Released
            </h3>
            <PodcastGrid items={latestEpisodes} />
          </section>

        </main>

        <Footer />
      </div>
    </div>
  );
}
