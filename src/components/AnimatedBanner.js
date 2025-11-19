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

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="relative w-full h-[350px] md:h-[420px] lg:h-[480px] overflow-hidden">
      {/* Rich multi-layer gradient background - Golden theme */}
      <div className="absolute inset-0 bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50"></div>
      
      {/* Secondary gradient layer */}
      <div className="absolute inset-0 bg-gradient-to-t from-orange-100/60 via-amber-50/40 to-transparent"></div>
      
      {/* Radial gradient from center for depth */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-amber-100/40 via-orange-50/20 to-transparent"></div>
      
      {/* Top radial gradient for light source effect */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_0%,_var(--tw-gradient-stops))] from-yellow-100/50 via-amber-50/30 to-transparent"></div>
      
      {/* Animated gradient overlay */}
      <div className="absolute inset-0 opacity-25 bg-[radial-gradient(circle_at_50%_50%,rgba(255,193,7,0.2),rgba(255,152,0,0.12),transparent_70%)]"></div>

      {/* Elegant diagonal pattern overlay with more visibility */}
      <div className="absolute inset-0 opacity-[0.06]">
        <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(45deg,transparent_47%,rgba(255,255,255,0.2)_48%,rgba(255,255,255,0.2)_52%,transparent_53%)] bg-[length:100px_100px]"></div>
      </div>

      {/* Subtle dot pattern texture */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(0,0,0,0.1)_1px,transparent_1px)] bg-[length:50px_50px]"></div>
      </div>

      {/* Enhanced light rays effect */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-amber-200/25 to-transparent"></div>
        <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-orange-300/25 to-transparent"></div>
        <div className="absolute top-0 right-1/4 w-px h-full bg-gradient-to-b from-transparent via-orange-300/25 to-transparent"></div>
        <div className="absolute top-0 left-1/2 w-px h-full bg-gradient-to-b from-transparent via-amber-200/20 to-transparent"></div>
      </div>

      {/* Enhanced decorative circular gradient orbs with more depth */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-gradient-to-br from-amber-200/25 via-orange-200/20 to-transparent rounded-full blur-3xl -translate-x-1/3 -translate-y-1/3"></div>
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-gradient-to-tl from-orange-200/25 via-amber-200/20 to-transparent rounded-full blur-3xl translate-x-1/3 translate-y-1/3"></div>
      <div className="absolute top-1/2 left-1/2 w-[400px] h-[400px] bg-gradient-to-br from-yellow-100/20 via-amber-100/15 to-transparent rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute top-1/4 right-1/4 w-[300px] h-[300px] bg-gradient-to-br from-amber-100/15 to-transparent rounded-full blur-2xl"></div>
      <div className="absolute bottom-1/4 left-1/4 w-[350px] h-[350px] bg-gradient-to-tr from-orange-100/15 to-transparent rounded-full blur-2xl"></div>

      {/* Subtle wave pattern overlay */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="absolute top-0 left-0 w-full h-full" style={{
          backgroundImage: `repeating-linear-gradient(
            0deg,
            transparent,
            transparent 2px,
            rgba(255,255,255,0.1) 2px,
            rgba(255,255,255,0.1) 4px
          )`,
        }}></div>
      </div>

      {/* Textured overlay patterns */}
      <div className="absolute inset-0 opacity-[0.08] z-5">
        {/* Traditional fabric texture */}
        <div className="absolute inset-0" style={{
          backgroundImage: `repeating-linear-gradient(
            45deg,
            transparent,
            transparent 10px,
            rgba(184, 78, 16, 0.03) 10px,
            rgba(184, 78, 16, 0.03) 11px
          ),
          repeating-linear-gradient(
            -45deg,
            transparent,
            transparent 10px,
            rgba(184, 78, 16, 0.03) 10px,
            rgba(184, 78, 16, 0.03) 11px
          )`
        }}></div>
      </div>

      {/* Subtle paper texture */}
      <div className="absolute inset-0 opacity-[0.04] z-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23b84e10' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
      </div>

      {/* Grain texture for depth */}
      <div className="absolute inset-0 opacity-[0.03] z-5 pointer-events-none">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(184, 78, 16, 0.15) 1px, transparent 0)`,
          backgroundSize: '20px 20px'
        }}></div>
      </div>


      {/* Additional floating light orbs */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-amber-200/20 to-transparent rounded-full blur-2xl animate-pulse" style={{ animationDuration: '4s' }}></div>
      <div className="absolute bottom-20 right-10 w-40 h-40 bg-gradient-to-tl from-orange-200/20 to-transparent rounded-full blur-2xl animate-pulse" style={{ animationDuration: '5s', animationDelay: '1s' }}></div>
      <div className="absolute top-1/2 right-20 w-28 h-28 bg-gradient-to-br from-yellow-200/15 to-transparent rounded-full blur-xl animate-pulse" style={{ animationDuration: '6s', animationDelay: '2s' }}></div>



      {/* Songadh Pratikruti - Left Side (Bottom Left) - Much Bigger */}
      <div className="absolute left-1 md:left-4 lg:left-6 bottom-2 md:bottom-6 lg:bottom-8 z-20">
        <div className="relative group">
          {/* Glow effect - Golden */}
          <div className="absolute inset-0 bg-gradient-to-r from-amber-400/15 via-orange-400/10 to-amber-400/15 blur-2xl group-hover:blur-3xl group-hover:bg-amber-400/25 transition-all duration-500 -z-10 scale-110"></div>
          
          {/* Image container with elegant styling - Much Bigger, Responsive for Mobile */}
          <div className="relative w-36 h-auto sm:w-40 sm:h-auto md:w-72 lg:w-96 xl:w-[28rem] 2xl:w-[32rem] transition-all duration-500 group-hover:scale-105">
            <Image
              src="/songadh_pratikruti.png"
              alt="Songadh Pratikruti"
              width={224}
              height={300}
              className="w-full h-auto object-contain drop-shadow-2xl"
              style={{
                filter: 'drop-shadow(0 8px 24px rgba(0, 0, 0, 0.3)) drop-shadow(0 0 15px rgba(99, 102, 241, 0.2))',
              }}
              priority
            />
            
            {/* Subtle shine overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer pointer-events-none"></div>
          </div>
        </div>
      </div>

      {/* Kund Kund Acharya - Left Side (Top Left on Mobile) */}
      <div className="absolute left-2 md:left-4 top-2 md:top-4 z-20">
        <div className="relative group">
          {/* Background circle for contrast */}
          <div className="absolute inset-0 bg-white/90 rounded-full shadow-[0_0_20px_rgba(0,0,0,0.3)] -z-20 scale-125"></div>
          
          {/* Enhanced glow effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-amber-400/30 via-orange-400/25 to-amber-400/30 rounded-full blur-xl group-hover:blur-2xl group-hover:bg-amber-400/40 transition-all duration-500 -z-10 scale-110"></div>
          
          {/* Outer glow ring - More visible */}
          <div className="absolute inset-0 rounded-full border-[3px] border-amber-500/50 shadow-[0_0_20px_rgba(255,193,7,0.4)] group-hover:shadow-[0_0_30px_rgba(255,193,7,0.5)] transition-all duration-500 -z-10 scale-105"></div>
          
          {/* Circular image container - Same size as Gurudev with stronger border */}
          <div className="relative w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 lg:w-20 lg:h-20 rounded-full overflow-hidden border-[3px] border-amber-600/80 bg-white/10 shadow-[0_0_15px_rgba(255,193,7,0.4),0_0_25px_rgba(255,152,0,0.3),0_4px_15px_rgba(0,0,0,0.4)] group-hover:border-amber-500/90 group-hover:shadow-[0_0_20px_rgba(255,193,7,0.5),0_0_35px_rgba(255,152,0,0.4),0_6px_20px_rgba(0,0,0,0.5)] transition-all duration-500 group-hover:scale-105">
            <Image
              src="/kund_kund_acharya.png"
              alt="Kund Kund Acharya"
              width={128}
              height={128}
              className="w-full h-full object-cover brightness-110 contrast-110"
              style={{
                filter: 'brightness(1.1) contrast(1.1) saturate(1.1)',
              }}
              priority
            />
            
            {/* Shine overlay effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/30 via-transparent to-transparent rounded-full pointer-events-none"></div>
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-white/30 rounded-full animate-shine pointer-events-none"></div>
          </div>
          
          {/* Decorative rings */}
          <div className="absolute inset-0 rounded-full border-2 border-amber-200/30 pointer-events-none"></div>
          <div className="absolute inset-[-2px] rounded-full border border-amber-300/20 pointer-events-none"></div>
        </div>
      </div>

      {/* Gurudev - Top Right - Smaller */}
      <div className="absolute right-2 md:right-4 top-2 md:top-4 z-20">
        <div className="relative group">
          {/* Background circle for contrast */}
          <div className="absolute inset-0 bg-white/90 rounded-full shadow-[0_0_20px_rgba(0,0,0,0.3)] -z-20 scale-125"></div>
          
          {/* Enhanced glow effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-amber-400/30 via-orange-400/25 to-amber-400/30 rounded-full blur-xl group-hover:blur-2xl group-hover:bg-amber-400/40 transition-all duration-500 -z-10 scale-110"></div>
          
          {/* Outer glow ring - More visible */}
          <div className="absolute inset-0 rounded-full border-3 border-amber-500/50 shadow-[0_0_20px_rgba(255,193,7,0.4)] group-hover:shadow-[0_0_30px_rgba(255,193,7,0.5)] transition-all duration-500 -z-10 scale-105"></div>
          
          {/* Circular image container - Smaller with stronger border */}
          <div className="relative w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 lg:w-20 lg:h-20 rounded-full overflow-hidden border-3 border-amber-600/80 bg-white/10 shadow-[0_0_15px_rgba(255,193,7,0.4),0_0_25px_rgba(255,152,0,0.3),0_4px_15px_rgba(0,0,0,0.4)] group-hover:border-amber-500/90 group-hover:shadow-[0_0_20px_rgba(255,193,7,0.5),0_0_35px_rgba(255,152,0,0.4),0_6px_20px_rgba(0,0,0,0.5)] transition-all duration-500 group-hover:scale-105">
            <Image
              src="/gurudev.png"
              alt="Gurudev"
              width={128}
              height={128}
              className="w-full h-full object-cover brightness-110 contrast-110"
              style={{
                transform: 'scaleX(-1)',
                filter: 'brightness(1.1) contrast(1.1) saturate(1.1)',
              }}
              priority
            />
            
            {/* Shine overlay effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/30 via-transparent to-transparent rounded-full pointer-events-none"></div>
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-white/30 rounded-full animate-shine pointer-events-none"></div>
      </div>

          {/* Decorative rings */}
          <div className="absolute inset-0 rounded-full border-2 border-amber-200/30 pointer-events-none"></div>
          <div className="absolute inset-[-2px] rounded-full border border-amber-300/20 pointer-events-none"></div>
        </div>
      </div>

      {/* Manstambh - Right Side (Bottom Right) - Much Bigger - No Background */}
      <div className="absolute right-1 md:right-4 lg:right-6 bottom-2 md:bottom-6 lg:bottom-8 z-20">
        <div className="relative group">
          {/* Image container - Much Bigger - No background glow, Responsive for Mobile */}
          <div className="relative w-28 h-auto sm:w-32 sm:h-auto md:w-56 md:h-auto lg:w-64 lg:h-auto xl:w-72 xl:h-auto 2xl:w-80 2xl:h-auto transition-all duration-500 group-hover:scale-105">
            <Image
              src="/manstambh.png"
              alt="Manstambh"
              width={112}
              height={224}
              className="w-full h-full object-contain drop-shadow-2xl"
              style={{
                filter: 'drop-shadow(0 8px 20px rgba(0, 0, 0, 0.3))',
              }}
              priority
            />
      </div>
      </div>
      </div>

      {/* Center content with Pratitstha Title - Moved Up */}
      <div className="relative h-full flex flex-col items-center justify-center px-4 md:px-8 lg:px-12 z-10" style={{ transform: 'translateY(-20px)' }}>
        <div
          className={`w-full max-w-6xl mx-auto transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-10 scale-95"
          }`}
        >
          {/* Pratitstha Title - Centered with attractive styling */}
          <div className="relative w-full flex justify-center">
            <div className="relative w-full max-w-[90%] sm:max-w-[80%] md:max-w-[75%] lg:max-w-[70%] xl:max-w-[65%]">
              {/* Glow effect behind title - Golden */}
              <div className="absolute inset-0 bg-gradient-to-r from-amber-300/15 via-orange-300/12 to-amber-300/15 blur-3xl rounded-lg -z-10 transform scale-110"></div>
              
              {/* Title Image */}
              <div className="relative">
            <Image
                  src="/pratitstha_title.png"
                  alt="Panchakalyanak Pratishtha Mahotsav"
                  width={1200}
                  height={300}
              className="w-full h-auto object-contain drop-shadow-2xl"
              priority
              style={{
                    filter: 'drop-shadow(0 8px 32px rgba(0, 0, 0, 0.4)) drop-shadow(0 0 12px rgba(255, 193, 7, 0.15))',
                  }}
                />
                
                {/* Subtle shimmer effect overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer pointer-events-none"></div>
              </div>
              
              {/* Date and Location Text in Gujarati */}
              <div className="mt-4 md:mt-6 text-center space-y-3">
                {/* Date Text with enhanced styling */}
                <div className="relative block">
                  {/* Background glow - Golden */}
                  <div className="absolute inset-0 bg-gradient-to-r from-amber-400/10 via-orange-400/10 to-amber-400/10 blur-xl rounded-lg -z-10 scale-110"></div>
                  
                  {/* Text with gradient - Golden */}
                  <div 
                    className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold px-4 py-2"
                    style={{
                      fontFamily: "AMS Pankhuri Gujarati Calligraphy, Noto Serif Gujarati, serif",
                      background: 'linear-gradient(to right, #92400e, #9a3412, #92400e)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                      textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3), 0 0 8px rgba(255, 193, 7, 0.25), 0 0 15px rgba(255, 152, 0, 0.15)',
                      filter: 'drop-shadow(0 0 4px rgba(255, 193, 7, 0.2))',
                    }}
                  >
                    ૨૭-૦૧-૨૦૨૬ થી ૦૧-૦૨-૨૦૨૬
                  </div>
                  
                  {/* Decorative underline - Golden */}
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-3/4 h-1 bg-gradient-to-r from-transparent via-amber-400/30 to-transparent rounded-full"></div>
                </div>
                
                {/* Location Text with enhanced styling */}
                <div className="relative inline-block mt-2">
                  {/* Background glow - Golden */}
                  <div className="absolute inset-0 bg-gradient-to-r from-amber-300/8 via-orange-300/8 to-amber-300/8 blur-lg rounded-lg -z-10 scale-105"></div>
                  
                  {/* Text - Golden */}
                  <div 
                    className="text-base sm:text-lg md:text-xl lg:text-2xl font-semibold text-amber-800 drop-shadow-xl px-3 py-1"
                    style={{
                      fontFamily: "AMS Pankhuri Gujarati Calligraphy, Noto Serif Gujarati, serif",
                      textShadow: '1px 1px 3px rgba(0, 0, 0, 0.25), 0 0 8px rgba(255, 193, 7, 0.2), 0 0 12px rgba(255, 152, 0, 0.1)',
                      filter: 'drop-shadow(0 0 3px rgba(255, 193, 7, 0.15))',
                    }}
                  >
                    મહાવીરનગર-હિંમતનગર-ગુજરાત
                  </div>
                </div>
              </div>
              
            </div>
          </div>
        </div>
      </div>

      {/* Moksha Nimantran - Center Bottom */}
      <div className="absolute bottom-16 sm:bottom-12 md:bottom-6 left-1/2 transform -translate-x-1/2 z-20">
        <div className="relative group">
          {/* Subtle glow effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-amber-400/10 via-orange-400/8 to-amber-400/10 blur-xl group-hover:blur-2xl transition-all duration-500 -z-10 scale-110"></div>
          
          {/* Image container - Smaller on mobile to avoid overlap, larger on desktop */}
          <div className="relative w-32 h-auto sm:w-40 sm:h-auto md:w-64 md:h-auto lg:w-80 lg:h-auto xl:w-96 xl:h-auto 2xl:w-[28rem] 2xl:h-auto transition-all duration-500 group-hover:scale-105">
            <Image
              src="/moksha_nimantran.png"
              alt="Moksha Nimantran"
              width={200}
              height={100}
              className="w-full h-auto object-contain drop-shadow-xl"
              style={{
                filter: 'drop-shadow(0 4px 12px rgba(0, 0, 0, 0.3)) drop-shadow(0 0 8px rgba(255, 193, 7, 0.15))',
              }}
              priority
            />
            
            {/* Subtle shine overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/8 to-transparent animate-shimmer pointer-events-none"></div>
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
        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
        @keyframes shine {
          0% {
            transform: translateX(-100%) translateY(-100%) rotate(45deg);
            opacity: 0;
          }
          50% {
            opacity: 1;
          }
          100% {
            transform: translateX(100%) translateY(100%) rotate(45deg);
            opacity: 0;
          }
        }
        .animate-shimmer {
          animation: shimmer 3s infinite;
        }
        .animate-shine {
          animation: shine 3s infinite;
        }
      `}</style>
    </section>
  );
};

export default AnimatedBanner;
