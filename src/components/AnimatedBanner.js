"use client";
import { useEffect, useState } from "react";
import Image from "next/image";

// const AnimatedBanner = () => {
//   return (
//     <section className="w-full bg-gradient-to-r from-yellow-50 to-white py-8">
//       <div className="max-w-7xl mx-auto flex flex-col items-center">
//         {/* Top Title */}
//         <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-6 text-center">
//           શ્રી 1008 શાંતિનાથ ભગવાન પંચ કલ્યાણક મહોત્સવ
//         </h2>

//         {/* Three Images Row like emblem */}
//         <div className="flex items-end justify-center gap-8">
//           {/* Left image */}
//           <Image
//             src="/banner/songadh_pratikruti.png"
//             alt="Songadh Pratikruti"
//             width={500}
//             height={250}
//             className="object-contain"
//             priority
//           />

//           {/* Middle image (pillar) */}
//           <Image
//             src="/banner/manstambh.png"
//             alt="Manstambh"
//             width={120}
//             height={300}
//             className="object-contain"
//             priority
//           />

//           {/* Right image */}
//           <Image
//             src="/banner/hmt_mandir.png"
//             alt="HMT Mandir"
//             width={200}
//             height={250}
//             className="object-contain"
//             priority
//           />
//         </div>

//         {/* Bottom Event Info */}
//         <p className="mt-6 text-lg sm:text-xl text-center font-semibold text-red-700">
//           મહાવીરનગર - હિમતનગર - ગુજરાત <br />
//           ૨૭-૦૧-૨૦૨૬ થી ૦૧-૦૨-૨૦૨૬
//         </p>
//       </div>
//     </section>
//   );
// };

// export default AnimatedBanner;

// /const AnimatedBanner = () => {
//   const [scrollY, setScrollY] = useState(0);
//   const [isVisible, setIsVisible] = useState(false);
//   const [activeImage, setActiveImage] = useState(0);
//   const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
//   const bannerRef = useRef(null);

//   // Your three images
//   const images = [
//     "/banner/songadh_pratikruti.png",
//     "/banner/manstambh.png",
//     "/banner/hmt_mandir.png",
//   ];

//   useEffect(() => {
//     setIsVisible(true);

//     const handleScroll = () => setScrollY(window.scrollY);

//     const handleMouseMove = (e) => {
//       if (!bannerRef.current) return;
//       const rect = bannerRef.current.getBoundingClientRect();
//       setMousePosition({
//         x: (e.clientX - rect.left) / rect.width - 0.5,
//         y: (e.clientY - rect.top) / rect.height - 0.5,
//       });
//     };

//     // Auto-slide images every 6 seconds (mobile)
//     const imageInterval = setInterval(() => {
//       setActiveImage((prev) => (prev + 1) % images.length);
//     }, 6000);

//     window.addEventListener("scroll", handleScroll);
//     if (bannerRef.current) {
//       bannerRef.current.addEventListener("mousemove", handleMouseMove);
//     }

//     return () => {
//       window.removeEventListener("scroll", handleScroll);
//       if (bannerRef.current) {
//         bannerRef.current.removeEventListener("mousemove", handleMouseMove);
//       }
//       clearInterval(imageInterval);
//     };
//   }, []);

//   const calculateParallax = (factor) => scrollY * factor;

//   const calculateMouseParallax = (factorX, factorY) => ({
//     x: mousePosition.x * factorX,
//     y: mousePosition.y * factorY,
//   });

//   return (
//     <section
//       ref={bannerRef}
//       className="relative h-[350px] md:h-[450px] overflow-hidden"
//     >
//       {/* Mobile: Crossfade slideshow */}
//       <div className="md:hidden absolute inset-0 z-10">
//         {images.map((src, index) => (
//           <div
//             key={src}
//             className="absolute inset-0 transition-opacity duration-1500 ease-in-out"
//             style={{
//               opacity: activeImage === index ? 1 : 0,
//             }}
//           >
//             <Image
//               src={src}
//               alt={`Banner image ${index + 1}`}
//               fill
//               style={{
//                 objectFit: "cover",
//                 transform: `scale(1.1) translateY(${index === 1 ? -20 : 0}px)`,
//               }}
//               priority
//             />
//             <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
//           </div>
//         ))}
//       </div>

//       {/* Desktop: 3 split panels */}
//       <div className="hidden md:grid grid-cols-3 absolute inset-0 z-10">
//         {images.map((src, index) => (
//           <div key={index} className="relative overflow-hidden">
//             <Image
//               src={src}
//               alt={`Banner image ${index + 1}`}
//               fill
//               style={{
//                 objectFit: "cover",
//                 transform: `scale(1.1) translate(${
//                   calculateMouseParallax(15, 0).x
//                 }px, ${calculateParallax(0.05)}px)`,
//               }}
//               className={
//                 index === 1
//                   ? "rounded-full shadow-2xl border-4 border-yellow-400"
//                   : "rounded-2xl shadow-lg"
//               }
//               priority
//             />
//           </div>
//         ))}
//       </div>

