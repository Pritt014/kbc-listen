import React from "react";
import { FaFacebookF, FaInstagram, FaYoutube, FaTwitter } from "react-icons/fa";
import { SiTiktok } from "react-icons/si";

export default function Footer() {
  const handleSubscribe = (e) => {
    e.preventDefault();
  };

  return (
    <footer className="w-full bg-[#2c3136] text-gray-300 px-6 md:px-16 py-12 mt-10">
      {/* Top Section */}
      <div className="grid md:grid-cols-2 gap-10">
        
        {/* Left Column */}
        <div>
          <img
            src="/assets/kbc_logo1.png"
            alt="KBC Listen logo"
            className="h-[72px] w-auto object-contain"
          />

          <h3 className="text-lg font-semibold mb-3">More from KBC →</h3>

          <p className="text-sm leading-relaxed max-w-md">
            We acknowledge the diverse Kenyan communities and cultural heritage
            across the nation — the people, languages, and traditions that shape
            where we live, learn, and work.
          </p>
        </div>

        {/* Right Column */}
        <div>
          <h4 className="text-sm font-bold tracking-wider mb-4">
            GET THE KBC LISTEN NEWSLETTER
          </h4>

          <form onSubmit={handleSubscribe} className="w-full">
            <label htmlFor="email" className="sr-only">
              Email address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              placeholder="Enter your email address"
              className="w-full bg-[#1f2327] text-gray-300 px-4 py-3 rounded-md mb-4 outline-none"
            />
            <button
              type="submit"
              className="w-full bg-[#ff2d55] py-3 rounded-md text-white text-sm font-semibold"
            >
              SUBSCRIBE
            </button>
          </form>

          <p className="text-xs mt-3 opacity-70 leading-relaxed">
            Grab our Monthly Newsletter and stay tuned.
          </p>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700 mt-10 pt-6 flex flex-col md:flex-row md:items-center md:justify-between text-xs opacity-80 gap-4">
        
        {/* Footer Links */}
        <div className="flex flex-wrap gap-4">
          <a className="hover:underline" href="#">Editorial Policies</a>
          <a className="hover:underline" href="#">Accessibility</a>
          <a className="hover:underline" href="#">Help</a>
          <a className="hover:underline" href="#">Contact Us</a>
          <a className="hover:underline" href="#">About KBC</a>
          <a className="hover:underline" href="#">Privacy Policy</a>
          <a className="hover:underline" href="#">Terms of Use</a>
        </div>

        {/* Social Icons (react-icons) */}
        <div className="flex gap-4 text-xl">

          {/* Facebook */}
          <a
            href="#"
            aria-label="Facebook"
            className="p-2 rounded-full bg-[#3b3f41] text-white hover:bg-[#4267B2] transition-colors"
          >
            <FaFacebookF />
          </a>

          {/* Twitter / X */}
          <a
            href="#"
            aria-label="Twitter"
            className="p-2 rounded-full bg-[#3b3f41] text-white hover:bg-black transition-colors"
          >
            <FaTwitter />
          </a>

          {/* Instagram */}
          <a
            href="#"
            aria-label="Instagram"
            className="p-2 rounded-full bg-[#3b3f41] text-white hover:text-pink-500 hover:bg-white transition-colors"
          >
            <FaInstagram />
          </a>

          {/* TikTok */}
          <a
            href="#"
            aria-label="TikTok"
            className="p-2 rounded-full bg-[#3b3f41] text-white hover:bg-black transition-colors"
          >
            <SiTiktok />
          </a>

          {/* YouTube */}
          <a
            href="#"
            aria-label="YouTube"
            className="p-2 rounded-full bg-[#3b3f41] text-white hover:bg-[#FF0000] transition-colors"
          >
            <FaYoutube />
          </a>

        </div>
      </div>

      <p className="text-center text-xs opacity-60 mt-6">
        © 2025 KENYA BROADCASTING CORPORATION - KBC LISTEN
      </p>
    </footer>
  );
}
