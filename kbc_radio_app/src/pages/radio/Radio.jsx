import React from "react";
import { Link } from "react-router-dom";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { radioStations } from "../../data/radioStations";

export default function Radio() {
  return (
    <div className="relative min-h-screen text-gray-900">

      {/* 🔥 Background Image Layer */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('/assets/radio-bg.jpg')",
        }}
      />

      {/* 🔥 Dark + blur overlay */}
      <div className="absolute inset-0 bg-white/80 backdrop-blur-sm" />

      {/* Content layer */}
      <div className="relative z-10">
        <Header />

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Title */}
          <section className="mt-10 mb-8">
            <h1 className="text-3xl font-bold text-kbcBlue">
              Live Radio
            </h1>
            <p className="text-gray-600 mt-2">
              Listen to your favorite KBC stations live.
            </p>
          </section>

          {/* Grid */}
          <section className="mb-16">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">

              {radioStations.map((station) => (
                <Link
                  key={station.id}
                  to={`/radio/${station.id}`}
                  className="group"
                >
                  <div className="bg-white/90 rounded-2xl shadow-sm group-hover:shadow-md transition p-5 flex flex-col items-center text-center">

                    <img
                      src={station.img}
                      alt={station.title}
                      className="w-24 h-24 object-contain mb-4"
                    />

                    <h3 className="font-semibold text-gray-800 group-hover:text-kbcBlue transition">
                      {station.title}
                    </h3>

                    <p className="mt-2 text-xs text-gray-500">
                      {station.region}
                    </p>

                    <span className="mt-2 text-xs bg-red-100 text-red-600 px-2 py-1 rounded-full">
                      Live
                    </span>

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
