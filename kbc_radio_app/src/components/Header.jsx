import { Link, useLocation, useNavigate } from "react-router-dom";

const navItems = [
  { label: "Home", to: "/", type: "internal" },
  { label: "Radio", to: "/radio", type: "internal" },
  { label: "Podcasts", to: "/podcasts", type: "internal" },
  { label: "News", to: "https://www.kbc.co.ke/", type: "external" },
];

export default function Header() {
  const location = useLocation();
  const navigate = useNavigate();

  // ✅ Force scroll-to-top behavior on logo click
  const handleLogoClick = (e) => {
    e.preventDefault();

    if (location.pathname === "/") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      navigate("/");
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }, 100);
    }
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">

        {/* Left */}
        <div className="flex items-center space-x-6">

          {/* ✅ Logo with hover + forced scroll-to-top */}
          <Link
            to="/"
            onClick={handleLogoClick}
            className="flex items-center space-x-3 transform transition duration-200 hover:scale-105"
          >
            <img
              src="/assets/kbc_logo.png"
              alt="KBC Logo"
              className="h-[64px] w-auto object-contain transition duration-200 hover:brightness-110"
            />
          </Link>

          {/* Nav */}
          <nav className="hidden md:flex items-center space-x-6">
            {navItems.map((item) =>
              item.type === "internal" ? (
                <Link
                  key={item.label}
                  to={item.to}
                  className={`text-sm font-medium transition ${
                    location.pathname.startsWith(item.to) && item.to !== "/"
                      ? "text-kbcBlue font-semibold"
                      : location.pathname === item.to
                      ? "text-kbcBlue font-semibold"
                      : "text-gray-700 hover:text-kbcBlue"
                  }`}
                >
                  {item.label}
                </Link>
              ) : (
                <a
                  key={item.label}
                  href={item.to}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-medium text-gray-700 hover:text-kbcBlue"
                >
                  {item.label}
                </a>
              )
            )}
          </nav>
        </div>

        {/* Right (mobile menu only) */}
        <div className="flex items-center">
          <button className="md:hidden p-2 border rounded">☰</button>
        </div>

      </div>
    </header>
  );
}