// import React, { useState, useEffect, useRef } from "react";
// import { ChevronLeft, ChevronRight } from "lucide-react";
// import PLACEHOLDER_IMG_URL from "../../assets/WaterPurifierImgHeroSection.png";
// const slides = [
//   {
//     title: "Clean Water,",
//     highlight: "Healthy Life.",
//     text: "Advanced purification technologies for home and commercial needs.",
//     img: PLACEHOLDER_IMG_URL,
//   },
//   {
//     title: "Pure Taste,",
//     highlight: "Every Drop.",
//     text: "Enjoy fresh, mineral-rich water that your family will love.",
//     img: PLACEHOLDER_IMG_URL,
//   },
//   {
//     title: "Eco-Friendly,",
//     highlight: "Sustainable Living.",
//     text: "Reduce plastic waste and conserve water with our energy-efficient system.",
//     img: PLACEHOLDER_IMG_URL,
//   },
// ];

// const HeroSection = () => {
//   const [currentSlide, setCurrentSlide] = useState(0);
//   const [direction, setDirection] = useState("next");
//   const prevSlideRef = useRef(0);

//   // Auto-slide every 7 seconds
//   useEffect(() => {
//     const interval = setInterval(() => {
//       goToNextSlide();
//     }, 7000);
//     return () => clearInterval(interval);
//   }, [currentSlide]);

//   const goToNextSlide = () => {
//     setDirection("next");
//     setCurrentSlide((prev) => {
//       prevSlideRef.current = prev;
//       return (prev + 1) % slides.length;
//     });
//   };

//   const goToPrevSlide = () => {
//     setDirection("prev");
//     setCurrentSlide((prev) => {
//       prevSlideRef.current = prev;
//       return (prev - 1 + slides.length) % slides.length;
//     });
//   };

//   const goToSlide = (index) => {
//     if (index === currentSlide) return;
//     setDirection(index > currentSlide ? "next" : "prev");
//     prevSlideRef.current = currentSlide;
//     setCurrentSlide(index);
//   };

//   return (
//     <div className="rp-hero-wrapper">
//       {/* Slides */}
//       <div className="rp-hero-slides">
//         {slides.map((slide, index) => {
//           let className = "rp-hero-slide";
          
//           // Determine the slide's active state and direction for CSS transitions
//           if (index === currentSlide) {
//             className += ` active ${direction}`;
//           } else if (index === prevSlideRef.current) {
//             className += ` prev-slide ${direction}`;
//           }

//           return (
//             <div key={index} className={className}>
//               <div className="rp-hero-top">
//                 <div className="rp-hero-container">
//                   <div className="rp-hero-content">
//                     <h1>
//                       {slide.title}
//                       <br />
//                       <span className="rp-hero-highlight">{slide.highlight}</span>
//                     </h1>
//                     <p>{slide.text}</p>
//                   </div>
//                   <div className="rp-hero-image">
//                     <img 
//                       src={slide.img} 
//                       alt="Water Purifier" 
//                       // Fallback image in case the main image fails
//                       onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/500x550/3385B2/ffffff?text=Image+Missing" }}
//                     />
//                   </div>
//                 </div>
//               </div>

//               {/* Bottom Band */}
//               <div className="rp-hero-bottom-band">
//                 <div className="rp-hero-bottom-band-container">
//                   <button className="rp-hero-btn">Explore Our Products &rarr;</button>
//                 </div>
//               </div>
//             </div>
//           );
//         })}
//       </div>

//       {/* Arrows */}
//       <button className="rp-hero-arrow rp-hero-left-arrow" onClick={goToPrevSlide} aria-label="Previous Slide">
//         <ChevronLeft size={26} />
//       </button>
//       <button className="rp-hero-arrow rp-hero-right-arrow" onClick={goToNextSlide} aria-label="Next Slide">
//         <ChevronRight size={26} />
//       </button>

//       {/* Dots (fixed position, always visible) */}
//       <div className="rp-hero-dots-fixed">
//         {slides.map((_, idx) => (
//           <span
//             key={idx}
//             className={`rp-hero-dot ${idx === currentSlide ? "active" : ""}`}
//             onClick={() => goToSlide(idx)}
//             aria-label={`Go to slide ${idx + 1}`}
//           ></span>
//         ))}
//       </div>

