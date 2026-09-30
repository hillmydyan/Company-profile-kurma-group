import { useRef, useEffect, useState } from 'react';
import { motion, useInView, useMotionValue, useTransform, animate, useScroll, useReducedMotion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { Link } from 'react-router-dom';

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const } }
};

const stagger: Variants = {
  visible: { transition: { staggerChildren: 0.15 } }
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
      <motion.div className="font-heading text-[36px] md:text-[40px] text-[#d4a437] mb-1 leading-none">{rounded}</motion.div>
      <div className="text-[14px] md:text-[16px] text-[#f4f1ea]/60 tracking-wide font-sans">{label}</div>
    </div>
  );
}

export default function About() {
  const { scrollY } = useScroll();
  const yBg = useTransform(scrollY, [0, 1000], [0, 300]);
  const yPhoto = useTransform(scrollY, [0, 1000], [0, -40]);
  const prefersReducedMotion = useReducedMotion();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const milestones = [
    { year: "2019", title: "Awal Mula", desc: "Berawal dari tim kecil yang mengelola campaign brand lokal." },
    { year: "2020", title: "Membangun Tim", desc: "Mulai merekrut talenta kreatif dan memperkuat pondasi operasional." },
    { year: "2022", title: "Ekspansi", desc: "Memperluas layanan ke berbagai kategori industri dan brand." },
    { year: "2024", title: "Scaling Up", desc: "Mengembangkan ekosistem e-commerce dan produksi skala besar." },
    { year: "2026", title: "The Next Chapter", desc: "Visi baru menuju ekosistem bisnis digital terintegrasi." },
  ];

  const values = [
    { title: "Riset yang dalam", desc: "Keputusan kami selalu didasari oleh pemahaman audiens." },
    { title: "Eksekusi cepat", desc: "Bergerak tangkas untuk merespons perubahan pasar." },
    { title: "Tim yang belajar", desc: "Kesalahan adalah proses, belajar adalah kewajiban." },
    { title: "Tumbuh berkelanjutan", desc: "Membangun ekosistem yang sehat untuk jangka panjang." }
  ];

  return (
    <div className="bg-[#f4f1ea] min-h-screen overflow-hidden text-[#0f2a1e]">

      {/* SECTION 1: Cinematic Hero */}
      <section className="relative w-full flex flex-col justify-center overflow-hidden bg-[#05081E] pt-[120px] pb-[60px] md:pt-[130px] md:pb-[80px]">
        {/* Parallax Background */}
        <motion.div
          style={{ y: yBg }}
          className="absolute top-[-20%] left-0 w-full h-[140%] z-0 hidden md:block"
        >
          <img
            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1600&q=80"
            alt="Tim Kurma Group"
            className="w-full h-full object-cover object-[center_right] saturate-[0.8]"
          />
        </motion.div>

        {/* Mobile static bg */}
        <div className="absolute top-0 left-0 w-full h-full z-0 block md:hidden">
          <img
            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1600&q=80"
            alt="Tim Kurma Group"
            className="w-full h-full object-cover object-[center_right] saturate-[0.8]"
          />
        </div>

        {/* Overlays */}
        <div className="absolute inset-0 z-0 pointer-events-none" style={{ background: 'linear-gradient(90deg, rgba(5,8,30,0.95) 0%, rgba(25,48,96,0.85) 50%, rgba(25,48,96,0.4) 100%)' }}></div>
        <div className="absolute inset-0 bg-[#193060] mix-blend-multiply opacity-40 z-0 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-full h-[30%] bg-gradient-to-t from-[#05081E] to-transparent z-0 pointer-events-none"></div>
        <div className="absolute inset-0 opacity-[0.04] mix-blend-overlay z-0 pointer-events-none" style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noise%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.8%22 numOctaves=%224%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noise)%22/%3E%3C/svg%3E')" }}></div>

        {/* Content Container */}
        <div className="max-w-[1100px] mx-auto px-6 relative z-10 w-full flex flex-col gap-10 md:gap-14 my-auto">

          {/* Top Row: Text & Photo */}
          <div className="w-full flex flex-col md:flex-row items-center justify-between gap-10 md:gap-12">

            {/* Kolom Kiri - Teks */}
            <div className="flex-shrink-0 flex flex-col items-start w-full md:w-[50%] md:max-w-[480px]">
              {/* Label Emas */}
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="flex items-center gap-3 mb-5 md:mb-6">
                <div className="w-[40px] h-[1px] bg-[#d4a437]"></div>
                <span className="text-[#d4a437] text-[12px] md:text-[13px] font-semibold tracking-widest uppercase">Tentang Kami</span>
              </motion.div>

              {/* Headline */}
              <motion.div
                initial="hidden" animate="visible"
                variants={{ visible: { transition: { staggerChildren: 0.12 } }, hidden: {} }}
                className="w-full mb-6 md:mb-8"
              >
                <h1 className="font-heading text-[26px] md:text-[32px] text-[#f4f1ea] leading-[1.3] text-balance">
                  <motion.span variants={fadeUp}>Kurma Group adalah perusahaan yang bergerak di bidang digital marketing, content creation, e-commerce, dan brand development. Kami percaya brand terbaik lahir dari <span className="text-[#d4a437] italic font-light">riset yang dalam, eksekusi yang cepat, dan tim yang terus belajar.</span></motion.span>
                </h1>
              </motion.div>

              {/* Paragraph & Meta */}
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4 }} className="flex flex-col gap-6">
                <p className="font-sans text-[16px] md:text-[17px] text-[#f4f1ea]/80 leading-[1.7]">
                  Kami membangun ekosistem yang memadukan riset, konten, dan sistem.
                </p>
                <div className="font-sans text-[12px] text-[#d4a437] uppercase tracking-[3px] font-bold">
                  Berdiri 2019 &middot; Bandar Lampung &middot; 70+ Anggota Tim
                </div>
              </motion.div>
            </div>

            {/* Kolom Kanan - Foto Owner */}
            <div className="w-full md:w-[50%] flex justify-center md:justify-end relative mt-8 md:mt-0">
              {/* Parallax Container */}
              <motion.div style={{ y: prefersReducedMotion ? 0 : yPhoto }} className="relative z-10">
                {/* Floating Animation */}
                <motion.div
                  animate={{ y: prefersReducedMotion ? 0 : [0, isMobile ? -5 : -8, 0] }}
                  transition={{ duration: 6, ease: "easeInOut", repeat: Infinity }}
                  className="relative w-[200px] md:w-[240px] lg:w-[280px] aspect-[4/5] rounded-[24px] shadow-[0_15px_30px_rgba(5,8,30,0.6),0_0_40px_rgba(212,164,55,0.08)]"
                >
                  {/* Subtle Gold Glow Behind */}
                  <div className="absolute inset-[-20px] bg-[#d4a437] opacity-[0.06] blur-[35px] rounded-full pointer-events-none"></div>

                  {/* Photo container */}
                  <div className="relative w-full h-full rounded-[24px] overflow-hidden border border-[rgba(212,164,55,0.2)] bg-[#05081E]">
                    <img
                      src="/images/owner.jpeg"
                      alt="Owner Kurma Group"
                      className="w-full h-full object-cover saturate-[0.85]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#05081E]/60 via-[#05081E]/5 to-transparent"></div>
                  </div>

                  {/* Decorative Elements */}
                  {!prefersReducedMotion && (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }} transition={{ duration: 30, ease: "linear", repeat: Infinity }}
                        className="absolute -top-3 -right-3 w-10 h-10 rounded-full border border-[#d4a437]/20 pointer-events-none"
                      ></motion.div>
                      <motion.div
                        animate={{ y: [0, 6, 0] }} transition={{ duration: 8, ease: "easeInOut", repeat: Infinity, delay: 1 }}
                        className="absolute -bottom-4 -left-4 w-12 h-12 rounded-full border border-[#d4a437]/15 pointer-events-none"
                      ></motion.div>
                    </>
                  )}
                </motion.div>
              </motion.div>
            </div>
          </div>

          {/* Bottom Row: Statistic Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4 }}
            className="w-full bg-[rgba(10,18,50,0.4)] backdrop-blur-md rounded-[20px] md:rounded-[24px] shadow-[0_20px_40px_rgba(5,8,30,0.3)] overflow-hidden border border-[rgba(212,164,55,0.15)] relative z-20 mt-2"
          >
            <div className="flex flex-col md:flex-row w-full py-6 px-8 md:py-[28px] md:px-[48px] gap-6 md:gap-0 justify-between items-center md:items-start">

              <div className="flex-1 flex w-full md:w-auto items-center md:items-start justify-center md:justify-start border-b md:border-b-0 md:border-r border-[rgba(244,241,234,0.08)] pb-5 md:pb-0">
                <CountUpStat value={7} suffix=" Tahun" label="Berdiri Sejak" />
              </div>

              <div className="flex-1 flex w-full md:w-auto items-center md:items-start justify-center md:justify-center border-b md:border-b-0 md:border-r border-[rgba(244,241,234,0.08)] py-5 md:py-0">
                <CountUpStat value={3} suffix=" Unit" label="Lini Bisnis" />
              </div>

              <div className="flex-1 flex w-full md:w-auto items-center md:items-start justify-center md:justify-end pt-5 md:pt-0">
                <CountUpStat value={1000} suffix="+" label="Akun Dikelola" />
              </div>

            </div>
          </motion.div>

        </div>
      </section>

      {/* SECTION 3: Nilai Kami */}
      <section className="py-24 bg-[#f4f1ea]">
        <div className="max-w-[1200px] mx-auto px-6">
          <motion.h2 initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="font-heading text-4xl md:text-5xl text-center mb-16 text-[#0f2a1e]">
            Yang kami pegang
          </motion.h2>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((val, i) => (
              <motion.div key={i} variants={fadeUp} className="bg-white p-8 rounded-2xl border border-[rgba(15,42,30,0.1)] hover:-translate-y-1 hover:shadow-[0_12px_24px_rgba(15,42,30,0.06)] transition-all duration-300">
                <div className="w-12 h-12 rounded-full border border-[#d4a437] flex items-center justify-center mb-6 text-[#d4a437]">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="font-heading text-2xl font-semibold mb-3 text-[#0f2a1e]">{val.title}</h3>
                <p className="text-sm text-[#0f2a1e]/70 leading-relaxed font-light">{val.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* SECTION 4: Perjalanan Kami */}
      <section className="section-dark-alt py-32 text-[#f4f1ea]">
        <div className="max-w-[1200px] mx-auto px-6">
          <motion.h2 initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="font-heading text-4xl md:text-5xl text-center mb-24 text-[#f4f1ea]">
            Dari tim kecil menjadi ekosistem.
          </motion.h2>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="relative w-full pb-16">

            {/* Desktop Horizontal Line */}
            <div className="hidden md:block absolute top-[15px] left-0 right-0 h-[1px] bg-[#d4a437]/50" />

            {/* Mobile Vertical Line */}
            <div className="block md:hidden absolute top-0 bottom-0 left-[23px] w-[1px] bg-[#d4a437]/50" />

            <div className="flex flex-col md:flex-row justify-between gap-12 md:gap-4 relative z-10">
              {milestones.map((m, i) => (
                <motion.div key={i} variants={fadeUp} className="flex md:flex-col items-start gap-6 md:gap-8 flex-1">

                  {/* Dot */}
                  <div className="relative shrink-0">
                    <div className="w-[32px] h-[32px] rounded-full bg-[#0f2a1e] border border-[#d4a437] flex items-center justify-center mx-1 md:mx-auto z-10">
                      <div className="w-2 h-2 rounded-full bg-[#d4a437]" />
                    </div>
                  </div>

                  {/* Card */}
                  <div className="flex-1 w-full bg-[rgba(255,255,255,0.06)] backdrop-blur-[12px] border border-[rgba(212,164,55,0.3)] rounded-[20px] p-6 text-left">
                    <div className="font-heading text-[#d4a437] text-[32px] mb-2 leading-none">{m.year}</div>
                    <h3 className="font-heading text-[20px] font-semibold text-[#f4f1ea] mb-2">{m.title}</h3>
                    <p className="text-[14px] text-[#f4f1ea]/70 leading-relaxed font-sans">{m.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>

          </motion.div>
        </div>
      </section>

      {/* SECTION 5: CTA */}
      <section className="py-24 bg-[#f4f1ea] text-center">
        <div className="max-w-3xl mx-auto px-6">
          <motion.h2 initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="font-heading text-[40px] text-[#0f2a1e] mb-10">
            Ingin tumbuh bersama kami?
          </motion.h2>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="flex flex-col sm:flex-row gap-5 justify-center">
            <motion.div variants={fadeUp}>
              <Link to="/karier" className="inline-flex items-center justify-center bg-[#d4a437] text-[#0f2a1e] font-medium py-3 px-8 rounded-full hover:shadow-[0_4px_16px_rgba(212,164,55,0.4)] hover:-translate-y-1 transition-all">
                Bergabung
              </Link>
            </motion.div>
            <motion.div variants={fadeUp}>
              <Link to="/karier" className="inline-flex items-center justify-center border border-[#0f2a1e] text-[#0f2a1e] font-medium py-3 px-8 rounded-full hover:bg-[#0f2a1e]/5 hover:-translate-y-1 transition-all">
                Lihat Karier
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
