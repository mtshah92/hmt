const Header = () => {
  return (
    <header className="bg-gradient-to-r from-orange-500 to-yellow-500 text-white py-4 shadow-lg">
      <div className="container mx-auto text-center">
        <h1
          className="text-2xl md:text-3xl font-bold tracking-wide"
          style={{
            fontFamily:
              "AMS Pankhuri Gujarati Calligraphy, Noto Serif Gujarati, serif",
            letterSpacing: "2px",
            textShadow: "3px 3px 6px rgba(0,0,0,0.4)",
            background: "linear-gradient(45deg, #fff, #fef3c7, #fed7aa)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            filter: "drop-shadow(2px 2px 4px rgba(0,0,0,0.6))",
            fontWeight: "700",
          }}
        >
          શ્રી 1008 શાંતિનાથ ભગવાન
        </h1>
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
          પંચ કલ્યાણક મહોત્સવ - હિમતનગર
        </h2>
        <p className="text-sm mt-1 opacity-90 font-medium">
          Shri 1008 Shantinath Bhagwan Panch Kalyanak Mahotsav - Himatnagar
        </p>
      </div>
    </header>
  );
};

export default Header;