//       {/* Styles - Fully Responsive CSS using VW/VH and clamp() with unique prefixes */}
//       <style>{`
//         /* Import Google Font for Poppins */
//         @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;800&display=swap');

//         .rp-hero-wrapper {
//           width: 100%;
//           /* DECREASED HEIGHT: Base height proportion for desktop (was 55vh) */
//           height: 45vh; 
//           overflow: hidden;
//           position: relative;
//           font-family: 'Poppins', sans-serif;
//           background-color: #f7f9fc;
//         }

//         .rp-hero-slides {
//           position: relative;
//           width: 100%;
//           height: 100%;
//         }

//         .rp-hero-slide {
//           position: absolute;
//           top: 0;
//           width: 100%;
//           height: 100%;
//           opacity: 0;
//           transform: translateX(100%);
//           /* Using a robust transition curve for smooth sliding */
//           transition: all 1s cubic-bezier(0.25, 0.46, 0.45, 0.94);
//           z-index: 1;
//           display: flex;
//           flex-direction: column;
//         }

//         /* Transition Logic */
//         .rp-hero-slide.next.active { opacity: 1; transform: translateX(0); z-index: 3; }
//         .rp-hero-slide.next.prev-slide { opacity: 0; transform: translateX(-100%); z-index: 2; }
//         .rp-hero-slide.prev.active { opacity: 1; transform: translateX(0); z-index: 3; }
//         .rp-hero-slide.prev.prev-slide { opacity: 0; transform: translateX(100%); z-index: 2; }
        
//         /* Base Layout - Using Viewport Units (vw/vh) for all dimensions */
        
//         .rp-hero-top {
//           width: 100%;
//           height: 70%; /* Locked background proportion: 70% blue */
//           background-color: #3385B2; /* Darker blue */
//           display: flex;
//           justify-content: center;
//           align-items: center;
//           flex-grow: 0; 
//           flex-shrink: 0;
//           padding: 3vh 0; /* Proportional vertical padding */
//         }

//         .rp-hero-container {
//           display: flex;
//           justify-content: space-between;
//           align-items: center;
//           /* UPDATED: Use clamp() to ensure the gap scales proportionally but does not become excessively large on wide screens, maintaining proportion. */
//           gap: clamp(20px, 4vw, 50px); 
//           width: 100%;
//           max-width: 1200px;
//           margin: 0 auto;
//            padding: 0 clamp(16px, 4vw, 60px);
//         }

//         .rp-hero-content {
//           flex: 1;
//           text-align: left;
//           align-items: flex-start;
//           display: flex;
//           flex-direction: column;
//           justify-content: center;
//           gap: 1.5vh; /* Proportional vertical gap */
//           color: white;
//         }

//         /* Global Font Size Configuration using clamp() */
//         .rp-hero-content h1 {
//           font-size: clamp(1.8rem, 3.5vw, 3.5rem); 
//           font-weight: 800;
//           margin: 0;
//           line-height: 1.1;
//         }

//         .rp-hero-highlight {
//           display: block;
//           font-size: clamp(1.8rem, 3.5vw, 3.5rem); 
//           font-weight: 800;
//           color: #d5ecfa; /* Light blue for highlight */
//         }

//         .rp-hero-content p {
//           font-size: clamp(0.9rem, 1.2vw, 1.0rem); 
//           color: #e2e2e2;
//           margin: 0;
//         }
//         /* End Global Font Size Configuration */


//         .rp-hero-image {
//           flex: 1;
//           display: flex;
//           justify-content: flex-end;
//           align-items: center;
//         }

//         .rp-hero-image img {
//           /* ADJUSTED SIZE FOR DESKTOP VIEW (38vw -> 30vw) */
//           width: 30vw; 
//           height: auto;
//           position: relative;
//           /* ADJUSTED OFFSET for shorter height (was -7vh) */
//           bottom: -6vh; 
//           filter: drop-shadow(0 0.5vw 1.5vw rgba(0, 0, 0, 0.25)); /* Shadow scales */
//           transition: transform 0.5s ease;
//           z-index: 3;
//         }