//       {/* Overlay */}
//       <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent z-20" />

//       {/* Center text */}
//       <div className="relative h-full flex flex-col items-center justify-center text-white px-4 z-30">
//         <div
//           className={`text-center transition-all duration-1000 ${
//             isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
//           }`}
//           style={{
//             transform: `translateY(${calculateParallax(-0.2)}px)`,
//           }}
//         >
//           <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-2 md:mb-4">
//             શ્રી 1008 શાંતિનાથ ભગવાન પંચ કલ્યાણક મહોત્સવ
//           </h2>
//           <p className="text-sm sm:text-lg md:text-xl max-w-2xl mx-auto">
//             Join us for this auspicious celebration honoring Shantinath Bhagwan
//           </p>

//           {/* Mobile indicators */}
//           <div className="flex gap-2 mt-4 md:hidden justify-center">
//             {images.map((_, index) => (
//               <button
//                 key={index}
//                 className={`w-2 h-2 rounded-full transition-all ${
//                   activeImage === index ? "bg-white scale-110" : "bg-white/50"
//                 }`}
//                 onClick={() => setActiveImage(index)}
//                 aria-label={`View image ${index + 1}`}
//               />
//             ))}
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default AnimatedBanner;

const AnimatedBanner = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [particles, setParticles] = useState([]);
  const [shapes, setShapes] = useState([]);

  useEffect(() => {
    setIsVisible(true);

    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };

    // Generate random particles only on client side
    const generatedParticles = [...Array(20)].map((_, i) => ({
      id: i,
      width: Math.random() * 3 + 1,
      height: Math.random() * 3 + 1,
      left: Math.random() * 100,
      top: Math.random() * 100,
      duration: Math.random() * 20 + 15,
      delay: Math.random() * 5,
    }));
    setParticles(generatedParticles);

    // Generate random shapes only on client side
    const generatedShapes = [...Array(6)].map((_, i) => ({
      id: i,
      width: Math.random() * 20 + 10,
      height: Math.random() * 20 + 10,
      left: Math.random() * 100,
      top: Math.random() * 100,
      rotation: Math.random() * 360,
      duration: Math.random() * 25 + 20,
      delay: Math.random() * 8,
      borderRadius: i % 2 === 0 ? '50%' : '4px',
    }));
    setShapes(generatedShapes);

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section className="relative w-full h-[350px] md:h-[420px] overflow-hidden">
      {/* Modern gradient background - more sophisticated */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-amber-900 to-orange-900"></div>
      
      {/* Subtle animated gradient overlay */}
      <div
        className="absolute inset-0 opacity-20 transition-opacity duration-1000"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(255, 215, 0, 0.15), transparent 70%)`,
        }}
      ></div>

      {/* Elegant pattern overlay - subtle */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(45deg,transparent_48%,rgba(255,255,255,0.1)_49%,rgba(255,255,255,0.1)_51%,transparent_52%)] bg-[length:60px_60px]"></div>
      </div>

      {/* Subtle light effect */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-amber-500/20 to-transparent"></div>
      </div>

      {/* Rich floating particles and decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="absolute rounded-full bg-amber-300/25 blur-[2px]"
            style={{
              width: `${particle.width}px`,
              height: `${particle.height}px`,
              left: `${particle.left}%`,
              top: `${particle.top}%`,
              animation: `float ${particle.duration}s infinite ease-in-out`,
              animationDelay: `${particle.delay}s`,
            }}
          ></div>
        ))}
        {/* Decorative geometric shapes */}
        {shapes.map((shape) => (
          <div
            key={shape.id}
            className="absolute border border-amber-400/20"
            style={{
              width: `${shape.width}px`,
              height: `${shape.height}px`,
              left: `${shape.left}%`,
              top: `${shape.top}%`,
              transform: `rotate(${shape.rotation}deg)`,
              animation: `float ${shape.duration}s infinite ease-in-out`,
              animationDelay: `${shape.delay}s`,
              borderRadius: shape.borderRadius,
            }}
          ></div>
        ))}
      </div>

      {/* Decorative side patterns */}
      <div className="absolute left-4 top-1/2 transform -translate-y-1/2 hidden md:block z-5">
        <div className="flex flex-col gap-3 items-center">
          <div className="w-0.5 h-16 bg-gradient-to-b from-transparent via-amber-400/50 to-transparent"></div>
          <div className="w-2 h-2 rounded-full bg-amber-400/40 border border-amber-300/30"></div>
          <div className="w-0.5 h-16 bg-gradient-to-b from-transparent via-amber-400/50 to-transparent"></div>
          <div className="w-1 h-1 rounded-full bg-amber-300/30"></div>
          <div className="w-0.5 h-12 bg-gradient-to-b from-transparent via-amber-400/40 to-transparent"></div>
        </div>
      </div>
      <div className="absolute right-4 top-1/2 transform -translate-y-1/2 hidden md:block z-5">
        <div className="flex flex-col gap-3 items-center">
          <div className="w-0.5 h-16 bg-gradient-to-b from-transparent via-amber-400/50 to-transparent"></div>
          <div className="w-2 h-2 rounded-full bg-amber-400/40 border border-amber-300/30"></div>
          <div className="w-0.5 h-16 bg-gradient-to-b from-transparent via-amber-400/50 to-transparent"></div>
          <div className="w-1 h-1 rounded-full bg-amber-300/30"></div>
          <div className="w-0.5 h-12 bg-gradient-to-b from-transparent via-amber-400/40 to-transparent"></div>
        </div>
      </div>

      {/* Top and bottom decorative elements */}
      <div className="absolute top-12 left-1/2 transform -translate-x-1/2 hidden md:flex gap-8 z-5">
        <div className="w-1 h-1 rounded-full bg-amber-400/50"></div>
        <div className="w-16 h-px bg-gradient-to-r from-transparent via-amber-400/40 to-transparent"></div>
        <div className="w-1 h-1 rounded-full bg-amber-400/50"></div>
        <div className="w-16 h-px bg-gradient-to-r from-transparent via-amber-400/40 to-transparent"></div>
        <div className="w-1 h-1 rounded-full bg-amber-400/50"></div>
      </div>
      <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 hidden md:flex gap-8 z-5">
        <div className="w-1 h-1 rounded-full bg-amber-400/50"></div>
        <div className="w-16 h-px bg-gradient-to-r from-transparent via-amber-400/40 to-transparent"></div>
        <div className="w-1 h-1 rounded-full bg-amber-400/50"></div>
        <div className="w-16 h-px bg-gradient-to-r from-transparent via-amber-400/40 to-transparent"></div>
        <div className="w-1 h-1 rounded-full bg-amber-400/50"></div>
      </div>

      {/* Modern elegant borders - thin and refined */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-amber-400/60 to-transparent"></div>
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-amber-400/60 to-transparent"></div>
      <div className="absolute top-0 bottom-0 left-0 w-[1px] bg-gradient-to-b from-transparent via-amber-400/60 to-transparent"></div>
      <div className="absolute top-0 bottom-0 right-0 w-[1px] bg-gradient-to-b from-transparent via-amber-400/60 to-transparent"></div>

      {/* Enhanced corner accents with decorative elements */}
      <div className="absolute top-4 left-4 w-16 h-16 border-l-2 border-t-2 border-amber-400/50">
        <div className="absolute top-1 left-1 w-2 h-2 border-l border-t border-amber-300/40"></div>
      </div>
      <div className="absolute top-4 right-4 w-16 h-16 border-r-2 border-t-2 border-amber-400/50">
        <div className="absolute top-1 right-1 w-2 h-2 border-r border-t border-amber-300/40"></div>
      </div>
      <div className="absolute bottom-4 left-4 w-16 h-16 border-l-2 border-b-2 border-amber-400/50">
        <div className="absolute bottom-1 left-1 w-2 h-2 border-l border-b border-amber-300/40"></div>
      </div>
      <div className="absolute bottom-4 right-4 w-16 h-16 border-r-2 border-b-2 border-amber-400/50">
        <div className="absolute bottom-1 right-1 w-2 h-2 border-r border-b border-amber-300/40"></div>
      </div>

      {/* Additional corner decorative dots */}
      <div className="absolute top-8 left-8 w-1.5 h-1.5 rounded-full bg-amber-400/40"></div>
      <div className="absolute top-8 right-8 w-1.5 h-1.5 rounded-full bg-amber-400/40"></div>
      <div className="absolute bottom-8 left-8 w-1.5 h-1.5 rounded-full bg-amber-400/40"></div>
      <div className="absolute bottom-8 right-8 w-1.5 h-1.5 rounded-full bg-amber-400/40"></div>

      {/* Center content with Pratistha Logo */}
      <div className="relative h-full flex flex-col items-center justify-center px-4 z-10">
        <div
          className={`transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-10 scale-95"
          }`}
        >
          {/* Pratistha Logo - Main Visual Element */}
          <div className="relative w-full max-w-[600px] md:max-w-[700px] lg:max-w-[800px] mx-auto">
            <Image
              src="/Pratistha_logo.png"
              alt="Shri Shantinath Digambar Jinbimb Panchkalyanak Pratishtha Mahotsav"
              width={800}
              height={800}
              className="w-full h-auto object-contain drop-shadow-2xl"
              priority
              style={{
                filter: 'drop-shadow(0 10px 30px rgba(0, 0, 0, 0.5))',
              }}
            />
          </div>
        </div>
      </div>

      {/* Add custom animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0) translateX(0);
            opacity: 0.5;
          }
          25% {
            transform: translateY(-20px) translateX(10px);
            opacity: 0.8;
          }
          50% {
            transform: translateY(-10px) translateX(-10px);
            opacity: 0.6;
          }
          75% {
            transform: translateY(-30px) translateX(5px);
            opacity: 0.9;
          }
        }
      `}</style>
    </section>
  );
};

export default AnimatedBanner;
