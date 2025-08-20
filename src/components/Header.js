import Link from "next/link";

const Header = () => {
  return (
    <header className="bg-gradient-to-r from-orange-500 to-yellow-500 text-white py-6 shadow-lg">
      <div className="container mx-auto px-4">
        {/* Desktop Layout */}
        <div className="hidden md:flex items-center justify-between">
          {/* Logo Left */}
          <div className="flex-shrink-0">
            <img
              src="/logo.png"
              alt="Shantinath Bhagwan Logo"
              className="h-20 w-20 object-contain"
            />
          </div>

          {/* Center Text */}
          <div className="text-center flex-1 mx-8">
            <h1
              className="text-3xl lg:text-4xl font-bold tracking-wide"
              style={{
                fontFamily:
                  "AMS Pankhuri Gujarati Calligraphy, Noto Serif Gujarati, serif",
                letterSpacing: "2px",
                textShadow: "2px 2px 4px rgba(0,0,0,0.3)",
                color: "#fef3c7",
                fontWeight: "700",
              }}
            >
              શ્રી 1008 શાંતિનાથ ભગવાન
            </h1>
            <h2
              className="text-xl lg:text-2xl font-semibold mt-2"
              style={{
                fontFamily:
                  "AMS Pankhuri Gujarati Calligraphy, Noto Serif Gujarati, serif",
                letterSpacing: "1.5px",
                textShadow: "2px 2px 4px rgba(0,0,0,0.3)",
                color: "#fef3c7",
                fontWeight: "600",
              }}
            >
              પંચ કલ્યાણક મહોત્સવ - હિંમતનગર
            </h2>
          </div>

          {/* Logo Right (for balance) */}
          <div className="flex-shrink-0">
            <img
              src="/logo.png"
              alt="Shantinath Bhagwan Logo"
              className="h-20 w-20 object-contain"
            />
          </div>
        </div>

        {/* Mobile Layout */}
        <div className="md:hidden">
          {/* Logo and Title Row */}
          <div className="flex items-center justify-center space-x-4 mb-3">
            <img
              src="/logo.png"
              alt="Shantinath Bhagwan Logo"
              className="h-16 w-16 object-contain flex-shrink-0"
            />
            <div className="text-center">
              <h1
                className="text-xl font-bold tracking-wide"
                style={{
                  fontFamily:
                    "AMS Pankhuri Gujarati Calligraphy, Noto Serif Gujarati, serif",
                  letterSpacing: "1px",
                  textShadow: "2px 2px 4px rgba(0,0,0,0.3)",
                  color: "#fef3c7",
                  fontWeight: "700",
                }}
              >
                શ્રી 1008 શાંતિનાથ ભગવાન
              </h1>
            </div>
          </div>

          {/* Subtitle */}
          <div className="text-center">
            <h2
              className="text-lg font-semibold"
              style={{
                fontFamily:
                  "AMS Pankhuri Gujarati Calligraphy, Noto Serif Gujarati, serif",
                letterSpacing: "1px",
                textShadow: "2px 2px 4px rgba(0,0,0,0.3)",
                color: "#fef3c7",
                fontWeight: "600",
              }}
            >
              પંચ કલ્યાણક મહોત્સવ - હિંમતનગર
            </h2>
          </div>
        </div>

        {/* <nav className="mt-6">
          <ul className="flex justify-center space-x-6">
            <li>
              <Link
                href="/"
                className="text-white hover:text-yellow-200 transition-colors"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/gallery"
                className="text-white hover:text-yellow-200 transition-colors"
              >
                Photos
              </Link>
            </li>
            <li>
              <Link
                href="/videos"
                className="text-white hover:text-yellow-200 transition-colors"
              >
                Videos
              </Link>
            </li>
          </ul>
        </nav> */}
      </div>
    </header>
  );
};

export default Header;
