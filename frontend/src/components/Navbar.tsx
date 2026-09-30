import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const location = useLocation();
  const isHome = location.pathname === '/';
  
  const isLightMode = !isHome || scrolled;

  const glassStyle = {
    background: isLightMode ? 'rgba(255,255,255,0.45)' : 'rgba(255,255,255,0.10)',
    backdropFilter: 'blur(20px) saturate(150%)',
    WebkitBackdropFilter: 'blur(20px) saturate(150%)',
    border: isLightMode ? '1px solid rgba(255,255,255,0.6)' : '1px solid rgba(255,255,255,0.22)',
    boxShadow: isLightMode 
      ? 'inset 0 1px 0 rgba(255,255,255,0.8), 0 8px 32px rgba(0,0,0,0.08)' 
      : 'inset 0 1px 0 rgba(255,255,255,0.35), 0 8px 32px rgba(0,0,0,0.18)',
    transition: 'all 300ms ease'
  };

  const textColor = isLightMode ? 'text-[var(--bg-dark)]' : 'text-[#f3efe6]';
  const logoTextColor = isLightMode ? 'text-[var(--bg-dark)]' : 'text-[#f3efe6]';
  const ctaClasses = isLightMode 
    ? 'bg-[var(--bg-dark)] text-white hover:bg-opacity-90'
    : 'bg-[var(--bg-dark)] text-[#f3efe6] border border-[#d4a437]/50 hover:border-[#d4a437] hover:bg-[var(--bg-mid)]';

  const menuItems = [
    { label: 'Beranda', to: '/' },
    { label: 'Tentang', to: '/tentang' },
    { label: 'Bisnis', to: '/#bisnis' },
    { label: 'Karier', to: '/karier' },
  ];

  return (
    <>
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-3 md:top-4 left-0 right-0 z-50 px-4 md:px-6 flex justify-center pointer-events-none"
      >
        <div 
          style={glassStyle}
          className={`w-full max-w-[1200px] rounded-full px-5 sm:px-8 py-[14px] flex items-center justify-between pointer-events-auto h-[60px] md:h-[72px]`}
        >
          {/* Logo */}
          <Link to="/" className={`flex items-center gap-3 text-2xl font-heading font-medium ${logoTextColor} no-underline group transition-colors duration-300`}>
            <img 
              src="/icons.ico" 
              alt="Kurma Group Logo" 
              className={`w-10 h-10 rounded-full object-cover transition-all duration-300 group-hover:scale-105 group-hover:shadow-[0_0_15px_rgba(212,164,55,0.4)] ${isLightMode ? 'bg-[#020617]' : 'bg-transparent'}`} 
            />
            <span className="tracking-tight">Kurma Group</span>
          </Link>
          
          {/* Desktop Menu */}
          <div className={`hidden md:flex gap-8 font-medium text-sm ${textColor} tracking-wide uppercase transition-colors duration-300`}>
            {menuItems.map((item, i) => (
              <Link key={i} to={item.to} className="relative group overflow-hidden py-1.5">
                <span className="group-hover:text-[#d4a437] transition-colors duration-300">{item.label}</span>
                <span className={`absolute bottom-0 left-0 w-full h-[1px] bg-[#d4a437] -translate-x-[101%] group-hover:translate-x-0 transition-transform duration-300 ease-out`}></span>
              </Link>
            ))}
          </div>
          
          {/* CTA & Mobile Toggle */}
          <div className="flex items-center gap-4">
            <Link to="/karier" className={`hidden md:inline-flex py-2.5 px-6 text-sm rounded-full transition-all duration-300 hover:-translate-y-[1px] ${ctaClasses}`}>
              Bergabung
            </Link>
            
            {/* Hamburger Button */}
            <button 
              className={`md:hidden ${textColor} p-2 pointer-events-auto transition-colors duration-300`}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
          
        </div>
      </motion.nav>

      {/* Mobile Menu Panel */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed top-[90px] left-4 right-4 z-40 md:hidden pointer-events-auto rounded-3xl overflow-hidden"
            style={{
              background: 'rgba(255,255,255,0.95)',
              backdropFilter: 'blur(25px) saturate(150%)',
              WebkitBackdropFilter: 'blur(25px) saturate(150%)',
              border: '1px solid rgba(0,0,0,0.1)',
              boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
            }}
          >
            <div className="flex flex-col p-6 gap-4">
              {menuItems.map((item, i) => (
                <Link 
                  key={i} 
                  to={item.to} 
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-[#020617] text-lg font-medium py-2 border-b border-gray-100 hover:text-[#d4a437] transition-colors"
                >
                  {item.label}
                </Link>
              ))}
              <Link 
                to="/karier" 
                onClick={() => setMobileMenuOpen(false)}
                className="mt-4 bg-[#020617] text-white border border-transparent text-center py-3 rounded-full font-medium transition-colors hover:bg-opacity-90"
              >
                Bergabung
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
