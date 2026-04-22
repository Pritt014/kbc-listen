import React from "react";
import { Link, useParams } from "react-router-dom";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import {
  getRadioStationById,
  radioStations,
} from "../../data/radioStations";

export default function StationDetails() {
  const { id } = useParams();
  const station = getRadioStationById(id);
  const relatedStations = radioStations
    .filter((item) => item.id !== Number(id))
    .slice(0, 4);

  if (!station) {
    return (
      <div className="relative min-h-screen text-gray-900">
        <div className="absolute inset-0 bg-[linear-gradient(135deg,#f4efe4_0%,#f8f1dc_18%,#f5f7fb_42%,#eef3f8_68%,#ffffff_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,193,7,0.18),transparent_34%),radial-gradient(circle_at_top_left,rgba(0,33,71,0.12),transparent_32%),radial-gradient(circle_at_bottom_center,rgba(255,0,54,0.08),transparent_38%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.28)_0%,rgba(255,255,255,0.52)_22%,rgba(255,255,255,0.76)_48%,rgba(255,255,255,0.92)_78%,#ffffff_100%)]" />

        <div className="relative z-10">
          <Header />
          <main className="mx-auto max-w-4xl px-4 py-16 text-center sm:px-6 lg:px-8">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-kbcRed">
              Radio
            </p>
            <h1 className="mt-3 text-3xl font-bold text-kbcBlue">
              Station not found
            </h1>
            <p className="mt-3 text-gray-600">
              The station you opened does not exist in the current radio list.
            </p>
            <Link
              to="/radio"
              className="mt-6 inline-flex rounded-lg bg-kbcBlue px-5 py-3 text-sm font-semibold text-white transition hover:brightness-110"
            >
              Back to Radio
            </Link>
          </main>
          <Footer />
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen text-gray-900">
      <div className="absolute inset-0 bg-[linear-gradient(135deg,#f4efe4_0%,#f8f1dc_18%,#f5f7fb_42%,#eef3f8_68%,#ffffff_100%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,193,7,0.18),transparent_34%),radial-gradient(circle_at_top_left,rgba(0,33,71,0.12),transparent_32%),radial-gradient(circle_at_bottom_center,rgba(255,0,54,0.08),transparent_38%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.28)_0%,rgba(255,255,255,0.52)_22%,rgba(255,255,255,0.76)_48%,rgba(255,255,255,0.92)_78%,#ffffff_100%)]" />
      <div className="absolute inset-x-0 top-0 h-[32rem] bg-[radial-gradient(circle_at_top_right,rgba(255,193,7,0.18),transparent_40%),radial-gradient(circle_at_top_left,rgba(0,33,71,0.12),transparent_35%)]" />

      <div className="relative z-10">
        <Header />

        <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <Link
            to="/radio"
            className="inline-flex rounded-full border border-kbcBlue/15 bg-white/70 px-4 py-2 text-sm font-medium text-kbcBlue shadow-sm backdrop-blur hover:bg-white"
          >
            ← Back to Live Radio
          </Link>

          <section className="mt-6 overflow-hidden rounded-[2rem] border border-white/80 bg-white/78 shadow-[0_28px_80px_rgba(4,22,45,0.14)] backdrop-blur">
            <div className="relative grid gap-0 lg:grid-cols-[360px,1fr]">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,193,7,0.12),transparent_28%),radial-gradient(circle_at_bottom_right,rgba(255,0,54,0.08),transparent_30%)]" />

              <div className="relative border-b border-slate-200/80 p-8 lg:border-b-0 lg:border-r lg:border-slate-200/80">
                <div className="absolute -left-10 top-10 h-40 w-40 rounded-full bg-kbcGold/20 blur-3xl" />
                <div className="absolute bottom-10 right-0 h-32 w-32 rounded-full bg-kbcRed/20 blur-3xl" />

                <div className="relative">
                  <div className="inline-flex items-center gap-2 rounded-full border border-slate-300/80 bg-white/80 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.28em] text-slate-700">
                    <span className="h-2 w-2 rounded-full bg-kbcRed" />
                    Station Live
                  </div>

                  <div className="mt-6 rounded-[1.75rem] border border-white/80 bg-[linear-gradient(180deg,rgba(255,255,255,0.96),rgba(248,250,252,0.92))] p-6 shadow-2xl backdrop-blur">
                    <div className="flex items-center justify-center rounded-[1.4rem] bg-white/95 p-8">
                      <img
                        src={station.img}
                        alt={station.title}
                        className="h-44 w-44 object-contain drop-shadow-[0_20px_30px_rgba(0,0,0,0.18)]"
                      />
                    </div>
                  </div>

                  <div className="mt-6 flex flex-wrap gap-2">
                    <span className="rounded-full bg-kbcRed/15 px-3 py-1 text-xs font-semibold text-[#ff6a86]">
                      Live
                    </span>
                    <span className="rounded-full border border-slate-300/80 bg-white/80 px-3 py-1 text-xs font-semibold text-slate-700">
                      {station.language}
                    </span>
                    <span className="rounded-full border border-slate-300/80 bg-white/80 px-3 py-1 text-xs font-semibold text-slate-700">
                      {station.region}
                    </span>
                  </div>

                  <div className="mt-6 grid gap-3">
                    <div className="rounded-2xl border border-slate-200/80 bg-white/75 p-4 backdrop-blur">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-kbcGold">
                        Station Focus
                      </p>
                      <p className="mt-2 text-sm font-medium text-slate-900">
                        {station.focus}
                      </p>
                    </div>
                    <div className="rounded-2xl border border-slate-200/80 bg-white/75 p-4 backdrop-blur">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-kbcGold">
                        Sound
                      </p>
                      <p className="mt-2 text-sm leading-6 text-slate-700">
                        {station.tagline}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="relative p-8 sm:p-10 lg:p-12">
                <div className="max-w-4xl">
                  <p className="text-sm font-semibold uppercase tracking-[0.28em] text-kbcGold">
                    KBC Station Profile
                  </p>
                  <h1 className="mt-4 text-4xl font-black tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
                    {station.title}
                  </h1>
                  <p className="mt-5 max-w-3xl text-base leading-8 text-slate-700 sm:text-lg">
                    {station.description}
                  </p>

                  <div className="mt-8 flex flex-wrap gap-3">
                    {station.streamUrl ? (
                      <a
                        href={station.streamUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="rounded-full bg-kbcGold px-6 py-3 text-sm font-semibold text-black transition hover:brightness-95"
                      >
                        Listen Live
                      </a>
                    ) : (
                      <span className="rounded-full bg-slate-200 px-6 py-3 text-sm font-semibold text-slate-500">
                        Stream unavailable
                      </span>
                    )}
                    <Link
                      to="/podcasts"
                      className="rounded-full border border-slate-300 bg-white/85 px-6 py-3 text-sm font-semibold text-slate-900 transition hover:bg-white"
                    >
                      Browse Podcasts
                    </Link>
                  </div>

                  <section className="mt-10 grid gap-4 md:grid-cols-3">
                    <div className="rounded-[1.5rem] border border-slate-200/80 bg-white/75 p-5 backdrop-blur">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-kbcGold">
                        Region
                      </p>
                      <p className="mt-3 text-lg font-semibold text-slate-900">
                        {station.region}
                      </p>
                    </div>
                    <div className="rounded-[1.5rem] border border-slate-200/80 bg-white/75 p-5 backdrop-blur">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-kbcGold">
                        Language
                      </p>
                      <p className="mt-3 text-lg font-semibold text-slate-900">
                        {station.language}
                      </p>
                    </div>
                    <div className="rounded-[1.5rem] border border-slate-200/80 bg-white/75 p-5 backdrop-blur">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-kbcGold">
                        Programming
                      </p>
                      <p className="mt-3 text-lg font-semibold text-slate-900">
                        {station.focus}
                      </p>
                    </div>
                  </section>

                  <section className="mt-8 rounded-[1.5rem] border border-slate-200/80 bg-white/75 p-5 backdrop-blur">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-kbcGold">
                      Live Stream
                    </p>
                    {station.streamUrl ? (
                      <>
                        <audio
                          controls
                          preload="none"
                          src={station.streamUrl}
                          className="mt-4 w-full"
                        />
                        <p className="mt-3 text-sm text-slate-600">
                          If playback is blocked in-browser, open the live
                          stream in a new tab.
                        </p>
                      </>
                    ) : (
                      <p className="mt-3 text-sm text-slate-600">
                        No live stream URL is assigned to this station yet.
                      </p>
                    )}
                  </section>

                  <section className="mt-10 rounded-[1.75rem] border border-slate-200/80 bg-[linear-gradient(180deg,rgba(255,255,255,0.92),rgba(248,250,252,0.82))] p-6 backdrop-blur">
                    <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
                      <div>
                        <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-kbcGold">
                          Highlights
                        </p>
                        <h2 className="mt-2 text-2xl font-bold text-slate-950">
                          What defines this station
                        </h2>
                      </div>
                      <p className="max-w-xl text-sm leading-6 text-slate-600">
                        A quick read on the tone, coverage, and identity that
                        make {station.title} distinct within the KBC network.
                      </p>
                    </div>

                    <div className="mt-6 flex flex-wrap gap-3">
                      {station.highlights.map((highlight) => (
                        <span
                          key={highlight}
                          className="rounded-full border border-slate-300/80 bg-white px-4 py-2 text-sm font-medium text-slate-800"
                        >
                          {highlight}
                        </span>
                      ))}
                    </div>
                  </section>
                </div>
              </div>
            </div>
          </section>

          <section className="mt-10 rounded-[2rem] border border-slate-200/70 bg-white/72 p-6 shadow-[0_18px_60px_rgba(15,23,42,0.08)] backdrop-blur md:p-8">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-kbcRed">
                  More Stations
                </p>
                <h2 className="mt-2 text-2xl font-bold text-kbcBlue">
                  Keep scanning the dial
                </h2>
              </div>
              <Link
                to="/radio"
                className="text-sm font-semibold text-kbcBlue hover:underline"
              >
                View all stations
              </Link>
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {relatedStations.map((item) => (
                <Link
                  key={item.id}
                  to={`/radio/${item.id}`}
                  className="group rounded-[1.6rem] border border-slate-200/80 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
                >
                  <div className="flex items-center justify-center rounded-[1.25rem] bg-[linear-gradient(180deg,#f8fafc,#eef2ff)] p-5">
                    <img
                      src={item.img}
                      alt={item.title}
                      className="h-16 w-16 object-contain transition duration-300 group-hover:scale-105"
                    />
                  </div>
                  <h3 className="mt-4 font-semibold text-slate-800">
                    {item.title}
                  </h3>
                  <p className="mt-1 text-sm text-slate-500">{item.region}</p>
                  <div className="mt-4 inline-flex items-center rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
                    Open station
                  </div>
                </Link>
              ))}
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </div>
  );
}
