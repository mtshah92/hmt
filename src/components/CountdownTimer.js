const CountdownTimer = ({ daysLeft }) => {
  return (
    <div className="bg-gradient-to-br from-orange-50 to-yellow-50 rounded-lg p-6 border border-orange-300 text-center">
      <div className="text-6xl md:text-7xl font-bold text-orange-600 mb-3">
        {daysLeft}
      </div>
      <div
        className="text-xl md:text-2xl font-semibold text-orange-700"
        style={{
          fontFamily:
            "AMS Pankhuri Gujarati Calligraphy, Noto Serif Gujarati, serif",
          letterSpacing: "0.8px",
          textShadow: "1px 1px 3px rgba(0,0,0,0.2)",
          fontWeight: "600",
        }}
      >
        {daysLeft === 1 ? "દિવસ શેષ" : "દિવસો શેષ"}
      </div>
      <div className="text-sm text-gray-600 mt-1">
        {daysLeft === 1 ? "day remaining" : "days remaining"}
      </div>
    </div>
  );
};

export default CountdownTimer;
