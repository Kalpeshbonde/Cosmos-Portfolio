import { motion } from "framer-motion";
import { fadeUp, stagger } from "../utils/motion.js";
import SectionReveal from "./SectionReveal.jsx";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center" id="top">
      <div className="absolute inset-x-0 -top-[20%] h-[220px] bg-[radial-gradient(circle,rgba(160,210,255,0.28)_2px,transparent_2px),radial-gradient(circle,rgba(120,160,255,0.18)_1px,transparent_1px)] bg-[size:220px_160px,140px_140px] opacity-45 mask-gradient pointer-events-none" aria-hidden="true" />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center w-full">
        <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.4 }} className="flex flex-col">
          <SectionReveal>
            <p className="text-[13px] tracking-[3px] uppercase text-white/40 mb-3">Founder · Builder · Visionary</p>
          </SectionReveal>
          <SectionReveal>
            <h1 className="font-['Sora'] text-[clamp(3.5rem,6vw,6.5rem)] leading-none font-semibold text-white tracking-tight mt-2">
              Raj Cosmos
            </h1>
          </SectionReveal>
          <SectionReveal>
            <p className="font-['Sora'] text-[clamp(1.1rem,2vw,1.4rem)] text-[#9fc7ff] mt-3 font-light tracking-wide">
              Entrepreneur in every universe.
            </p>
          </SectionReveal>
          <SectionReveal>
            <p className="mt-5 text-white/50 max-w-xl leading-relaxed">
              Serial founder building at the frontier of AI, Web3, and emerging tech.
              From Top 100 startups to global acquisitions — charting bold ventures across dimensions.
            </p>
          </SectionReveal>

          <motion.div variants={fadeUp} className="flex gap-4 mt-8 flex-wrap">
            <a href="#ventures" className="magnetic px-7 py-3.5 rounded-full bg-gradient-to-r from-[#8bb2ff] to-[#6ff6ff] text-[#02040c] font-semibold text-[15px] shadow-[0_16px_40px_rgba(110,200,255,0.25)] hover:shadow-[0_22px_50px_rgba(110,200,255,0.35)] transition-all">
              Explore Ventures
            </a>
            <a href="#contact" className="magnetic px-7 py-3.5 rounded-full bg-[rgba(12,18,34,0.6)] border border-[rgba(120,170,255,0.35)] text-white font-semibold text-[15px] backdrop-blur-lg hover:border-[rgba(120,170,255,0.6)] transition-all">
              Initiate Contact
            </a>
          </motion.div>

          <motion.div variants={fadeUp} className="flex gap-8 mt-10 flex-wrap">
            {[
              { value: "7+", label: "Ventures Built" },
              { value: "1", label: "Acquired" },
              { value: "Top 100", label: "Notable Startup" },
              { value: "Harvard", label: "AI Program" },
            ].map(({ value, label }) => (
              <div key={label}>
                <p className="font-['Sora'] text-2xl text-white font-semibold">{value}</p>
                <p className="text-[13px] uppercase tracking-wider text-white/40 mt-1">{label}</p>
              </div>
            ))}
          </motion.div>
        </motion.div>

        <motion.div
          className="relative w-full max-w-[460px] mx-auto aspect-square overflow-visible"
          animate={{ y: [0, -12, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          aria-hidden="true"
        >
          <svg width="100%" height="100%" viewBox="130 5 420 420" overflow="visible" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <radialGradient id="gc" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#ffe090" stopOpacity=".9" />
                <stop offset="20%" stopColor="#ff9040" stopOpacity=".6" />
                <stop offset="45%" stopColor="#a030e0" stopOpacity=".35" />
                <stop offset="75%" stopColor="#2010a0" stopOpacity=".15" />
                <stop offset="100%" stopColor="#000" stopOpacity="0" />
              </radialGradient>
              <radialGradient id="nv" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#7020ff" stopOpacity=".35" />
                <stop offset="100%" stopColor="#7020ff" stopOpacity="0" />
              </radialGradient>
              <radialGradient id="nb" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#10b0ff" stopOpacity=".22" />
                <stop offset="100%" stopColor="#10b0ff" stopOpacity="0" />
              </radialGradient>
              <radialGradient id="nr" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#ff2060" stopOpacity=".18" />
                <stop offset="100%" stopColor="#ff2060" stopOpacity="0" />
              </radialGradient>
              <radialGradient id="pg" cx="38%" cy="32%" r="62%">
                <stop offset="0%" stopColor="#c0a0ff" />
                <stop offset="50%" stopColor="#5020b0" />
                <stop offset="100%" stopColor="#120830" />
              </radialGradient>
            </defs>
            <style>{`
              @keyframes tw{0%,100%{opacity:1}50%{opacity:.1}}
              @keyframes rot{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
              @keyframes fl{0%,100%{transform:translateY(0)}50%{transform:translateY(-12px)}}
              @keyframes pu{0%,100%{opacity:.5}50%{opacity:1}}
              .s{animation:tw var(--d,3s) var(--e,0s) infinite ease-in-out}
              .r1{animation:rot 80s linear infinite;transform-origin:340px 210px}
              .r2{animation:rot 130s linear infinite reverse;transform-origin:340px 210px}
              .r3{animation:rot 200s linear infinite;transform-origin:340px 210px}
              .fl{animation:fl 6s ease-in-out infinite}
              .pu{animation:pu 4s var(--e,0s) infinite ease-in-out}
            `}</style>
            <ellipse cx="340" cy="210" rx="220" ry="160" fill="url(#nv)" opacity=".75" />
            <ellipse cx="390" cy="150" rx="140" ry="100" fill="url(#nb)" opacity=".6" />
            <ellipse cx="290" cy="310" rx="120" ry="80" fill="url(#nr)" opacity=".5" />
            <g className="r3">
              <ellipse cx="340" cy="210" rx="195" ry="195" fill="none" stroke="#3010a0" strokeWidth="40" strokeOpacity=".22" />
              <ellipse cx="340" cy="210" rx="195" ry="195" fill="none" stroke="#6030d0" strokeWidth="1" strokeOpacity=".32" strokeDasharray="4 8" />
            </g>
            <g className="r2">
              <ellipse cx="340" cy="210" rx="155" ry="155" fill="none" stroke="#5020b0" strokeWidth="25" strokeOpacity=".28" />
              <ellipse cx="340" cy="210" rx="155" ry="155" fill="none" stroke="#9050e0" strokeWidth="1.5" strokeOpacity=".45" strokeDasharray="6 12" />
            </g>
            <g className="r1">
              <ellipse cx="340" cy="210" rx="115" ry="115" fill="none" stroke="#7040c0" strokeWidth="18" strokeOpacity=".36" />
              <ellipse cx="340" cy="210" rx="115" ry="115" fill="none" stroke="#b070ff" strokeWidth="1.5" strokeOpacity=".6" strokeDasharray="8 10" />
              <ellipse cx="340" cy="210" rx="80" ry="80" fill="none" stroke="#9050d0" strokeWidth="10" strokeOpacity=".35" />
              <ellipse cx="340" cy="210" rx="80" ry="80" fill="none" stroke="#c090ff" strokeWidth="1" strokeOpacity=".55" strokeDasharray="5 7" />
            </g>
            <ellipse cx="340" cy="210" rx="50" ry="50" fill="url(#gc)" opacity="1" />
            <ellipse cx="340" cy="210" rx="28" ry="28" fill="#ffe8a0" fillOpacity=".7" />
            <ellipse cx="340" cy="210" rx="14" ry="14" fill="#fff5cc" fillOpacity=".95" />
            <circle cx="340" cy="210" r="6" fill="#ffffff" fillOpacity="1" />
            {[
              [210,55,.6,"#fff",3.8,.2],[250,30,.5,"#cdf",4.2,1],[295,68,.7,"#fec",3,.5],
              [335,38,.5,"#fff",5,2],[380,72,.6,"#cdf",3.5,.4],[418,28,.4,"#fff",4.6,1.7],
              [458,58,.7,"#fec",3.2,.9],[495,35,.5,"#fff",4.1,2.3],[185,128,.6,"#cdf",5.2,.3],
              [225,155,.4,"#fff",3.7,1.5],[478,122,.7,"#fec",4.4,.7],[502,95,.5,"#fff",3.1,2.1],
              [188,295,.6,"#cdf",4.9,.5],[218,335,.4,"#fff",3.4,1.8],[490,310,.7,"#fec",4.7,.2],
              [505,275,.5,"#fff",3.9,2.5],[250,378,.6,"#cdf",4.3,.8],[305,395,.5,"#fff",3.6,1.4],
              [370,382,.4,"#fec",5,.1],[430,398,.6,"#fff",3.3,2.2],
              [228,88,1.2,"#fff",5,.3],[288,48,1,"#cdf",4.2,1.4],[470,78,1.3,"#fec",6,.7],
              [490,200,1.1,"#fff",4.8,2],[185,360,1.2,"#cdf",5.5,.9],[470,368,1,"#fec",3.9,1.7],
              [242,62,2.2,"#fff",6,.2],[485,52,2,"#ddf",7,1.3],[505,160,2.3,"#ffe",5.5,.6],[190,400,2.1,"#fff",6.5,2],
            ].map(([cx,cy,r,fill,d,e],i) => (
              <circle key={i} cx={cx} cy={cy} r={r} fill={fill} className="s" style={{"--d":`${d}s`,"--e":`${e}s`}} />
            ))}
            <g className="r1">
              <circle cx="340" cy="55" r="3" fill="#a070ff" className="pu" style={{"--e":".5s"}} />
              <circle cx="495" cy="210" r="2.5" fill="#70b0ff" className="pu" style={{"--e":"1.2s"}} />
              <circle cx="340" cy="365" r="3" fill="#ff70a0" className="pu" style={{"--e":"2s"}} />
              <circle cx="185" cy="210" r="2.5" fill="#a070ff" className="pu" style={{"--e":".8s"}} />
            </g>
            <g className="fl">
              <circle cx="480" cy="340" r="18" fill="url(#pg)" />
              <ellipse cx="480" cy="340" rx="13" ry="5" fill="#c090ff" fillOpacity=".2" />
              <ellipse cx="480" cy="340" rx="30" ry="7" fill="none" stroke="#9050e0" strokeWidth="2.5" strokeOpacity=".45" />
              <ellipse cx="480" cy="340" rx="36" ry="8.5" fill="none" stroke="#6030b0" strokeWidth="1" strokeOpacity=".25" />
            </g>
            <circle cx="200" cy="90" r="8" fill="#0a1530" />
            <circle cx="200" cy="90" r="8" fill="#1a3060" fillOpacity=".8" />
            <circle cx="197" cy="87" r="3" fill="#fff" fillOpacity=".06" />
          </svg>
        </motion.div>
      </div>
    </section>
  );
}