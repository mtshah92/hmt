import Link from "next/link";

const Header = () => {
  return (
    <header className="bg-gradient-to-r from-orange-500 to-yellow-500 text-white py-4 shadow-lg">
      <div className="container mx-auto text-center">
        {/* <Link href="/"> */}
        <h1
          className="text-2xl md:text-3xl font-bold tracking-wide"
          style={{
            fontFamily:
              "AMS Pankhuri Gujarati Calligraphy, Noto Serif Gujarati, serif",
            letterSpacing: "2px",
            textShadow: "3px 3px 6px rgba(0,0,0,0.4)",
            color: "#fef3c7",
            textShadow: "2px 2px 4px rgba(0,0,0,0.3)",
            fontWeight: "700",
          }}
        >
          શ્રી 1008 શાંતિનાથ ભગવાન
        </h1>
        {/* </Link> */}
        <h2
          className="text-lg md:text-xl font-semibold mt-2"
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

        <nav className="mt-4">
          <ul className="flex justify-center space-x-6">
            <li>
              <Link
                href="/"
                className="text-white hover:text-yellow-200 transition-colors"
              >
                Home
              </Link>
            </li>
            {/* <li>
              <Link
                href="/gallery"
                className="text-white hover:text-yellow-200 transition-colors"
              >
                Photos
              </Link>
            </li> */}
            <li>
              <Link
                href="/videos"
                className="text-white hover:text-yellow-200 transition-colors"
              >
                Videos
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
