import { useState } from "react";
import SectionReveal from "./SectionReveal.jsx";

const BOOKS = [
  { title: "Steve Jobs", author: "Walter Isaacson", cover: "/book/steve j.avif" },
  { title: "Titan", author: "Ron Chernow", cover: "/book/titan.avif" },
  { title: "Walt Disney", author: "Neal Gabler", cover: "/book/walt disney.avif" },
  { title: "Poor Charlie's Almanac", author: "Charlie Munger", cover: "/book/charles-t-munger.avif" },
  { title: "Sapiens", author: "Yuval Noah Harari", cover: "/book/sapiens.avif" },
  { title: "Principles", author: "Ray Dalio", cover: "/book/princples.avif" },
  { title: "Brothers Karamazov", author: "Fyodor Dostoevsky", cover: "/book/brothers karamov.avif" },
  { title: "The Ending of Time", author: "J. Krishnamurti & David Bohm", cover: "/book/the ending of time.avif" },
  { title: "The Animate and the Inanimate", author: "William James Sidis", cover: "/book/animate and inanimate.avif" },
  { title: "Cosmic Consciousness", author: "Richard Maurice Bucke", cover: "/book/cosmic consiousness.avif" },
  { title: "Cosmos", author: "Carl Sagan", cover: "/book/cosmos.avif" },
  { title: "Srimad Bhagavatam Fifth Canto", author: "A.C. Swami Prabhupada", cover: "/book/bhagvatam.avif" },
];

export default function Books() {
  const [hovered, setHovered] = useState(null);

  return (
    <>
      <style>{`
        @keyframes book-float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-6px); }
        }
        @keyframes glow-pulse {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 1; }
        }
        @keyframes shimmer {
          0% { transform: translateX(-100%) rotate(25deg); }
          100% { transform: translateX(300%) rotate(25deg); }
        }
        .book-card-hovered {
          animation: book-float 3s ease-in-out infinite;
        }
        .book-shimmer::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.08) 50%, transparent 60%);
          animation: shimmer 2s ease-in-out infinite;
          pointer-events: none;
          z-index: 20;
        }
        .glow-ring {
          animation: glow-pulse 2.5s ease-in-out infinite;
        }
      `}</style>

      <section className="relative flex flex-col gap-10 py-8" id="books">
        <div className="absolute inset-x-[-10%] top-[10%] h-[200px] bg-[radial-gradient(circle_at_20%_40%,rgba(90,140,255,0.15),transparent_55%),radial-gradient(circle_at_80%_20%,rgba(160,90,255,0.12),transparent_50%)] blur-[22px] opacity-70 pointer-events-none" aria-hidden="true" />

        {/* Header */}
        <div className="max-w-2xl relative z-10 text-center mx-auto">
          <SectionReveal>
            <p className="text-[12px] tracking-[4px] uppercase text-white/35">Recommended Reads</p>
          </SectionReveal>
          <SectionReveal>
            <h2 className="font-['Sora'] text-[clamp(1.8rem,3vw,2.8rem)] text-white mt-3 leading-tight">
              The Source Of Everything Is Already Inside Us
            </h2>
          </SectionReveal>
          <SectionReveal>
            <p className="mt-3 text-white/35 text-[14px] leading-relaxed italic">
              Books Are The Things Which Takes It Outside
            </p>
          </SectionReveal>
        </div>

        {/* Books grid */}
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 gap-x-2 gap-y-4 relative z-10">
          {BOOKS.map((book, i) => (
            <SectionReveal key={book.title}>
              <div
                className="group relative cursor-pointer flex flex-col gap-1 w-full max-w-[140px] mx-auto"
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
              >
                {/* Outer glow ring */}
                {hovered === i && (
                  <div className="glow-ring absolute -inset-2 rounded-2xl bg-[radial-gradient(circle_at_50%_50%,rgba(100,150,255,0.2),transparent_70%)] blur-md pointer-events-none z-0" />
                )}

                {/* Card */}
                <div
                  className={`relative rounded-lg overflow-hidden border transition-all duration-400 z-10 p-0.5
                    ${hovered === i
                      ? "book-card-hovered book-shimmer border-[rgba(140,200,255,0.5)] shadow-[0_0_24px_4px_rgba(100,150,255,0.25),0_20px_40px_rgba(5,8,20,0.6)]"
                      : "border-[rgba(120,170,255,0.12)] shadow-[0_8px_24px_rgba(5,8,20,0.4)]"
                    }`}
                >
                  {/* Inner glow overlay */}
                  <div
                    className={`absolute inset-0 z-10 pointer-events-none transition-opacity duration-300
                      bg-[radial-gradient(circle_at_50%_0%,rgba(120,100,255,0.35),transparent_65%)]
                      ${hovered === i ? "opacity-100" : "opacity-0"}`}
                  />

                  {/* Top edge glow line */}
                  <div
                    className={`absolute top-0 left-4 right-4 h-[1px] bg-gradient-to-r from-transparent via-[rgba(160,200,255,0.7)] to-transparent z-20 transition-opacity duration-300
                      ${hovered === i ? "opacity-100" : "opacity-0"}`}
                  />

                  <img
                    src={book.cover}
                    alt={book.title}
                    className="w-full aspect-[2/3] object-cover rounded-sm"
                    onError={(e) => {
                      e.target.style.display = "none";
                      e.target.nextSibling.style.display = "flex";
                    }}
                  />
                  <div
                    className="w-full aspect-[2/3] bg-[rgba(15,20,36,0.95)] items-center justify-center p-1.5 text-center rounded-md"
                    style={{ display: "none" }}
                  >
                    <p className="font-['Sora'] text-white text-[8px] font-semibold leading-snug">{book.title}</p>
                  </div>

                  {/* Left spine glow */}
                  <div
                    className={`absolute left-0 top-0 bottom-0 w-[2px] bg-gradient-to-b from-[#9fc7ff] via-[#7040c0] to-transparent transition-opacity duration-300
                      ${hovered === i ? "opacity-100" : "opacity-0"}`}
                  />
                </div>

                {/* Info */}
                <div className={`transition-all duration-300 ${hovered === i ? "opacity-100 translate-y-0" : "opacity-60 translate-y-1"}`}>
                  <p className="font-['Sora'] text-white text-[11px] font-semibold leading-snug line-clamp-2">{book.title}</p>
                  <p className="text-white/50 text-[9px] mt-0.5 leading-snug line-clamp-1">{book.author}</p>
                </div>
              </div>
            </SectionReveal>
          ))}
        </div>
      </section>
    </>
  );
}