//         .rp-hero-bottom-band {
//           height: 30%; /* Locked background proportion: 30% light blue */
//           background: #E7F3FA; /* Lighter blue band */
//           display: flex;
//           justify-content: center;
//           align-items: center;
//           flex-shrink: 0;
//         }

//         .rp-hero-bottom-band-container {
//           width: 100%;
//           max-width: 1200px;
//           margin: 0 auto;
//           display: flex;
//           justify-content: flex-start;
//           padding: 0 4vw; /* Matching horizontal padding from hero-container */
//         }

// .rp-hero-btn {
//   background-color: white;
//   color: #1e72c0;
//   font-weight: 600;
//   padding: clamp(12px, 1.5vh, 18px) clamp(25px, 3vw, 50px);
//   font-size: clamp(0.8rem, 1.2vw, 1rem);
//   border-radius: 50px;
//   border: none;
//   cursor: pointer;
//   transition: all 0.3s ease;
//   box-shadow: 0 0.2vw 0.8vw rgba(0, 0, 0, 0.1);
//   white-space: nowrap;
// }

// .rp-hero-btn:hover {
//   background-color: #f0f0f0;
//   transform: translateY(-0.3vh);
//   box-shadow: 0 0.3vw 1vw rgba(0, 0, 0, 0.15);
// }

//         /* Arrows */
//         .rp-hero-arrow {
//           position: absolute;
//           top: 35%; /* Position adjusted to center in the 70% blue area */
//           transform: translateY(-50%);
//           background-color: rgba(0, 0, 0, 0.1);
//           color: #ffffff;
//           border: 1px solid rgba(255, 255, 255, 0.6);
//           padding: 1.5vh; /* Arrow size scales proportionally */
//           cursor: pointer;
//           border-radius: 50%;
//           z-index: 10;
//           backdrop-filter: blur(4px);
//           transition: all 0.3s ease;
//           display: flex;
//           justify-content: center;
//           align-items: center;
//           opacity: 0.8;
//         }

//         .rp-hero-arrow:hover {
//           background-color: rgba(255, 255, 255, 0.2);
//           border-color: white;
//           opacity: 1;
//         }

//         .rp-hero-left-arrow {
//           left: 2vw; /* Proportional position */
//         }

//         .rp-hero-right-arrow {
//           right: 2vw; /* Proportional position */
//         }

//         /* Dots positioned absolutely */
//         .rp-hero-dots-fixed {
//           position: absolute;
//           bottom: 3vh; /* Proportional bottom position */
//           left: 50%;
//           transform: translateX(-50%);
//           display: flex;
//           justify-content: center;
//           gap: 0.8vw;
//           z-index: 15;
//         }

//         .rp-hero-dot {
//           height: 1vh; /* Dot size scales */
//           width: 1vh; /* Dot size scales */
//           background-color: #bbb;
//           border-radius: 50%;
//           cursor: pointer;
//           transition: all 0.3s ease;
//         }

//         .rp-hero-dot.active {
//           background-color: #0d6efd;
//           transform: scale(1.3);
//         }
        
//         /* ------------------------------------------- */
//         /* MEDIA QUERIES FOR MOBILE OPTIMIZATION */
//         /* ------------------------------------------- */

//         /* Adjustment for medium screens/tablets */
//         @media (max-width: 900px) {
//           .rp-hero-wrapper {
//             /* DECREASED HEIGHT (was 55vh) */
//             height: 45vh; 
//           }
//             .rp-hero-btn {
//     padding: 10px 24px !important;
//     font-size: 0.85rem !important;
//     max-width: 220px !important;
//   }
//         }

//         /* CRITICAL MOBILE ADJUSTMENT: Rebalancing content for small screens */
//         @media (max-width: 600px) {
//           .rp-hero-wrapper {
//             /* DECREASED HEIGHT for mobile (was 40vh) */
//             height: 35vh; 
//           }
//             .rp-hero-btn {
//     padding: 8px 20px !important;
//     font-size: 0.75rem !important;
//     max-width: 180px !important;
//   }
          
//           .rp-hero-container {
//             flex-direction: row;
//             padding: 0 1rem;
//             gap: 0.5rem;
//           }
          
//           .rp-hero-content {
//             /* Give text 65% of the container width */
//             flex: 0 0 65%;
//             max-width: 65%; 
//             gap: 0.5rem;
//           }

