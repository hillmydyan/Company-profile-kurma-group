import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer
      className="border-t border-[rgba(212,164,55,0.25)] relative overflow-hidden pt-[96px] pb-[32px]"
      style={{ background: 'linear-gradient(180deg, var(--bg-dark), var(--bg-darkest))' }}
    >
      {/* Noise Overlay */}
      <div className="absolute inset-0 opacity-[0.04] mix-blend-overlay pointer-events-none z-0" style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noise%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.8%22 numOctaves=%224%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noise)%22/%3E%3C/svg%3E')" }}></div>
      {/* Dynamic Glows (Alternating: Gold Left, Green Right) */}
      <div className="absolute inset-0 pointer-events-none z-0" style={{ background: 'radial-gradient(circle at 15% 15%, rgba(212,164,55,0.14), transparent 45%), radial-gradient(circle at 85% 90%, rgba(133,159,192,0.2), transparent 50%)' }}></div>

      <div className="max-w-[1200px] mx-auto px-6 relative z-10">

        {/* Top Grid */}
        <div className="grid md:grid-cols-[1.6fr_1fr_1fr] gap-12 md:gap-16">

          {/* Column 1 */}
          <div>
            <Link to="/" className="flex items-center gap-3 text-[26px] font-heading font-medium text-[var(--text-light)] no-underline mb-6 group">
              <img 
                src="/icons.ico" 
                alt="Kurma Group Logo" 
                className="w-10 h-10 rounded-full object-cover transition-all duration-300 group-hover:scale-105 border border-[#d4a437]/20 shadow-[0_0_15px_rgba(212,164,55,0.2)]"
              />
              <span className="tracking-tight">Kurma Group</span>
            </Link>
            <p className="text-[var(--text-light)]/80 text-[16px] leading-[1.7] max-w-[420px] mb-6 line-clamp-3 font-sans">
              Perusahaan digital marketing, content creation, dan e-commerce yang membangun brand bertumbuh lewat riset, konten, dan teknologi.
            </p>
            <p className="text-[var(--text-light)]/60 text-[15px] leading-relaxed font-sans">
              Jalan Krakatau Raya, Sukabumi Indah, Sukabumi<br />
              Bandar Lampung, 35132
            </p>
          </div>

          {/* Column 2 */}
          <div>
            <h4 className="text-[var(--text-light)] text-[20px] font-heading mb-6">Pranala</h4>
            <ul className="flex flex-col space-y-[14px]">
              <li><Link to="/" className="text-[var(--text-light)]/80 text-[16px] font-sans hover:text-[#d4a437] transition-colors">Beranda</Link></li>
              <li><Link to="/tentang" className="text-[var(--text-light)]/80 text-[16px] font-sans hover:text-[#d4a437] transition-colors">Tentang Kami</Link></li>
              <li><Link to="/#bisnis" className="text-[var(--text-light)]/80 text-[16px] font-sans hover:text-[#d4a437] transition-colors">Unit Bisnis</Link></li>
              <li><Link to="/karier" className="text-[var(--text-light)]/80 text-[16px] font-sans hover:text-[#d4a437] transition-colors">Karier</Link></li>
            </ul>
          </div>

          {/* Column 3 */}
          <div>
            <h4 className="text-[var(--text-light)] text-[20px] font-heading mb-6">Hubungi Kami</h4>
            <div className="text-[var(--text-light)]/80 text-[16px] font-sans space-y-2 mb-8">
              <p className="font-medium text-[var(--text-light)]">PT Kurma Group Indonesia</p>
              <p>Email: <a href="mailto:kurmagroupindonesia@gmail.com" className="hover:text-[#d4a437] transition-colors">kurmagroupindonesia@gmail.com</a></p>
              <p>WhatsApp: <a href="#" className="hover:text-[#d4a437] transition-colors">+62 811-789-436</a></p>
            </div>

            <div className="flex gap-4">
              <a href="kurmagroup.id" className="w-10 h-10 rounded-full border border-[var(--text-light)]/20 flex items-center justify-center text-[var(--text-light)]/80 hover:text-[#d4a437] hover:border-[#d4a437] transition-all" aria-label="Instagram">
                <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01M7 2h10a5 5 0 015 5v10a5 5 0 01-5 5H7a5 5 0 01-5-5V7a5 5 0 015-5z"></path></svg>
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-[var(--text-light)]/20 flex items-center justify-center text-[var(--text-light)]/80 hover:text-[#d4a437] hover:border-[#d4a437] transition-all" aria-label="TikTok">
                <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path d="M9 12a4 4 0 104 4V4a5 5 0 005 5v3a3 3 0 01-3-3"></path></svg>
              </a>
            </div>
          </div>

        </div>
      </div>

      {/* Giant Watermark */}
      <div className="relative w-full overflow-hidden text-center mt-[48px]">
        <h1 className="font-heading font-bold text-[14vw] md:text-[clamp(56px,8vw,150px)] text-[var(--text-light)]/5 tracking-[2px] pointer-events-none select-none mb-[-0.1em] whitespace-nowrap w-full">
          KURMA GROUP
        </h1>
      </div>

      <div className="max-w-[1200px] mx-auto px-6 relative z-10">
        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-[14px]">
          <p className="text-[var(--text-light)]/60 font-sans">
            &copy; 2026 Kurma Group. Hak Cipta Dilindungi.
          </p>
          <p className="text-[var(--text-light)]/60 font-sans">
            Dikembangkan oleh Tim Kurma Group
          </p>
        </div>
      </div>
    </footer>
  );
}
