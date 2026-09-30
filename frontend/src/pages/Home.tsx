import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView, useMotionValue, useTransform, animate } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { heroData, servicesData } from '../data/mockData';
import modelUrl from '../assets/kurma_group_logo_3d_gold.glb?url';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'model-viewer': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        src?: string;
        'camera-controls'?: boolean;
        'auto-rotate'?: boolean;
        'rotation-per-second'?: string;
        exposure?: string;
        'shadow-intensity'?: string;
        'environment-image'?: string;
      };
    }
  }
}

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const } }
};

const stagger: Variants = {
  visible: { transition: { staggerChildren: 0.1 } }
};

function CountUpStat({ value, suffix, label }: { value: number, suffix: string, label: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest).toLocaleString('id-ID') + suffix);

  useEffect(() => {
    if (inView) {
      animate(count, value, { duration: 1.5, ease: "easeOut" });
    }
  }, [inView, value, count]);

  return (
    <div ref={ref} className="flex flex-col text-left justify-center">
      <motion.div className="font-heading text-[28px] md:text-[32px] text-[#d4a437] mb-1 leading-none">{rounded}</motion.div>
      <div className="text-[14px] text-white/70 tracking-wide font-sans">{label}</div>
    </div>
  );
}

export default function Home() {
  return (
    <div className="bg-[var(--bg-light)] min-h-screen overflow-hidden">

      {/* HERO SECTION - PREMIUM MODERN */}
      <header
        className="section-dark text-[#F4F0E6] pt-[96px] pb-[48px] md:pb-[72px]"
      >
        {/* Overlay khusus untuk kontras teks hero */}
        <div className="section-dark-overlay"></div>

        {/* Vignette Tipis */}
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[var(--bg-darkest)] to-transparent pointer-events-none z-10"></div>

        <div className="max-w-[1200px] mx-auto px-6 relative z-10">
          <motion.div initial="hidden" animate="visible" variants={stagger} className="w-full">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-12 mb-10 md:mb-14 w-full">

              {/* Left Content */}
              <div className="lg:w-1/2 w-full shrink-0 text-center lg:text-left flex flex-col items-center lg:items-start z-20">


                <motion.h1 variants={fadeUp} className="text-[48px] xl:text-[56px] font-heading text-white max-w-[20ch] mb-6 leading-[1.1] tracking-tight">
                  Kami Membangun <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-soft to-amber italic font-light">Brand</span> Yang Bertumbuh.
                </motion.h1>

                <motion.p variants={fadeUp} className="text-[17px] text-white/70 max-w-[520px] mb-9 leading-relaxed font-light">
                  {heroData.description}
                </motion.p>

                <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start w-full sm:w-auto">

                  {/* Primary CTA */}
                  <Link
                    to="/#bisnis"
                    className="relative overflow-hidden group flex items-center justify-center font-sans font-semibold text-[16px] text-[#05081E] rounded-full transition-all duration-300 ease w-full sm:w-auto h-[50px] px-[30px] shadow-[0_8px_24px_rgba(212,164,55,0.35),inset_0_1px_0_rgba(255,255,255,0.5)] hover:shadow-[0_12px_32px_rgba(212,164,55,0.4),inset_0_1px_0_rgba(255,255,255,0.6)] hover:-translate-y-[2px]"
                    style={{
                      background: 'linear-gradient(135deg, #f2d27a 0%, #d4a437 50%, #b8892b 100%)',
                    }}
                  >
                    {/* Shine Effect */}
                    <div className="absolute top-0 -left-[100%] w-[40%] h-full -skew-x-[25deg] bg-gradient-to-r from-transparent via-white/60 to-transparent transition-all duration-[600ms] ease-in-out group-hover:left-[150%] z-0"></div>

                    <span className="relative z-10">Lihat Bisnis Kami</span>
                    <svg className="relative z-10 w-5 h-5 ml-2 transition-transform duration-300 ease group-hover:translate-x-[4px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                  </Link>

                  {/* Secondary CTA */}
                  <Link
                    to="/#tentang"
                    className="relative overflow-hidden group flex items-center justify-center font-sans font-medium text-[16px] text-[#f4f1ea] rounded-full transition-all duration-300 ease w-full sm:w-auto h-[50px] px-[30px] bg-[rgba(255,255,255,0.08)] backdrop-blur-[12px] border border-[rgba(255,255,255,0.25)] shadow-[inset_0_1px_0_rgba(255,255,255,0.2)] hover:border-[#d4a437] hover:bg-[rgba(212,164,55,0.12)] hover:text-[#d4a437]"
                  >
                    <span className="relative z-10">Tentang Kami</span>
                  </Link>

                </motion.div>
              </div>

              {/* Right Content: Orbit Composition */}
              <motion.div variants={fadeUp} className="lg:w-1/2 w-full flex justify-center relative mt-16 lg:mt-0 z-10">
                <style>
                  {`
                    @keyframes float-orbit {
                      0%, 100% { transform: translateY(0); }
                      50% { transform: translateY(-8px); }
                    }
                  `}
                </style>
                {/* Visual Wrapper for Space Reservation */}
                <div className="relative w-[340px] h-[340px] lg:w-[460px] lg:h-[460px] xl:w-[640px] xl:h-[640px] flex items-center justify-center group/orbit">

                  {/* Scaled Inner Canvas */}
                  <div className="absolute flex items-center justify-center scale-[0.53] lg:scale-[0.71] xl:scale-100">
                    <div className="relative w-[640px] h-[640px] flex items-center justify-center">

                      {/* Glow Radial */}
                      <div className="absolute w-[230px] h-[230px] rounded-full bg-[#d4a437]/25 blur-[80px] pointer-events-none"></div>

                      {/* Piringan Kaca Latar Belakang (330px) */}
                      <div className="absolute w-[330px] h-[330px] rounded-full bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.1)] pointer-events-none"></div>

                      {/* Outer Ring (540px) - Desktop Only */}
                      <div className="absolute w-[540px] h-[540px] rounded-full border border-dashed border-[#d4a437]/25 animate-[spin_45s_linear_infinite] group-hover/orbit:[animation-play-state:paused] motion-reduce:animate-none hidden lg:block z-20 pointer-events-none">
                        {/* Card 1: Riset & Data (0 deg) */}
                        <div className="absolute top-[0%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[100px] h-[54px] animate-[spin_45s_linear_infinite_reverse] group-hover/orbit:[animation-play-state:paused] motion-reduce:animate-none pointer-events-auto">
                          <div className="w-full h-full bg-[rgba(255,255,255,0.08)] backdrop-blur-[14px] border border-[rgba(255,255,255,0.18)] rounded-[16px] shadow-[0_10px_30px_rgba(5,8,30,0.4)] flex flex-row items-center justify-center gap-1.5 transition-transform duration-300 hover:scale-[1.06] hover:border-[#d4a437] cursor-pointer" style={{ animation: 'float-orbit 4s ease-in-out infinite', animationDelay: '0s' }}>
                            <svg className="w-4 h-4 text-[#d4a437] shrink-0" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" /></svg>
                            <span className="font-sans text-[#f4f1ea] text-[12px] leading-tight text-left">Riset &<br />Data</span>
                          </div>
                        </div>
                        {/* Card 2: Copywriting (120 deg) */}
                        <div className="absolute top-[75%] left-[93.3%] -translate-x-1/2 -translate-y-1/2 w-[100px] h-[54px] animate-[spin_45s_linear_infinite_reverse] group-hover/orbit:[animation-play-state:paused] motion-reduce:animate-none pointer-events-auto">
                          <div className="w-full h-full bg-[rgba(255,255,255,0.08)] backdrop-blur-[14px] border border-[rgba(255,255,255,0.18)] rounded-[16px] shadow-[0_10px_30px_rgba(5,8,30,0.4)] flex flex-row items-center justify-center gap-1.5 transition-transform duration-300 hover:scale-[1.06] hover:border-[#d4a437] cursor-pointer" style={{ animation: 'float-orbit 4s ease-in-out infinite', animationDelay: '1.5s' }}>
                            <svg className="w-4 h-4 text-[#d4a437] shrink-0" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" /></svg>
                            <span className="font-sans text-[#f4f1ea] text-[12px] leading-tight text-left">Copy<br />writing</span>
                          </div>
                        </div>
                        {/* Card 3: AI Video (240 deg) */}
                        <div className="absolute top-[75%] left-[6.7%] -translate-x-1/2 -translate-y-1/2 w-[100px] h-[54px] animate-[spin_45s_linear_infinite_reverse] group-hover/orbit:[animation-play-state:paused] motion-reduce:animate-none pointer-events-auto">
                          <div className="w-full h-full bg-[rgba(255,255,255,0.08)] backdrop-blur-[14px] border border-[rgba(255,255,255,0.18)] rounded-[16px] shadow-[0_10px_30px_rgba(5,8,30,0.4)] flex flex-row items-center justify-center gap-1.5 transition-transform duration-300 hover:scale-[1.06] hover:border-[#d4a437] cursor-pointer" style={{ animation: 'float-orbit 4s ease-in-out infinite', animationDelay: '3s' }}>
                            <svg className="w-4 h-4 text-[#d4a437] shrink-0" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347c-.75.412-1.667-.13-1.667-.986V5.653z" /></svg>
                            <span className="font-sans text-[#f4f1ea] text-[12px] leading-tight text-left">AI<br />Video</span>
                          </div>
                        </div>
                      </div>

                      {/* Inner Ring (410px) - Desktop */}
                      <div className="absolute w-[410px] h-[410px] rounded-full border border-dashed border-[#d4a437]/25 animate-[spin_28s_linear_infinite] group-hover/orbit:[animation-play-state:paused] motion-reduce:animate-none hidden lg:block z-20 pointer-events-none">
                        {/* Card 1: Shopee Video (180 deg) */}
                        <div className="absolute top-[100%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[100px] h-[54px] animate-[spin_28s_linear_infinite_reverse] group-hover/orbit:[animation-play-state:paused] motion-reduce:animate-none pointer-events-auto">
                          <div className="w-full h-full bg-[rgba(255,255,255,0.08)] backdrop-blur-[14px] border border-[rgba(255,255,255,0.18)] rounded-[16px] shadow-[0_10px_30px_rgba(5,8,30,0.4)] flex flex-row items-center justify-center gap-1.5 transition-transform duration-300 hover:scale-[1.06] hover:border-[#d4a437] cursor-pointer" style={{ animation: 'float-orbit 4s ease-in-out infinite', animationDelay: '0.5s' }}>
                            <svg className="w-4 h-4 text-[#d4a437] shrink-0" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25h-9A2.25 2.25 0 002.25 7.5v9a2.25 2.25 0 002.25 2.25z" /></svg>
                            <span className="font-sans text-[#f4f1ea] text-[12px] leading-tight text-left">Shopee<br />Video</span>
                          </div>
                        </div>
                        {/* Card 2: TikTok Shop (60 deg) */}
                        <div className="absolute top-[25%] left-[93.3%] -translate-x-1/2 -translate-y-1/2 w-[100px] h-[54px] animate-[spin_28s_linear_infinite_reverse] group-hover/orbit:[animation-play-state:paused] motion-reduce:animate-none pointer-events-auto">
                          <div className="w-full h-full bg-[rgba(255,255,255,0.08)] backdrop-blur-[14px] border border-[rgba(255,255,255,0.18)] rounded-[16px] shadow-[0_10px_30px_rgba(5,8,30,0.4)] flex flex-row items-center justify-center gap-1.5 transition-transform duration-300 hover:scale-[1.06] hover:border-[#d4a437] cursor-pointer" style={{ animation: 'float-orbit 4s ease-in-out infinite', animationDelay: '2s' }}>
                            <svg className="w-4 h-4 text-[#d4a437] shrink-0" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 10.5H21A7.5 7.5 0 0013.5 3v7.5z" /><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6a7.5 7.5 0 107.5 7.5h-7.5V6z" /></svg>
                            <span className="font-sans text-[#f4f1ea] text-[12px] leading-tight text-left">TikTok<br />Shop</span>
                          </div>
                        </div>
                        {/* Card 3: Threads & Sosmed (300 deg) */}
                        <div className="absolute top-[25%] left-[6.7%] -translate-x-1/2 -translate-y-1/2 w-[100px] h-[54px] animate-[spin_28s_linear_infinite_reverse] group-hover/orbit:[animation-play-state:paused] motion-reduce:animate-none pointer-events-auto">
                          <div className="w-full h-full bg-[rgba(255,255,255,0.08)] backdrop-blur-[14px] border border-[rgba(255,255,255,0.18)] rounded-[16px] shadow-[0_10px_30px_rgba(5,8,30,0.4)] flex flex-row items-center justify-center gap-1.5 transition-transform duration-300 hover:scale-[1.06] hover:border-[#d4a437] cursor-pointer" style={{ animation: 'float-orbit 4s ease-in-out infinite', animationDelay: '3.5s' }}>
                            <svg className="w-4 h-4 text-[#d4a437] shrink-0" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M8.625 9.75a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 01.778-.332 48.294 48.294 0 005.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" /></svg>
                            <span className="font-sans text-[#f4f1ea] text-[12px] leading-tight text-left">Threads<br />& Sosmed</span>
                          </div>
                        </div>
                      </div>

                      {/* Inner Ring (410px) - Mobile */}
                      <div className="absolute w-[410px] h-[410px] rounded-full border border-dashed border-[#d4a437]/25 animate-[spin_28s_linear_infinite] motion-reduce:animate-none lg:hidden z-20 pointer-events-none">
                        {/* Card 1 */}
                        <div className="absolute top-[0%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[100px] h-[54px] animate-[spin_28s_linear_infinite_reverse] pointer-events-auto">
                          <div className="w-full h-full bg-[rgba(255,255,255,0.08)] backdrop-blur-[14px] border border-[rgba(255,255,255,0.18)] rounded-[16px] shadow-[0_10px_30px_rgba(5,8,30,0.4)] flex flex-row items-center justify-center gap-1.5" style={{ animation: 'float-orbit 4s ease-in-out infinite' }}>
                            <svg className="w-4 h-4 text-[#d4a437] shrink-0" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25h-9A2.25 2.25 0 002.25 7.5v9a2.25 2.25 0 002.25 2.25z" /></svg>
                            <span className="font-sans text-[#f4f1ea] text-[12px] leading-tight text-left">Shopee<br />Video</span>
                          </div>
                        </div>
                        {/* Card 2 */}
                        <div className="absolute top-[50%] left-[100%] -translate-x-1/2 -translate-y-1/2 w-[100px] h-[54px] animate-[spin_28s_linear_infinite_reverse] pointer-events-auto">
                          <div className="w-full h-full bg-[rgba(255,255,255,0.08)] backdrop-blur-[14px] border border-[rgba(255,255,255,0.18)] rounded-[16px] shadow-[0_10px_30px_rgba(5,8,30,0.4)] flex flex-row items-center justify-center gap-1.5" style={{ animation: 'float-orbit 4s ease-in-out infinite', animationDelay: '1s' }}>
                            <svg className="w-4 h-4 text-[#d4a437] shrink-0" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 10.5H21A7.5 7.5 0 0013.5 3v7.5z" /><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6a7.5 7.5 0 107.5 7.5h-7.5V6z" /></svg>
                            <span className="font-sans text-[#f4f1ea] text-[12px] leading-tight text-left">TikTok<br />Shop</span>
                          </div>
                        </div>
                        {/* Card 3 */}
                        <div className="absolute top-[100%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[100px] h-[54px] animate-[spin_28s_linear_infinite_reverse] pointer-events-auto">
                          <div className="w-full h-full bg-[rgba(255,255,255,0.08)] backdrop-blur-[14px] border border-[rgba(255,255,255,0.18)] rounded-[16px] shadow-[0_10px_30px_rgba(5,8,30,0.4)] flex flex-row items-center justify-center gap-1.5" style={{ animation: 'float-orbit 4s ease-in-out infinite', animationDelay: '2s' }}>
                            <svg className="w-4 h-4 text-[#d4a437] shrink-0" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" /></svg>
                            <span className="font-sans text-[#f4f1ea] text-[12px] leading-tight text-left">Riset &<br />Data</span>
                          </div>
                        </div>
                        {/* Card 4 */}
                        <div className="absolute top-[50%] left-[0%] -translate-x-1/2 -translate-y-1/2 w-[100px] h-[54px] animate-[spin_28s_linear_infinite_reverse] pointer-events-auto">
                          <div className="w-full h-full bg-[rgba(255,255,255,0.08)] backdrop-blur-[14px] border border-[rgba(255,255,255,0.18)] rounded-[16px] shadow-[0_10px_30px_rgba(5,8,30,0.4)] flex flex-row items-center justify-center gap-1.5" style={{ animation: 'float-orbit 4s ease-in-out infinite', animationDelay: '3s' }}>
                            <svg className="w-4 h-4 text-[#d4a437] shrink-0" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M8.625 9.75a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 01.778-.332 48.294 48.294 0 005.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" /></svg>
                            <span className="font-sans text-[#f4f1ea] text-[12px] leading-tight text-left">Threads<br />& Sosmed</span>
                          </div>
                        </div>
                      </div>

                      {/* Center: 3D Model (230px) */}
                      <div className="absolute w-[230px] h-[230px] flex items-center justify-center z-10 pointer-events-auto">
                        {React.createElement('model-viewer', {
                          src: modelUrl,
                          'camera-controls': true,
                          'auto-rotate': true,
                          'rotation-per-second': "10deg",
                          exposure: "1",
                          'shadow-intensity': "1",
                          'environment-image': "neutral",
                          style: { backgroundColor: 'transparent' },
                          className: "w-full h-full outline-none"
                        })}
                      </div>

                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Floating Stats Strip */}
            <motion.div
              variants={fadeUp}
              className="w-full mt-0 rounded-[20px] mb-8"
              style={{
                background: 'rgba(255,255,255,0.05)',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
                border: '1px solid rgba(255,255,255,0.12)'
              }}
            >
              <div className="flex flex-col md:flex-row w-full p-5 md:py-[20px] md:px-[36px] md:h-[90px]">
                <div className="flex-1 flex items-center py-4 md:py-0 md:pr-6 border-b md:border-b-0 md:border-r border-[rgba(255,255,255,0.12)]">
                  <CountUpStat value={1000} suffix="+" label="Akun marketplace aktif" />
                </div>
                <div className="flex-1 flex items-center py-4 md:py-0 md:px-10 border-b md:border-b-0 md:border-r border-[rgba(255,255,255,0.12)]">
                  <CountUpStat value={100000} suffix="+" label="Konten per bulan" />
                </div>
                <div className="flex-1 flex items-center pt-4 md:pt-0 md:pl-10">
                  <CountUpStat value={70} suffix="+" label="Anggota tim" />
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </header>

      {/* TICKER */}
      <div className="marquee h-[56px] flex items-center border-b border-t border-[rgba(212,164,55,0.25)] relative overflow-hidden" style={{ background: 'var(--bg-darkest)' }}>
        {/* Fades */}
        <div className="absolute top-0 left-0 bottom-0 w-[80px] bg-gradient-to-r from-[var(--bg-darkest)] to-transparent z-10 pointer-events-none" />
        <div className="absolute top-0 right-0 bottom-0 w-[80px] bg-gradient-to-l from-[var(--bg-darkest)] to-transparent z-10 pointer-events-none" />

        <div className="marquee-track items-center">
          {["Building Brands", "Growing People", "Digital Marketing", "Content Creation", "E-Commerce", "Sejak 2019", "Bandar Lampung"].map((text, i) => [
            <span key={`t1-${i}`} className="font-heading italic text-[#d4a437] text-[18px] tracking-[0.5px] whitespace-nowrap">{text}</span>,
            <span key={`k1-${i}`} className="font-heading italic text-[#d4a437]/60 text-[16px]">K</span>
          ])}
          {["Building Brands", "Growing People", "Digital Marketing", "Content Creation", "E-Commerce", "Sejak 2019", "Bandar Lampung"].map((text, i) => [
            <span key={`t2-${i}`} aria-hidden="true" className="font-heading italic text-[#d4a437] text-[18px] tracking-[0.5px] whitespace-nowrap">{text}</span>,
            <span key={`k2-${i}`} aria-hidden="true" className="font-heading italic text-[#d4a437]/60 text-[16px]">K</span>
          ])}
        </div>
      </div>

      {/* ABOUT TEASER */}
      <section id="tentang" className="pt-[88px] pb-[96px] relative bg-[var(--bg-light)] overflow-hidden">
        {/* Ornamen Daun Kurma di pojok kanan atas */}
        <div className="absolute right-[-40px] top-[-40px] pointer-events-none opacity-[0.04] text-[var(--bg-dark)] rotate-[15deg] w-[350px] h-[350px] z-0">
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
            <path d="M17,8C8,10 5.9,16.17 3.82,21.34L5.71,22L6.66,19.7C7.14,19.87 7.64,20 8,20C19,20 22,3 22,3C21,5 14,5.25 9,6.25C4,7.25 2,11.5 2,13.5C2,15.5 3.75,17.25 3.75,17.25C7,8 17,8 17,8Z" />
          </svg>
        </div>

        <div className="max-w-[1200px] mx-auto px-6 relative z-10 flex flex-col md:grid md:grid-cols-[1fr_1.1fr] gap-16 md:gap-24 items-center">

          {/* Kolom Kiri - Visual */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative w-full h-[450px] md:h-[600px] order-1"
          >
            {/* Bayangan Blok Hijau Tua */}
            <div className="absolute -left-[20px] -bottom-[20px] w-full h-full bg-[var(--bg-dark)] rounded-[24px]"></div>

            {/* Foto Utama */}
            <img src="/images/meeting1.jpg" alt="Tentang Kurma Group" className="absolute top-0 left-0 w-full h-full object-cover rounded-[24px] shadow-lg" />

            {/* Badge Kaca Kanan Bawah */}
            <div className="absolute -bottom-6 -right-4 md:-right-8 w-[260px] bg-white/85 backdrop-blur-[12px] p-6 rounded-2xl shadow-[0_12px_40px_rgba(0,0,0,0.1)] border border-white">
              <svg className="w-6 h-6 text-[#d4a437] mb-3" fill="currentColor" viewBox="0 0 24 24"><path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" /></svg>
              <p className="font-heading italic text-[var(--bg-dark)] text-[16px] leading-relaxed">
                Brand terbaik lahir dari riset yang dalam, eksekusi yang cepat, dan tim yang terus belajar.
              </p>
            </div>

            {/* Badge Sejak 2019 Kiri Atas */}
            <div className="absolute -top-3 -left-3 bg-[#d4a437] rounded-full px-4 py-1.5 text-[var(--bg-dark)] font-bold text-xs uppercase tracking-wider shadow-md">
              Sejak 2019
            </div>
          </motion.div>

          {/* Kolom Kanan - Teks */}
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={stagger}
            className="order-2 w-full"
          >
            {/* Garis Emas Vertikal */}
            <motion.div variants={fadeUp} className="h-[60px] w-[2px] bg-[#d4a437] mb-6"></motion.div>

            <motion.span variants={fadeUp} className="text-sm font-bold tracking-widest text-[#d4a437] uppercase mb-4 block">
              Sekilas Tentang Kami
            </motion.span>

            <motion.h2 variants={fadeUp} className="font-heading text-4xl md:text-[52px] text-[var(--bg-dark)] leading-[1.1] mb-6">
              Lebih dari sekadar <span className="italic text-[#d4a437] font-light">agensi.</span>
            </motion.h2>

            <motion.p variants={fadeUp} className="text-[18px] text-[var(--bg-dark)]/80 font-sans leading-relaxed mb-10 max-w-[480px]">
              Kurma Group adalah ekosistem terpadu yang bergerak di bidang digital marketing, content creation, e-commerce, dan brand development.
            </motion.p>

            {/* 3 Poin */}
            <motion.div variants={fadeUp} className="space-y-6 mb-12">
              {[
                { title: 'Riset yang dalam', desc: 'Analisis pasar berbasis data yang akurat.' },
                { title: 'Produksi konten skala besar', desc: 'Kualitas premium dalam kuantitas.' },
                { title: 'Sistem yang bikin brand & orang tumbuh', desc: 'Dukungan operasional menyeluruh.' }
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-5">
                  <div className="font-heading font-light text-[32px] leading-none text-[#d4a437] mt-1">
                    0{i + 1}
                  </div>
                  <div>
                    <h4 className="font-sans font-bold text-[17px] text-[var(--bg-dark)] mb-1">{item.title}</h4>
                    <p className="font-sans text-[15px] text-[var(--bg-dark)]/70">{item.desc}</p>
                  </div>
                </div>
              ))}
            </motion.div>

            {/* CTA */}
            <motion.div variants={fadeUp} className="relative flex flex-col sm:flex-row items-start sm:items-center gap-6 mt-2">

              {/* Soft Gradient Blob Behind Button */}
              <div className="absolute top-1/2 left-[120px] -translate-y-1/2 -translate-x-1/2 w-[300px] h-[300px] bg-[radial-gradient(circle,rgba(212,164,55,1)_0%,rgba(15,42,30,0)_70%)] opacity-25 blur-[60px] rounded-full pointer-events-none z-0"></div>

              <Link to="/tentang" className="relative z-10 inline-flex items-center justify-center bg-[rgba(15,42,30,0.12)] backdrop-blur-[14px] backdrop-saturate-[140%] border border-[rgba(15,42,30,0.25)] shadow-[inset_0_1px_0_rgba(255,255,255,0.6),0_8px_24px_rgba(15,42,30,0.12)] text-[var(--bg-dark)] font-sans font-semibold py-[16px] px-[32px] text-[17px] hover:bg-[rgba(15,42,30,0.9)] hover:text-[var(--text-light)] transition-all duration-300 ease-in-out rounded-full whitespace-nowrap group">
                Selengkapnya tentang kami
                <svg className="w-5 h-5 ml-2 transition-transform duration-300 ease-in-out group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
              <Link to="/#bisnis" className="relative z-10 text-[var(--bg-dark)] hover:text-[#d4a437] font-medium text-[15px] transition-colors whitespace-nowrap group py-2">
                Lihat unit bisnis
                <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-[#d4a437] group-hover:scale-x-110 transition-transform origin-left"></span>
              </Link>
            </motion.div>

          </motion.div>
        </div>
      </section>

      {/* BUSINESS UNITS */}
      <section id="bisnis" className="section-dark-alt pt-[88px] pb-[96px]">

        <div className="max-w-[1200px] mx-auto px-6 relative z-10">

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={stagger} className="text-center mb-14">
            <motion.h2 variants={fadeUp} className="font-heading text-4xl md:text-[56px] text-[var(--text-light)] leading-[1.1] mb-4">
              Unit Bisnis Kurma Group
            </motion.h2>
            <motion.p variants={fadeUp} className="text-[18px] text-[var(--text-light)]/70 font-sans mx-auto max-w-[600px]">
              Solusi komprehensif untuk mengembangkan brand Anda secara terukur.
            </motion.p>
          </motion.div>

          {/* Bento Grid */}
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }}
            variants={{
              visible: { transition: { staggerChildren: 0.08 } },
              hidden: {}
            }}
            className="grid grid-cols-1 md:grid-cols-4 gap-[20px] auto-rows-[280px]"
          >

            {/* Unit 1: Shopee Video (span 2) */}
            <motion.div variants={fadeUp} className="md:col-span-2 group relative overflow-hidden rounded-[20px] pt-[28px] px-[28px] pb-[20px] border border-[#d4a437]/20 hover:border-[#d4a437] transition-all duration-300 hover:-translate-y-[6px] flex flex-col justify-end">
              {/* Background Video */}
              <video src="/video/shopee_video.mp4" autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.05]" style={{ filter: 'saturate(0.75)' }} />
              {/* Tint Navy Multiply 35% */}
              <div className="absolute inset-0 bg-[var(--bg-dark)] mix-blend-multiply opacity-35 pointer-events-none"></div>
              {/* Overlay Gradient Navy */}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[rgba(5,8,30,0.95)] pointer-events-none"></div>

              <div className="relative z-10 w-full">
                <h3 className="font-heading text-[24px] text-[var(--text-light)]">Shopee Video</h3>
                <div className="flex flex-wrap gap-2 mt-[14px]">
                  <span className="px-[14px] py-[6px] rounded-full font-sans text-[13px] text-[#d4a437] bg-[#d4a437]/10 border border-[#d4a437]/30 group-hover:bg-[#d4a437] group-hover:text-[var(--bg-dark)] transition-colors backdrop-blur-md">Konten video</span>
                  <span className="px-[14px] py-[6px] rounded-full font-sans text-[13px] text-[#d4a437] bg-[#d4a437]/10 border border-[#d4a437]/30 group-hover:bg-[#d4a437] group-hover:text-[var(--bg-dark)] transition-colors backdrop-blur-md">Iklan Shopee</span>
                </div>
              </div>
            </motion.div>

            {/* Unit 2: TikTok Shop */}
            <motion.div variants={fadeUp} className="md:col-span-1 group relative overflow-hidden rounded-[20px] bg-[rgba(255,255,255,0.05)] backdrop-blur-[10px] pt-[28px] px-[28px] pb-[20px] border border-[rgba(212,164,55,0.2)] hover:border-[#d4a437] transition-all duration-300 hover:-translate-y-[6px] flex flex-col justify-between">
              <div className="flex justify-end items-start w-full">
                {/* 48px Icon with Glass Circle */}
                <div className="relative w-16 h-16 flex items-center justify-center rounded-full bg-white/5 backdrop-blur-md border border-white/10 group-hover:scale-110 transition-transform origin-center text-[#d4a437]">
                  <svg className="w-12 h-12" fill="none" stroke="currentColor" strokeWidth="1" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path></svg>
                </div>
              </div>
              <div className="relative z-10 w-full mt-auto">
                <h3 className="font-heading text-[24px] text-[var(--text-light)]">TikTok Shop</h3>
                <div className="flex flex-wrap gap-2 mt-[14px]">
                  <span className="px-[14px] py-[6px] rounded-full font-sans text-[13px] text-[#d4a437] bg-[#d4a437]/10 border border-[#d4a437]/30 group-hover:bg-[#d4a437] group-hover:text-[var(--bg-dark)] transition-colors">Affiliate</span>
                  <span className="px-[14px] py-[6px] rounded-full font-sans text-[13px] text-[#d4a437] bg-[#d4a437]/10 border border-[#d4a437]/30 group-hover:bg-[#d4a437] group-hover:text-[var(--bg-dark)] transition-colors">AI-narrated reels</span>
                </div>
              </div>
            </motion.div>

            {/* Unit 3: Threads & Sosmed */}
            <motion.div variants={fadeUp} className="md:col-span-1 group relative overflow-hidden rounded-[20px] bg-[rgba(255,255,255,0.05)] backdrop-blur-[10px] pt-[28px] px-[28px] pb-[20px] border border-[rgba(212,164,55,0.2)] hover:border-[#d4a437] transition-all duration-300 hover:-translate-y-[6px] flex flex-col justify-between">
              <div className="flex justify-end items-start w-full relative h-16">
                {/* 3 chat bubbles */}
                <div className="absolute top-0 right-4 w-8 h-8 rounded-[10px] rounded-br-sm bg-white/10 backdrop-blur-sm border border-white/20 group-hover:-translate-y-1 transition-transform"></div>
                <div className="absolute top-3 right-8 w-10 h-10 rounded-[12px] rounded-bl-sm bg-[#d4a437] shadow-lg group-hover:scale-110 transition-transform z-10"></div>
                <div className="absolute top-6 right-0 w-6 h-6 rounded-lg rounded-br-sm bg-white/5 backdrop-blur-sm border border-white/20 group-hover:translate-x-1 transition-transform"></div>
              </div>
              <div className="relative z-10 w-full mt-auto">
                <h3 className="font-heading text-[24px] text-[var(--text-light)]">Threads & Sosmed</h3>
                <div className="flex flex-wrap gap-2 mt-[14px]">
                  <span className="px-[14px] py-[6px] rounded-full font-sans text-[13px] text-[#d4a437] bg-[#d4a437]/10 border border-[#d4a437]/30 group-hover:bg-[#d4a437] group-hover:text-[var(--bg-dark)] transition-colors">Engagement</span>
                  <span className="px-[14px] py-[6px] rounded-full font-sans text-[13px] text-[#d4a437] bg-[#d4a437]/10 border border-[#d4a437]/30 group-hover:bg-[#d4a437] group-hover:text-[var(--bg-dark)] transition-colors">Soft selling</span>
                </div>
              </div>
            </motion.div>

            {/* Row 2 */}

            {/* Unit 4: Riset & Data */}
            <motion.div variants={fadeUp} className="md:col-span-1 group relative overflow-hidden rounded-[20px] bg-[rgba(255,255,255,0.05)] backdrop-blur-[10px] pt-[28px] px-[28px] pb-[20px] border border-[rgba(212,164,55,0.2)] hover:border-[#d4a437] transition-all duration-300 hover:-translate-y-[6px] flex flex-col justify-between">
              <div className="flex justify-end items-end w-full h-16 relative opacity-80 group-hover:opacity-100 transition-opacity">
                {/* 4 small bars */}
                <div className="flex items-end gap-1.5 h-full pt-2">
                  <motion.div initial={{ height: '30%' }} whileInView={{ height: '50%' }} className="w-2.5 bg-white/10 rounded-t-sm"></motion.div>
                  <motion.div initial={{ height: '30%' }} whileInView={{ height: '70%' }} className="w-2.5 bg-white/20 rounded-t-sm"></motion.div>
                  <motion.div initial={{ height: '30%' }} whileInView={{ height: '40%' }} className="w-2.5 bg-white/10 rounded-t-sm"></motion.div>
                  <motion.div initial={{ height: '30%' }} whileInView={{ height: '100%' }} className="w-2.5 bg-[#d4a437] shadow-[0_0_10px_rgba(212,164,55,0.5)] rounded-t-sm"></motion.div>
                </div>
                {/* Sparkline overlay */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 50" preserveAspectRatio="none">
                  <motion.path
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
                    d="M 10 45 Q 30 40, 45 25 T 70 30 T 95 10"
                    fill="none"
                    stroke="#d4a437"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    className="drop-shadow-[0_2px_4px_rgba(212,164,55,0.5)]"
                  />
                </svg>
              </div>
              <div className="relative z-10 w-full mt-auto">
                <h3 className="font-heading text-[24px] text-[var(--text-light)]">Riset & Data</h3>
                <div className="flex flex-wrap gap-2 mt-[14px]">
                  <span className="px-[14px] py-[6px] rounded-full font-sans text-[13px] text-[#d4a437] bg-[#d4a437]/10 border border-[#d4a437]/30 group-hover:bg-[#d4a437] group-hover:text-[var(--bg-dark)] transition-colors">Scraping produk</span>
                  <span className="px-[14px] py-[6px] rounded-full font-sans text-[13px] text-[#d4a437] bg-[#d4a437]/10 border border-[#d4a437]/30 group-hover:bg-[#d4a437] group-hover:text-[var(--bg-dark)] transition-colors">Dashboard</span>
                </div>
              </div>
            </motion.div>

            {/* Unit 5: Copywriting */}
            <motion.div variants={fadeUp} className="md:col-span-1 group relative overflow-hidden rounded-[20px] bg-[rgba(255,255,255,0.05)] backdrop-blur-[10px] pt-[28px] px-[28px] pb-[20px] border border-[rgba(212,164,55,0.2)] hover:border-[#d4a437] transition-all duration-300 hover:-translate-y-[6px] flex flex-col justify-between">
              <div className="flex justify-end items-start w-full">
                {/* 48px Icon with Glass Circle */}
                <div className="relative w-16 h-16 flex items-center justify-center rounded-full bg-white/5 backdrop-blur-md border border-white/10 group-hover:scale-110 transition-transform origin-center text-[#d4a437]">
                  <svg className="w-12 h-12" fill="none" stroke="currentColor" strokeWidth="1" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>
                </div>
              </div>
              <div className="relative z-10 w-full mt-auto">
                <h3 className="font-heading text-[24px] text-[var(--text-light)]">Copywriting</h3>
                <div className="flex flex-wrap gap-2 mt-[14px]">
                  <span className="px-[14px] py-[6px] rounded-full font-sans text-[13px] text-[#d4a437] bg-[#d4a437]/10 border border-[#d4a437]/30 group-hover:bg-[#d4a437] group-hover:text-[var(--bg-dark)] transition-colors">Content script</span>
                </div>
              </div>
            </motion.div>

            {/* Unit 6: Jangkauan Pasar (span 2) */}
            <motion.div variants={fadeUp} className="md:col-span-2 group relative overflow-hidden rounded-[20px] bg-[rgba(255,255,255,0.05)] backdrop-blur-[10px] pt-[28px] px-[28px] pb-[20px] border border-[rgba(212,164,55,0.2)] hover:border-[#d4a437] transition-all duration-300 hover:-translate-y-[6px] flex flex-col justify-between">
              {/* Siluet peta Asia Tenggara (emas 8%) */}
              <div className="absolute right-[-5%] top-[-5%] w-[60%] h-[110%] pointer-events-none opacity-[0.08] text-[#d4a437] group-hover:scale-105 transition-transform duration-500">
                <svg viewBox="0 0 100 100" fill="currentColor" className="w-full h-full object-contain">
                  <path d="M40,20 Q50,15 60,30 T80,40 T90,70 Q80,80 60,75 T30,60 T20,40 Z" />
                  <path d="M70,60 Q80,70 90,65 T85,50 Z" />
                  <path d="M25,65 Q35,75 40,85 T20,90 Z" />
                </svg>
              </div>

              {/* Optional Gold Badge */}
              <div className="hidden lg:flex absolute right-6 top-6 bg-[#d4a437] text-[var(--bg-dark)] text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-lg">
                Segera: Pasar Berikutnya
              </div>

              <div className="flex flex-col h-full justify-end relative z-10 w-full mt-auto">
                <div className="flex items-center gap-3 mb-5">
                  <div className="flex items-center gap-2">
                    <span className="w-8 h-8 rounded-full bg-white/10 text-lg flex items-center justify-center shadow-sm">🇮🇩</span>
                    <span className="font-heading text-lg text-[var(--text-light)]">Indonesia</span>
                  </div>
                  <div className="w-[1px] h-6 bg-white/10"></div>
                  <div className="flex items-center gap-2">
                    <span className="w-8 h-8 rounded-full bg-white/10 text-lg flex items-center justify-center shadow-sm">🇲🇾</span>
                    <span className="font-heading text-lg text-[var(--text-light)]">Malaysia</span>
                  </div>
                  <div className="w-[1px] h-6 bg-white/10"></div>
                  <div className="flex items-center gap-2">
                    <span className="w-8 h-8 rounded-full bg-white/10 text-lg flex items-center justify-center shadow-sm">🇵🇭</span>
                    <span className="font-heading text-lg text-[var(--text-light)]">Filipina</span>
                  </div>
                </div>

                <h3 className="font-heading text-[24px] text-[var(--text-light)]">Jangkauan Pasar</h3>
                <div className="flex flex-wrap gap-2 mt-[14px]">
                  <span className="px-[14px] py-[6px] rounded-full font-sans text-[13px] text-[#d4a437] bg-[#d4a437]/10 border border-[#d4a437]/30 group-hover:bg-[#d4a437] group-hover:text-[var(--bg-dark)] transition-colors">Ekspansi regional</span>
                </div>
              </div>
            </motion.div>

          </motion.div>

        </div>
      </section>

      {/* LAYANAN */}
      <section id="layanan" className="pt-[72px] pb-[64px] relative bg-[#f4f1ea] overflow-hidden">
        {/* Grain halus 3% */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.03] mix-blend-multiply z-0" style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noise%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.8%22 numOctaves=%224%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noise)%22/%3E%3C/svg%3E')" }}></div>

        <div className="max-w-[1200px] mx-auto px-6 relative z-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="text-center mb-[48px]">
            <motion.h2 variants={fadeUp} className="font-heading text-[44px] text-[#193060] leading-[1.1] max-w-2xl mx-auto">Dari riset sampai konversi,<br />dalam satu tim.</motion.h2>
          </motion.div>

          <div className="relative">

            {/* Desktop Horizontal Line + Arrows */}
            <div className="hidden md:block absolute top-[36px] left-[16%] right-[16%] h-[2px] z-0">
              <motion.div
                initial={{ clipPath: 'inset(0 100% 0 0)' }}
                whileInView={{ clipPath: 'inset(0 0 0 0)' }}
                transition={{ duration: 1.2, ease: "easeInOut" }}
                viewport={{ once: true }}
                className="w-full h-full"
              >
                <svg className="w-full h-full overflow-visible" preserveAspectRatio="none">
                  <line x1="0" y1="0" x2="100%" y2="0" stroke="rgba(212,164,55,0.5)" strokeWidth="2" strokeDasharray="6 6" />
                  {/* Arrow 1 */}
                  <svg x="33.33%" y="0" style={{ overflow: 'visible' }}>
                    <polygon points="-6,-6 6,0 -6,6" fill="#d4a437" />
                  </svg>
                  {/* Arrow 2 */}
                  <svg x="66.66%" y="0" style={{ overflow: 'visible' }}>
                    <polygon points="-6,-6 6,0 -6,6" fill="#d4a437" />
                  </svg>
                </svg>
              </motion.div>
            </div>

            {/* Mobile Vertical Line */}
            <div className="md:hidden absolute top-[36px] bottom-[36px] left-[35px] w-[2px] z-0">
              <motion.div
                initial={{ clipPath: 'inset(0 0 100% 0)' }}
                whileInView={{ clipPath: 'inset(0 0 0 0)' }}
                transition={{ duration: 1.2, ease: "easeInOut" }}
                viewport={{ once: true }}
                className="w-full h-full"
              >
                <svg className="w-full h-full overflow-visible" preserveAspectRatio="none">
                  <line x1="0" y1="0" x2="0" y2="100%" stroke="rgba(212,164,55,0.5)" strokeWidth="2" strokeDasharray="6 6" />
                  {/* Arrow 1 */}
                  <svg x="0" y="33.33%" style={{ overflow: 'visible' }}>
                    <polygon points="-6,-6 0,6 6,-6" fill="#d4a437" />
                  </svg>
                  {/* Arrow 2 */}
                  <svg x="0" y="66.66%" style={{ overflow: 'visible' }}>
                    <polygon points="-6,-6 0,6 6,-6" fill="#d4a437" />
                  </svg>
                </svg>
              </motion.div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-8 relative z-10">
              {servicesData.map((service, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.4 + i * 0.2 }}
                  className="relative flex flex-row md:flex-col items-start md:items-center text-left md:text-center group gap-6 md:gap-0"
                >
                  {/* Giant Watermark Number */}
                  <div className="absolute top-[36px] left-[36px] md:left-1/2 -translate-x-1/2 -translate-y-1/2 text-[96px] font-heading text-[#193060] opacity-[0.06] pointer-events-none leading-none z-0">
                    0{i + 1}
                  </div>

                  {/* Circle Icon Container */}
                  <div className="relative z-10 w-[72px] h-[72px] rounded-full bg-[#193060] flex items-center justify-center shrink-0 mb-0 md:mb-[20px]">
                    {/* Pulse Effect */}
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0 }}
                      whileInView={{ scale: 1.5, opacity: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.5, delay: 0.8 + i * 0.2, ease: "easeOut" }}
                      className="absolute inset-0 rounded-full border border-[#d4a437]"
                    />
                    <div className="text-[#d4a437]">
                      {i === 0 && <svg className="w-[32px] h-[32px]" fill="none" stroke="currentColor" strokeWidth="1" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" /></svg>}
                      {i === 1 && <svg className="w-[32px] h-[32px]" fill="none" stroke="currentColor" strokeWidth="1" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25h-9A2.25 2.25 0 002.25 7.5v9a2.25 2.25 0 002.25 2.25z" /></svg>}
                      {i === 2 && <svg className="w-[32px] h-[32px]" fill="none" stroke="currentColor" strokeWidth="1" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" /></svg>}
                    </div>
                  </div>

                  <div className="flex flex-col items-start md:items-center w-full relative z-10 pt-2 md:pt-0">
                    <h3 className="text-[26px] font-heading text-[#193060] mb-[10px]">{service.title}</h3>
                    <p className="text-[#193060]/70 font-sans text-[15px] leading-relaxed mb-[16px] line-clamp-3">
                      {service.desc}
                    </p>

                    <div className="flex flex-wrap gap-2 justify-start md:justify-center mt-auto">
                      {service.tags.map((tag, j) => (
                        <span key={j} className="text-[12px] font-bold uppercase tracking-wider bg-transparent border border-[#193060]/20 text-[#193060] px-3 py-1.5 rounded-full hover:bg-[#193060] hover:text-[#f4f1ea] transition-colors cursor-default">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                </motion.div>
              ))}
            </div>

          </div>

          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 1.2 }} viewport={{ once: true }} className="mt-[40px] text-center">
            <p className="text-[13px] font-sans text-[#193060]/60 tracking-wider uppercase font-semibold">
              Satu tim, satu alur — dari produk sampai penjualan.
            </p>
          </motion.div>

        </div>
      </section>


      {/* LIFE AT KURMA */}
      <section id="life" className="section-dark pt-[88px] pb-[96px]">

        <div className="max-w-[1200px] mx-auto px-6 relative z-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="mb-12">
            <motion.span variants={fadeUp} className="text-amber-soft font-bold tracking-wide">Life at Kurma Group</motion.span>
            <motion.h2 variants={fadeUp} className="font-heading text-4xl md:text-5xl text-white mt-2">Seperti inilah bekerja di sini.</motion.h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="grid grid-cols-1 md:grid-cols-4 gap-4 auto-rows-[250px]"
          >
            {/* Row 1 */}
            <motion.div variants={fadeUp} className="md:col-span-2 rounded-2xl overflow-hidden relative group">
              <img src="/images/full-team.jpg" alt="Life at Kurma" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            </motion.div>
            <motion.div variants={fadeUp} className="md:col-span-1 rounded-2xl overflow-hidden relative group">
              <img src="/images/quotes.jpg" alt="Life at Kurma" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            </motion.div>
            <motion.div variants={fadeUp} className="md:col-span-1 rounded-2xl overflow-hidden relative group">
              <img src="/images/work1.jpg" alt="Life at Kurma" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            </motion.div>

            {/* Row 2 */}
            <motion.div variants={fadeUp} className="md:col-span-1 rounded-2xl overflow-hidden relative group">
              <img src="/images/meeting2.jpg" alt="Life at Kurma" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            </motion.div>
            <motion.div variants={fadeUp} className="md:col-span-1 rounded-2xl overflow-hidden relative group">
              <img src="/images/nobar.jpg" alt="Life at Kurma" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            </motion.div>
            <motion.div variants={fadeUp} className="md:col-span-2 rounded-2xl overflow-hidden relative group">
              <img src="/images/olahraga.jpg" alt="Life at Kurma" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            </motion.div>

            {/* Row 3 */}
            <motion.div variants={fadeUp} className="md:col-span-1 rounded-2xl overflow-hidden relative group">
              <img src="/images/work2.jpg" alt="Life at Kurma" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            </motion.div>
            <motion.div variants={fadeUp} className="md:col-span-1 rounded-2xl overflow-hidden relative group">
              <img src="/images/bukber1.jpg" alt="Life at Kurma" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            </motion.div>
            <motion.div variants={fadeUp} className="md:col-span-1 rounded-2xl overflow-hidden relative group">
              <img src="/images/makan1.jpeg" alt="Life at Kurma" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            </motion.div>
            <motion.div variants={fadeUp} className="md:col-span-1 rounded-2xl overflow-hidden relative group">
              <img src="/images/1.png" alt="Life at Kurma" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            </motion.div>
          </motion.div>

        </div>
      </section>

      {/* BERGABUNG CTA SECTION */}
      <section className="bg-[var(--bg-light)] pt-[88px] pb-[96px] relative overflow-hidden">
        <div className="absolute right-[-40px] bottom-[-40px] pointer-events-none opacity-[0.06] text-[var(--bg-dark)] rotate-[-15deg] w-[350px] h-[350px] z-0">
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
            <path d="M17,8C8,10 5.9,16.17 3.82,21.34L5.71,22L6.66,19.7C7.14,19.87 7.64,20 8,20C19,20 22,3 22,3C21,5 14,5.25 9,6.25C4,7.25 2,11.5 2,13.5C2,15.5 3.75,17.25 3.75,17.25C7,8 17,8 17,8Z" />
          </svg>
        </div>

        <div className="max-w-[1200px] mx-auto px-6 relative z-10 flex flex-col md:grid md:grid-cols-[1.2fr_1fr] gap-16 items-center">
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={stagger}
            className="order-2 md:order-1"
          >
            <motion.span variants={fadeUp} className="text-sm font-bold tracking-widest text-[#d4a437] uppercase mb-4 block">
              Bergabung Dengan Kami
            </motion.span>
            <motion.h2 variants={fadeUp} className="font-heading text-4xl md:text-[44px] text-[var(--bg-dark)] leading-tight mb-6">
              Tumbuh bersama tim yang membangun brand dari nol.
            </motion.h2>
            <motion.p variants={fadeUp} className="text-[17px] text-[var(--bg-dark)]/75 font-sans leading-relaxed mb-8 max-w-[500px]">
              Dapatkan kesempatan belajar dari data nyata, bertumbuh dengan cepat dalam lingkungan yang dinamis, dan kembangkan jalur karier yang terbuka lebar.
            </motion.p>

            <motion.div variants={fadeUp} className="space-y-4 mb-10">
              {['Bonus berbasis performa', 'Tim yang saling dukung', 'Jalur karier dari staff ke manager'].map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="flex-shrink-0 w-5 h-5 rounded-full bg-[#d4a437]/20 flex items-center justify-center text-[#d4a437]">
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="font-medium text-[var(--bg-dark)]/80 text-[15px]">{item}</span>
                </div>
              ))}
            </motion.div>

            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
              <Link to="/karier" className="w-full sm:w-auto inline-flex items-center justify-center bg-[#d4a437] text-[var(--bg-dark)] font-medium py-[16px] px-[36px] text-base hover:-translate-y-1 hover:shadow-lg transition-all rounded-full whitespace-nowrap group">
                Lihat Halaman Karier
                <svg className="w-5 h-5 ml-2 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
              <a href="#" className="text-[var(--bg-dark)]/80 hover:text-[#d4a437] font-medium text-[15px] transition-colors whitespace-nowrap text-center w-full sm:w-auto">
                atau hubungi HR via WhatsApp
              </a>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="order-1 md:order-2 relative w-full h-[350px] md:h-[450px]"
          >
            {/* Back photo */}
            <div className="absolute top-0 right-0 w-[80%] h-[75%] rounded-[20px] overflow-hidden border border-[#d4a437]/30 shadow-lg">
              <img src="/images/bukber1.jpg" alt="Tim Kurma" className="w-full h-full object-cover" />
            </div>

            {/* Front photo */}
            <div className="absolute bottom-0 left-0 w-[70%] h-[70%] rounded-[20px] overflow-hidden border-[4px] border-[var(--text-light)] shadow-xl z-10">
              <img src="/images/full-team.jpg" alt="Tim Kurma" className="w-full h-full object-cover" />
            </div>

            {/* Glass badge */}
            <div className="absolute bottom-[30px] right-[-10px] md:right-[-20px] z-20 bg-white/70 backdrop-blur-md border border-white/50 shadow-[0_8px_32px_rgba(0,0,0,0.1)] rounded-2xl p-4 flex flex-col items-center justify-center pointer-events-none">
              <span className="font-heading text-3xl text-[#d4a437] mb-1 leading-none">70+</span>
              <span className="text-xs font-bold uppercase tracking-wider text-[var(--bg-dark)]/70">Anggota Tim</span>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