//           /* --- FONT SIZE FIXES FOR SMALL SCREENS --- */
//           .rp-hero-content h1,
//           .rp-hero-highlight {
//               /* Reducing the minimum size from 1.8rem to 1.5rem for better scaling on mobile */
//               font-size: clamp(1.5rem, 4.5vw, 2.5rem); 
//           }

//           .rp-hero-content p {
//               /* Reducing the minimum size from 0.9rem to 0.8rem for better scaling on mobile */
//               font-size: clamp(0.8rem, 2vw, 1rem);
//           }
//           /* --- END FONT SIZE FIXES --- */

          
//           .rp-hero-image {
//             /* Give image 35% of the container width */
//             flex: 0 0 35%;
//             justify-content: flex-end; 
//           }
          
//           .rp-hero-image img {
//             width: 100%; 
//             max-width: 160px; 
//             /* ADJUSTED OFFSET for shorter mobile height (was -4vh) */
//             bottom: -3.5vh; 
//           }
          
//           .rp-hero-bottom-band-container {
//             padding: 0 1rem;
//           }

//           .rp-hero-btn {
//             /* Tighter vertical padding for the button on small screens */
//             padding: 0.5rem 1.5rem; 
//             font-size: 0.75rem; 
//           }

//           /* Scale down arrows */
//           .rp-hero-arrow {
//             padding: 0.7rem; 
//           }
//           .rp-hero-arrow svg {
//             width: 20px;
//             height: 20px;
//           }
//               .rp-hero-wrapper {
//     height: 35vh;
//   }
//   .rp-hero-top {
//     height: 70%; /* Adjust top section for small screens */
//   }
//   .rp-hero-bottom-band {
//     height: 30%; /* Adjust bottom band proportionally */
//   }
//         }

//         @media (max-width: 450px) {
//             /* For very small devices, tighten up padding */
//               .rp-hero-container {
//                 padding: 0 0.5rem; 
//               }
//               .rp-hero-image img {
//                 max-width: 140px; /* Adjusted size for smaller phones */
//               }
//               .rp-hero-arrow {
//                 padding: 0.5rem; 
//               }
//               .rp-hero-arrow svg {
//                 width: 16px;
//                 height: 16px;
//               }
//               .rp-hero-btn {
//                 padding: 6px 16px !important;
//                 font-size: 0.7rem !important;
//                 max-width: 150px !important;
//               }
//                 .rp-hero-wrapper {
//                   height: 32vh !important;
//                 }
//                 .rp-hero-top {
//                   height: 58% !important; /* Top section slightly smaller */
//                 }
//                 .rp-hero-bottom-band {
//                   height: 42% !important; /* Bottom section slightly larger */
//                 }
//         }
//       `}</style>
//     </div>
//   );
// };

// export default HeroSection;


