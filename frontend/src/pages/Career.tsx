import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { motion, Variants } from 'framer-motion';
import { useEffect, useRef } from 'react';
import './CareerJenjang.css';

interface Job {
  id: number;
  title: string;
  department: string;
  location: string;
  type: string;
  created_at?: string;
}

const fetchJobs = async (): Promise<Job[]> => {
  const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';
  const res = await fetch(`${apiUrl}/jobs`);
  if (!res.ok) throw new Error('Failed to fetch jobs');
  return res.json();
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const } }
};

const stagger: Variants = {
  visible: { transition: { staggerChildren: 0.1 } }
};

export default function Career() {
  const { data: jobs, isLoading, error } = useQuery({ queryKey: ['jobs'], queryFn: fetchJobs });
  const openPositions = jobs?.length || 0;

  const jenjangRef = useRef<HTMLElement>(null);
  useEffect(() => {
    const root = jenjangRef.current;
    if (!root || !('IntersectionObserver' in window)) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    
    root.classList.add('kgj--anim');
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          root.classList.add('is-in');
          io.disconnect();
        }
      });
    }, { threshold: 0.25 });
    
    const stairs = root.querySelector('.kgj__stairs');
    if (stairs) io.observe(stairs);
    
    return () => io.disconnect();
  }, []);

  return (
    <div className="bg-[var(--bg-light)] min-h-screen overflow-hidden font-body">

      {/* 1. HERO */}
      <section className="relative pt-[120px] pb-[64px] lg:pt-[160px] lg:pb-[100px] bg-[var(--bg-darkest)] rounded-b-[40px] lg:rounded-b-[80px] overflow-hidden z-10">
        
        {/* Background Depth & Lights */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          {/* Base gradient */}
          <div className="absolute inset-0 bg-gradient-to-b from-[var(--bg-darkest)] via-[var(--bg-dark)] to-[var(--bg-darkest)] opacity-80"></div>
          
          {/* Blurs */}
          <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-[var(--bg-mid)] blur-[120px] opacity-40"></div>
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-[var(--accent)] blur-[150px] opacity-20"></div>
          
          {/* Watermark Logo */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] opacity-[0.03] flex items-center justify-center">
             <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full text-white">
              <path d="M17,8C8,10 5.9,16.17 3.82,21.34L5.71,22L6.66,19.7C7.14,19.87 7.64,20 8,20C19,20 22,3 22,3C21,5 14,5.25 9,6.25C4,7.25 2,11.5 2,13.5C2,15.5 3.75,17.25 3.75,17.25C7,8 17,8 17,8Z" />
            </svg>
          </div>
        </div>

        <div className="max-w-[1200px] mx-auto px-6 relative z-10">
          <motion.div 
            initial="hidden" 
            animate="visible" 
            variants={stagger}
            className="flex flex-col lg:flex-row items-center gap-12 lg:gap-8"
          >
            {/* Kiri: Teks */}
            <div className="w-full lg:w-1/2 flex flex-col items-start text-left">
              <motion.div variants={fadeUp} className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[var(--text-light)] text-sm font-medium mb-6">
                Karier di Kurma Group
              </motion.div>
              
              <motion.h1 variants={fadeUp} className="text-4xl lg:text-[56px] font-heading text-white leading-[1.15] mb-6">
                Tempat yang tepat untuk orang yang ingin <span className="text-[var(--accent)] italic font-light">membangun,</span> bukan sekadar bekerja.
              </motion.h1>
              
              <motion.p variants={fadeUp} className="text-lg text-white/70 max-w-[500px] mb-8 leading-relaxed font-light">
                Kami sedang bertumbuh cepat, dan kami mencari orang-orang yang punya kapabilitas untuk tumbuh lebih cepat lagi. Jika Anda terbiasa memimpin, mengambil keputusan, dan bertanggung jawab atas hasil — kami ingin mengenal Anda.
              </motion.p>
              
              <motion.div variants={fadeUp} className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
                <a href="#lowongan" className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 rounded-full bg-[var(--accent)] text-[var(--bg-darkest)] font-semibold text-[16px] transition-transform hover:-translate-y-1 shadow-[0_8px_24px_rgba(212,164,55,0.3)]">
                  Lihat lowongan
                </a>
                <a href="#jenjang-karier" className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 rounded-full bg-white/5 backdrop-blur-md border border-white/10 text-white font-medium text-[16px] transition-all hover:bg-white/10 hover:border-white/30">
                  Lihat jenjang karier
                </a>
              </motion.div>
            </div>

            {/* Kanan: Visual Composition */}
            <motion.div variants={fadeUp} className="w-full lg:w-1/2 relative h-[400px] lg:h-[500px] flex justify-center items-center">
              
              {/* Animation Styles */}
              <style>{`
                @keyframes float-slow {
                  0%, 100% { transform: translateY(0); }
                  50% { transform: translateY(-15px); }
                }
                @keyframes float-delayed {
                  0%, 100% { transform: translateY(0); }
                  50% { transform: translateY(-10px); }
                }
                @keyframes shimmer {
                  0% { transform: translateX(-100%); }
                  100% { transform: translateX(100%); }
                }
              `}</style>

              {/* Card 1: Jenjang Karier Mini */}
              <div 
                className="absolute left-[5%] lg:left-[10%] top-[20%] w-[260px] bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-5 shadow-[0_20px_40px_rgba(0,0,0,0.3)] z-10"
                style={{ animation: 'float-slow 6s ease-in-out infinite' }}
              >
                <div className="text-white/60 text-xs font-semibold uppercase tracking-wider mb-3">Jenjang Karier</div>
                <div className="space-y-2">
                  <div className="h-8 rounded-lg bg-white/5 border border-white/5 flex items-center px-3 opacity-60">
                    <div className="w-2 h-2 rounded-full bg-white/20 mr-3"></div>
                    <span className="text-white/70 text-sm">Supervisor</span>
                  </div>
                  <div className="h-12 rounded-lg bg-[var(--accent)]/20 border border-[var(--accent)] flex items-center px-3 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[var(--accent)]/20 to-transparent opacity-50 animate-[shimmer_2s_infinite]"></div>
                    <div className="w-2 h-2 rounded-full bg-[var(--accent)] mr-3 shadow-[0_0_8px_var(--accent)]"></div>
                    <div className="flex flex-col relative z-10">
                      <span className="text-[10px] text-[var(--accent)] leading-none mb-1">Posisi yang dibuka</span>
                      <span className="text-white font-heading text-lg leading-none">{jobs && jobs.length > 0 ? jobs[0].title : 'Manager'}</span>
                    </div>
                  </div>
                  <div className="h-8 rounded-lg bg-white/5 border border-white/5 flex items-center px-3 opacity-60">
                    <div className="w-2 h-2 rounded-full bg-white/20 mr-3"></div>
                    <span className="text-white/70 text-sm">Head of Division</span>
                  </div>
                </div>
              </div>

              {/* Card 2: Jumlah Posisi */}
              <div 
                className="absolute right-[5%] lg:right-[15%] bottom-[15%] lg:bottom-[25%] bg-[var(--bg-mid)]/80 backdrop-blur-md border border-white/15 rounded-2xl p-6 shadow-[0_20px_40px_rgba(0,0,0,0.4)] z-20"
                style={{ animation: 'float-delayed 5s ease-in-out infinite 1s' }}
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-[var(--accent)] flex items-center justify-center text-[var(--bg-darkest)]">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <div className="font-heading text-3xl text-white leading-none mb-1">{openPositions}</div>
                    <div className="text-white/70 text-sm">posisi sedang dibuka</div>
                  </div>
                </div>
              </div>

              {/* Decorative Lines/Dots behind cards */}
              <svg className="absolute inset-0 w-full h-full z-0 opacity-20 pointer-events-none" viewBox="0 0 400 400">
                 <circle cx="200" cy="200" r="150" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" className="text-[var(--accent)]" />
                 <circle cx="200" cy="200" r="100" fill="none" stroke="currentColor" strokeWidth="1" className="text-white" />
              </svg>

            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* 2. JENJANG KARIER (Dari HTML Baru) */}
      <section className="kgj" aria-labelledby="kgj-title" id="jenjang-karier" ref={jenjangRef}>
        <div className="kgj__wrap">

          <header className="kgj__head">
            <div>
              <p className="kgj__eyebrow">Jenjang Karier</p>
              <h2 className="kgj__title" id="kgj-title">Posisi awal tidak menentukan sejauh mana Anda bisa melangkah.</h2>
            </div>
            <div>
              <p className="kgj__lead">Jalur kenaikan di Kurma Group jelas dan terbuka bagi siapa pun:</p>
              <ol className="kgj__flow">
                <li><span className="kgj__chip">Performa</span></li>
                <li><span className="kgj__chip">Kepemimpinan</span></li>
                <li><span className="kgj__chip">Dampak</span></li>
                <li><span className="kgj__chip">Promosi</span></li>
              </ol>
            </div>
          </header>

          <ol className="kgj__stairs">
            <li className="kgj__step" style={{ '--i': 0 } as React.CSSProperties}>
              <span className="kgj__no">01</span>
              <span className="kgj__text"><span className="kgj__role">Staff</span></span>
            </li>
            <li className="kgj__step" style={{ '--i': 1 } as React.CSSProperties}>
              <span className="kgj__no">02</span>
              <span className="kgj__text"><span className="kgj__role">Senior Staff</span></span>
            </li>
            <li className="kgj__step" style={{ '--i': 2 } as React.CSSProperties}>
              <span className="kgj__no">03</span>
              <span className="kgj__text"><span className="kgj__role">Supervisor</span></span>
            </li>
            <li className="kgj__step kgj__step--open" style={{ '--i': 3 } as React.CSSProperties}>
              <span className="kgj__no">04</span>
              <span className="kgj__text">
                <span className="kgj__open">Posisi yang dibuka</span>
                <span className="kgj__role">{jobs && jobs.length > 0 ? jobs[0].title : 'Manager'}</span>
              </span>
            </li>
            <li className="kgj__step" style={{ '--i': 4 } as React.CSSProperties}>
              <span className="kgj__no">05</span>
              <span className="kgj__text"><span className="kgj__role">Head of Division</span></span>
            </li>
            <li className="kgj__step" style={{ '--i': 5 } as React.CSSProperties}>
              <span className="kgj__no">06</span>
              <span className="kgj__text"><span className="kgj__role">Director / Executive</span></span>
            </li>
          </ol>

        </div>
      </section>

      <section className="py-20 px-6 bg-white">
        <div className="max-w-[1200px] mx-auto">
          <p className="text-sm font-bold text-[var(--accent)] uppercase tracking-wider mb-2">Apa yang Anda Dapatkan</p>
          <h2 className="text-3xl md:text-4xl font-heading text-[var(--bg-darkest)] mb-10">Lebih dari sekadar gaji.</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            <article className="p-6 bg-[var(--bg-light)]/50 rounded-xl border border-[var(--text-muted)]/30">
              <h3 className="font-heading text-xl mb-2 text-[var(--bg-darkest)]">Kompensasi</h3>
              <p className="text-[var(--bg-dark)]/80">Gaji bulanan, tunjangan makan, insentif performa, dan bonus pencapaian target.</p>
            </article>
            <article className="p-6 bg-[var(--bg-light)]/50 rounded-xl border border-[var(--text-muted)]/30">
              <h3 className="font-heading text-xl mb-2 text-[var(--bg-darkest)]">Pengembangan</h3>
              <p className="text-[var(--bg-dark)]/80">Training internal, leadership development, dan workshop.</p>
            </article>
            <article className="p-6 bg-[var(--bg-light)]/50 rounded-xl border border-[var(--text-muted)]/30">
              <h3 className="font-heading text-xl mb-2 text-[var(--bg-darkest)]">Career Growth</h3>
              <p className="text-[var(--bg-dark)]/80">Staff → Senior → Leader → Supervisor → Manager</p>
            </article>
            <article className="p-6 bg-[var(--bg-light)]/50 rounded-xl border border-[var(--text-muted)]/30">
              <h3 className="font-heading text-xl mb-2 text-[var(--bg-darkest)]">Fasilitas</h3>
              <p className="text-[var(--bg-dark)]/80">Kebutuhan komunikasi, Laptop/PC, Perlengkapan Kerja, Pantry</p>
            </article>
            <article className="p-6 bg-[var(--bg-light)]/50 rounded-xl border border-[var(--text-muted)]/30">
              <h3 className="font-heading text-xl mb-2 text-[var(--bg-darkest)]">Perks</h3>
              <p className="text-[var(--bg-dark)]/80">Employee gathering, team activities, dan company events.</p>
            </article>
            <article className="p-6 bg-[var(--bg-light)]/50 rounded-xl border border-[var(--text-muted)]/30">
              <h3 className="font-heading text-xl mb-2 text-[var(--bg-darkest)]">Apresiasi</h3>
              <p className="text-[var(--bg-dark)]/80">Penghargaan atas kontribusi dan pencapaian tim.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="py-20 px-6">
        <div className="max-w-[1200px] mx-auto">
          <p className="text-sm font-bold text-[var(--accent)] uppercase tracking-wider mb-2">90 Hari Pertama</p>
          <h2 className="text-3xl md:text-4xl font-heading text-[var(--bg-darkest)] mb-10">Built for impact. Designed for growth.</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <article className="p-6 bg-white rounded-xl border-t-4 border-[var(--accent)] shadow-sm">
              <p className="text-sm font-bold text-[var(--accent)] mb-2">Hari 01–30</p>
              <h3 className="font-heading text-2xl mb-4 text-[var(--bg-darkest)]">Memahami</h3>
              <ul className="list-disc pl-5 space-y-2 text-[var(--bg-dark)]/80">
                <li>Memahami perusahaan, tim, alur kerja & KPI</li>
                <li>Memahami peran dan ekspektasi sebagai leader</li>
                <li>Membangun hubungan & komunikasi dengan anggota tim</li>
                <li>Mulai mengambil ownership atas pekerjaan</li>
              </ul>
            </article>
            <article className="p-6 bg-white rounded-xl border-t-4 border-[var(--accent)] shadow-sm">
              <p className="text-sm font-bold text-[var(--accent)] mb-2">Hari 31–60</p>
              <h3 className="font-heading text-2xl mb-4 text-[var(--bg-darkest)]">Memperbaiki</h3>
              <ul className="list-disc pl-5 space-y-2 text-[var(--bg-dark)]/80">
                <li>Mengidentifikasi bottleneck & akar masalah</li>
                <li>Memperbaiki alur kerja</li>
                <li>Mulai memimpin briefing / koordinasi tim</li>
                <li>Membangun ritme kerja & accountability</li>
                <li>Mulai mengukur dampak dari perbaikan</li>
              </ul>
            </article>
            <article className="p-6 bg-white rounded-xl border-t-4 border-[var(--accent)] shadow-sm">
              <p className="text-sm font-bold text-[var(--accent)] mb-2">Hari 61–90</p>
              <h3 className="font-heading text-2xl mb-4 text-[var(--bg-darkest)]">Memimpin</h3>
              <ul className="list-disc pl-5 space-y-2 text-[var(--bg-dark)]/80">
                <li>Bertanggung jawab terhadap KPI & outcome tim</li>
                <li>Memimpin tim dalam aktivitas dan pencapaian target</li>
                <li>Mendelegasikan pekerjaan</li>
                <li>Membangun sistem kerja yang lebih sustainable</li>
                <li>Coaching & mengembangkan anggota tim</li>
                <li>Memberikan solusi dan mengambil keputusan secara mandiri</li>
              </ul>
            </article>
          </div>
        </div>
      </section>

      <section className="py-20 px-6 bg-white">
        <div className="max-w-[1200px] mx-auto">
          <p className="text-sm font-bold text-[var(--accent)] uppercase tracking-wider mb-2">Ekspektasi Kami</p>
          <h2 className="text-3xl md:text-4xl font-heading text-[var(--bg-darkest)] mb-10">Kami memberi ruang besar, dan kami meminta yang terbaik.</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <article className="p-6 bg-[var(--bg-light)]/30 rounded-xl">
              <h3 className="font-heading text-xl mb-2 text-[var(--bg-darkest)]">Own Your Role</h3>
              <p className="text-[var(--bg-dark)]/80">Bertanggung jawab penuh atas keputusan Anda.</p>
            </article>
            <article className="p-6 bg-[var(--bg-light)]/30 rounded-xl">
              <h3 className="font-heading text-xl mb-2 text-[var(--bg-darkest)]">Lead With Example</h3>
              <p className="text-[var(--bg-dark)]/80">Tim Anda mengikuti apa yang Anda contohkan.</p>
            </article>
            <article className="p-6 bg-[var(--bg-light)]/30 rounded-xl">
              <h3 className="font-heading text-xl mb-2 text-[var(--bg-darkest)]">Keep Learning</h3>
              <p className="text-[var(--bg-dark)]/80">Pasar berubah — kita berubah bersamanya.</p>
            </article>
            <article className="p-6 bg-[var(--bg-light)]/30 rounded-xl">
              <h3 className="font-heading text-xl mb-2 text-[var(--bg-darkest)]">Deliver Results</h3>
              <p className="text-[var(--bg-dark)]/80">Ide itu penting. Eksekusi jauh lebih penting.</p>
            </article>
          </div>
        </div>
      </section>

      <section id="lowongan" className="py-24 px-6 bg-[var(--bg-light)]">
        <div className="max-w-[1000px] mx-auto">
          <div className="mb-12">
            <p className="text-sm font-bold text-[var(--accent)] uppercase tracking-wider mb-2">Lowongan Tersedia</p>
            <h2 className="text-3xl md:text-4xl font-heading text-[var(--bg-darkest)] mb-4">Posisi yang sedang kami buka.</h2>
            <p className="text-lg text-[var(--bg-dark)]/70">Pilih posisi yang paling sesuai, lalu kirim lamaran Anda.</p>
          </div>

          {isLoading && <p className="text-center py-10 text-[var(--bg-dark)]/60">Memuat lowongan pekerjaan...</p>}
          {error && <p className="text-center py-10 text-red-500">Gagal memuat lowongan. Pastikan server terhubung.</p>}

          {!isLoading && !error && jobs && jobs.length > 0 ? (
            <ul className="flex flex-col gap-4">
              {jobs.map((job) => (
                <li key={job.id} className="flex flex-col md:flex-row md:items-center justify-between p-6 bg-white rounded-2xl shadow-sm border border-[var(--text-muted)]/20 hover:border-[var(--accent)] transition-colors">
                  <div className="mb-4 md:mb-0">
                    <h3 className="font-heading text-2xl text-[var(--bg-darkest)] mb-2">
                      <Link to={`/karier/${job.id}`}>{job.title}</Link>
                    </h3>
                    <ul className="flex flex-wrap gap-2 text-sm text-[var(--bg-dark)]/60">
                      {job.department && <li className="px-3 py-1 bg-[var(--bg-light)]/50 rounded-full">{job.department}</li>}
                      {job.location && <li className="px-3 py-1 bg-[var(--bg-light)]/50 rounded-full">{job.location}</li>}
                      {job.type && <li className="px-3 py-1 bg-[var(--bg-light)]/50 rounded-full">{job.type}</li>}
                    </ul>
                  </div>
                  <Link 
                    to={`/karier/${job.id}`} 
                    className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-[var(--bg-darkest)] text-white font-medium hover:bg-[var(--bg-dark)] transition-colors"
                  >
                    Lihat detail
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            !isLoading && !error && (
              <div className="p-10 bg-white rounded-2xl border border-dashed border-[var(--text-muted)] text-center">
                <p className="text-[var(--bg-dark)]/60">Belum ada lowongan yang dibuka saat ini. Silakan cek kembali halaman ini secara berkala.</p>
              </div>
            )
          )}
        </div>
      </section>

    </div>
  );
}
