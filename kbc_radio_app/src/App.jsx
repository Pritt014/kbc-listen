import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Podcasts from "./pages/podcasts/index.jsx";
import EpisodeDetail from "./pages/podcasts/[slug].jsx";
import PodcastCategory from "./pages/podcasts/category.jsx";
import Radio from "./pages/radio/Radio.jsx";
import StationDetails from "./pages/radio/StationDetails.jsx";
import ScrollToTop from "./components/ScrollToTop.jsx"; // ✅ THIS WAS MISSING

function App() {
  return (
    <>
      <ScrollToTop />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/podcasts" element={<Podcasts />} />

        <Route
          path="/podcasts/category/:categorySlug"
          element={<PodcastCategory />}
        />

        <Route path="/podcasts/:slug" element={<EpisodeDetail />} />

        <Route path="/radio" element={<Radio />} />
        <Route path="/radio/:id" element={<StationDetails />} />
      </Routes>
    </>
  );
}

export default App;