import React, { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import PLACEHOLDER_IMG_URL from "../../assets/WaterPurifierImgHeroSection.png";

const slides = [
  {
    title: "Clean Water,",
    highlight: "Healthy Life.",
    text: "Advanced purification technologies for home and commercial needs.",
    img: PLACEHOLDER_IMG_URL,
  },
  {
    title: "Pure Taste,",
    highlight: "Every Drop.",
    text: "Enjoy fresh, mineral-rich water that your family will love.",
    img: PLACEHOLDER_IMG_URL,
  },
  {
    title: "Eco-Friendly,",
    highlight: "Sustainable Living.",
    text: "Reduce plastic waste and conserve water with our energy-efficient system.",
    img: PLACEHOLDER_IMG_URL,
  },
];

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState("next");
  const prevSlideRef = useRef(0);

  useEffect(() => {
    const interval = setInterval(goToNextSlide, 7000);
    return () => clearInterval(interval);
  }, [currentSlide]);

  const goToNextSlide = () => {
    setDirection("next");
    setCurrentSlide((prev) => {
      prevSlideRef.current = prev;
      return (prev + 1) % slides.length;
    });
  };

  const goToPrevSlide = () => {
    setDirection("prev");
    setCurrentSlide((prev) => {
      prevSlideRef.current = prev;
      return (prev - 1 + slides.length) % slides.length;
    });
  };

  const goToSlide = (index) => {
    if (index === currentSlide) return;
    setDirection(index > currentSlide ? "next" : "prev");
    prevSlideRef.current = currentSlide;
    setCurrentSlide(index);
  };

  return (
    <div className="rp-hero-wrapper">
      <div className="rp-hero-slides">
        {slides.map((slide, index) => {
          let className = "rp-hero-slide";
          if (index === currentSlide) className += ` active ${direction}`;
          else if (index === prevSlideRef.current) className += ` prev-slide ${direction}`;
          return (
            <div key={index} className={className}>
              <div className="rp-hero-top">
                <div className="rp-hero-container">
                  <div className="rp-hero-content">
                    <h1>
                      {slide.title}
                      <br />
                      <span className="rp-hero-highlight">{slide.highlight}</span>
                    </h1>
                    <p>{slide.text}</p>
                  </div>
                  <div className="rp-hero-image">
                    <img
                      src={slide.img}
                      alt="Water Purifier"
                      onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/500x550/3385B2/ffffff?text=Image+Missing" }}
                    />
                  </div>
                </div>
              </div>
              <div className="rp-hero-bottom-band">
                <div className="rp-hero-bottom-band-container">
                  <button className="rp-hero-btn">Explore Our Products &rarr;</button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <button className="rp-hero-arrow rp-hero-left-arrow" onClick={goToPrevSlide} aria-label="Previous Slide">
        <ChevronLeft size={26} />
      </button>
      <button className="rp-hero-arrow rp-hero-right-arrow" onClick={goToNextSlide} aria-label="Next Slide">
        <ChevronRight size={26} />
      </button>

      <div className="rp-hero-dots-fixed">
        {slides.map((_, idx) => (
          <span
            key={idx}
            className={`rp-hero-dot ${idx === currentSlide ? "active" : ""}`}
            onClick={() => goToSlide(idx)}
            aria-label={`Go to slide ${idx + 1}`}
          ></span>
        ))}
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;800&display=swap');

        .rp-hero-wrapper {
          width: 100%;
          height: 45vh;
          overflow: hidden;
          position: relative;
          font-family: 'Poppins', sans-serif;
          background-color: #f7f9fc;
        }

        .rp-hero-slides { position: relative; width: 100%; height: 100%; }

        .rp-hero-slide {
          position: absolute;
          top: 0;
          width: 100%;
          height: 100%;
          opacity: 0;
          transform: translateX(100%);
          transition: all 1s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          z-index: 1;
          display: flex;
          flex-direction: column;
        }

        .rp-hero-slide.next.active, .rp-hero-slide.prev.active { opacity:1; transform: translateX(0); z-index:3; }
        .rp-hero-slide.next.prev-slide { opacity:0; transform: translateX(-100%); z-index:2; }
        .rp-hero-slide.prev.prev-slide { opacity:0; transform: translateX(100%); z-index:2; }

        .rp-hero-top { width: 100%; height: 70%; background-color: #3385B2; display: flex; justify-content: center; align-items: center; padding: 3vh 0; }
        .rp-hero-bottom-band { height: 30%; background: #E7F3FA; display: flex; justify-content: center; align-items: center; }

        .rp-hero-container { display: flex; justify-content: space-between; align-items: center; gap: clamp(20px,4vw,50px); width:100%; max-width:1200px; margin:0 auto; padding:0 clamp(16px,4vw,60px); }
        .rp-hero-content { flex:1; text-align:left; display:flex; flex-direction:column; justify-content:center; gap:1.5vh; color:white; }

        .rp-hero-content h1 { font-size:clamp(1.8rem,3.5vw,3.5rem); font-weight:800; margin:0; line-height:1.1; }
        .rp-hero-highlight { display:block; font-size:clamp(1.8rem,3.5vw,3.5rem); font-weight:800; color:#d5ecfa; }
        .rp-hero-content p { font-size:clamp(0.9rem,1.2vw,1rem); color:#e2e2e2; margin:0; }

        .rp-hero-image { flex:1; display:flex; justify-content:flex-end; align-items:center; }
        .rp-hero-image img { width:30vw; height:auto; position:relative; bottom:-6vh; filter:drop-shadow(0 0.5vw 1.5vw rgba(0,0,0,0.25)); transition:transform 0.5s ease; z-index:3; }

        .rp-hero-bottom-band-container { width:100%; max-width:1200px; margin:0 auto; display:flex; justify-content:flex-start; padding:0 4vw; }
        .rp-hero-btn { background:white; color:#1e72c0; font-weight:600; padding:clamp(12px,1.5vh,18px) clamp(25px,3vw,50px); font-size:clamp(0.8rem,1.2vw,1rem); border-radius:50px; border:none; cursor:pointer; transition:all 0.3s ease; box-shadow:0 0.2vw 0.8vw rgba(0,0,0,0.1); white-space:nowrap; }
        .rp-hero-btn:hover { background:#f0f0f0; transform:translateY(-0.3vh); box-shadow:0 0.3vw 1vw rgba(0,0,0,0.15); }

        .rp-hero-arrow { position:absolute; top:35%; transform:translateY(-50%); background-color: rgba(0,0,0,0.1); color:#fff; border:1px solid rgba(255,255,255,0.6); padding:1.5vh; cursor:pointer; border-radius:50%; z-index:10; backdrop-filter:blur(4px); transition:all 0.3s ease; display:flex; justify-content:center; align-items:center; opacity:0.8; }
        .rp-hero-arrow:hover { background-color: rgba(255,255,255,0.2); border-color:white; opacity:1; }
        .rp-hero-left-arrow { left:2vw; } .rp-hero-right-arrow { right:2vw; }

        .rp-hero-dots-fixed { position:absolute; bottom:3vh; left:50%; transform:translateX(-50%); display:flex; justify-content:center; gap:0.8vw; z-index:15; }
        .rp-hero-dot { height:1vh; width:1vh; background:#bbb; border-radius:50%; cursor:pointer; transition:all 0.3s ease; }
        .rp-hero-dot.active { background:#0d6efd; transform:scale(1.3); }

        // /* MEDIA QUERIES */
        // @media (max-width:900px) {
        //   .rp-hero-wrapper { height:45vh; }
        //   .rp-hero-top { height:65%; }
        //   .rp-hero-bottom-band { height:35%; }
        //   .rp-hero-image img { width:28vw; bottom:-5vh; }
        //   .rp-hero-btn { padding:10px 24px; font-size:0.85rem; max-width:220px; }
        // }
        // @media (max-width:600px) {
        //   .rp-hero-wrapper { height:35vh; }
        //   .rp-hero-top { height:60%; }
        //   .rp-hero-bottom-band { height:40%; }
        //   .rp-hero-container { flex-direction:row; padding:0 1rem; gap:0.5rem; }
        //   .rp-hero-content { flex:0 0 65%; max-width:65%; gap:0.5rem; }
        //   .rp-hero-image { flex:0 0 35%; }
        //   .rp-hero-image img { width:100%; max-width:160px; bottom:-3.5vh; }
        //   .rp-hero-btn { padding:0.5rem 1.5rem; font-size:0.75rem; max-width:180px; }
        //   .rp-hero-arrow { padding:0.7rem; }
        //   .rp-hero-arrow svg { width:20px;height:20px; }
        // }
        // @media (max-width:450px) {
        //   .rp-hero-wrapper { height:32vh; }
        //   .rp-hero-top { height:65%; }
        //   .rp-hero-bottom-band { height:35%; }
        //   .rp-hero-container { padding:0 0.5rem; }
        //   .rp-hero-content {
        //     width: 100%;
        //     text-align: center;
        //     gap: 0.3rem;
        //   }

        //   .rp-hero-content h1,
        //   .rp-hero-highlight {
        //     font-size: clamp(1.3rem, 6vw, 1.8rem);
        //     line-height: 1.1;
        //   }

        //   .rp-hero-content p {
        //     font-size: clamp(0.7rem, 3vw, 0.9rem);
        //     margin: 0 auto;
        //   }
        //   .rp-hero-image img { max-width:140px; bottom:-6vh; }
        //   .rp-hero-btn { padding:6px 16px; font-size:0.7rem; max-width:150px; }
        //   .rp-hero-arrow { padding:0.5rem; }
        //   .rp-hero-arrow svg { width:16px;height:16px; }
        // }
        /* Tablet / medium screens */
@media (max-width: 900px) {
  .rp-hero-wrapper { height: 45vh; }
  .rp-hero-top { height: 70%; }
  .rp-hero-bottom-band { height: 30%; }
  .rp-hero-content h1,
  .rp-hero-highlight { font-size: clamp(1.5rem, 3vw, 2.8rem); }
  .rp-hero-content p { font-size: clamp(0.8rem, 1.5vw, 0.95rem); }
  .rp-hero-image img { width: 60vw; bottom: -5vh; }
  .rp-hero-btn { padding: 10px 24px; font-size: 0.85rem; max-width: 220px; }
  .rp-hero-arrow { padding: 0.8rem; }
  .rp-hero-arrow svg { width: 22px; height: 22px; }
  .rp-hero-dot {
    height: 0.9vh;
    width: 0.9vh;
  }
}

/* Small screens / mobile */
@media (max-width: 600px) {
  .rp-hero-wrapper { height: 35vh; }
  .rp-hero-top { height: 70%; }
  .rp-hero-bottom-band { height: 30%; }
  .rp-hero-content h1,
  .rp-hero-highlight { font-size: clamp(1.3rem, 4vw, 2.2rem); }
  .rp-hero-content p { font-size: clamp(0.7rem, 2.5vw, 0.9rem); }
  .rp-hero-image img { width: 60vw; bottom: -4vh; }
  .rp-hero-btn { padding: 8px 20px; font-size: 0.75rem; max-width: 180px; }
  .rp-hero-arrow { padding: 0.7rem; }
  .rp-hero-arrow svg { width: 20px; height: 20px; }
    .rp-hero-dots-fixed { bottom: 2.5vh; gap: 1vw; }
  .rp-hero-dot {
    height: 0.5vh;
    width: 0.5vh;
  }
  .rp-hero-dot.active {
    transform: scale(1.2);
  }
}

/* Extra small / very small screens */
@media (max-width: 480px) {
  .rp-hero-wrapper { height: 30vh; }
  .rp-hero-top { height: 70%; }
  .rp-hero-bottom-band { height: 30%; }
  .rp-hero-content h1,
  .rp-hero-highlight { font-size: clamp(1.1rem, 5vw, 1.8rem); }
  .rp-hero-content p { font-size: clamp(0.65rem, 3vw, 0.85rem); }
  .rp-hero-image img { width: 60vw; bottom: -3vh; }
  .rp-hero-btn { padding: 6px 16px; font-size: 0.7rem; max-width: 150px; }
  .rp-hero-arrow { padding: 0.5rem; }
  .rp-hero-arrow svg { width: 16px; height: 16px; }
    .rp-hero-dots-fixed { bottom: 2vh; gap: 1.2vw; }
  .rp-hero-dot {
    height: 0.5vh;
    width: 0.5vh;
  }
  .rp-hero-dot.active {
    transform: scale(1.0);
  }

}
    /* ✅ Large screens / desktops (≥1200px) */
  @media (min-width: 1200px) {
    .rp-hero-wrapper { height: 55vh; }
    .rp-hero-container { max-width: 1400px; padding: 0 5vw; }
    .rp-hero-content h1 { font-size: clamp(3rem, 2vw, 4.5rem); }
    .rp-hero-highlight { font-size: clamp(3rem, 2vw, 4.5rem); }
    .rp-hero-content p { font-size: 1.1rem; }
    .rp-hero-image img { width: 28vw; bottom: -5vh; }
    .rp-hero-btn { font-size: 1rem; padding: 14px 45px; }
    .rp-hero-arrow { padding: 1rem; }
    .rp-hero-arrow svg { width: 28px; height: 28px; }
  }

  /* ✅ Extra large screens (≥1600px, 4K setups) */
  @media (min-width: 1600px) {
    .rp-hero-wrapper { height: 60vh; }
    .rp-hero-container { max-width: 1600px; }
    .rp-hero-content h1,
    .rp-hero-highlight { font-size: 4.8rem; }
    .rp-hero-content p { font-size: 1.2rem; }
    .rp-hero-image img { width: 24vw; }
    .rp-hero-btn { padding: 16px 50px; font-size: 1.1rem; }
  }

      `}</style>
    </div>
  );
};

export default HeroSection;
