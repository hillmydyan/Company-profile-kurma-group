import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation } from '@tanstack/react-query';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useRef } from 'react';
import DOMPurify from 'dompurify';
import { Helmet } from 'react-helmet-async';

interface Job {
  id: number;
  title: string;
  department: string;
  location: string;
  type: string;
  description: string;
  requirements: string[];
  benefits: string[];
  created_at: string;
}

export default function JobDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const formRef = useRef<HTMLDivElement>(null);
  
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', portofolio_url: '', message: '', honeypot: '' });
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [agreement, setAgreement] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

  const { data: job, isLoading } = useQuery<Job>({
    queryKey: ['job', id],
    queryFn: async () => {
      const res = await fetch(`${apiUrl}/jobs/${id}`);
      if (!res.ok) throw new Error('Failed to fetch job');
      return res.json();
    }
  });

  const submitMutation = useMutation({
    mutationFn: async () => {
      if (!cvFile) throw new Error('CV wajib diunggah');
      if (!agreement) throw new Error('Anda harus menyetujui persyaratan');
      
      const formPayload = new FormData();
      formPayload.append('job_id', id || '');
      formPayload.append('name', formData.name);
      formPayload.append('email', formData.email);
      // Ensure phone starts with +62
      const phoneToSubmit = formData.phone.startsWith('+62') ? formData.phone : `+62${formData.phone.replace(/^0+/, '')}`;
      formPayload.append('phone', phoneToSubmit);
      if (formData.portofolio_url) formPayload.append('portofolio_url', formData.portofolio_url);
      if (formData.message) formPayload.append('message', formData.message);
      formPayload.append('cv', cvFile);
      formPayload.append('honeypot', formData.honeypot);

      const res = await fetch(`${apiUrl}/applications`, {
        method: 'POST',
        body: formPayload,
        headers: { 'Accept': 'application/json' },
      });
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Submission failed');
      }
      return res.json();
    },
    onSuccess: () => {
      setIsSuccess(true);
      // Clean up file but keep old input in state in case they want it, though form is hidden.
      setCvFile(null);
    },
    onError: (err: any) => {
      alert(`Terjadi kesalahan: ${err.message}`);
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitMutation.mutate();
  };

  const sanitizeConfig = { ALLOWED_TAGS: ['p', 'br', 'strong', 'em', 'ul', 'ol', 'li', 'h3', 'h4', 'a'] };

  if (isLoading) return <div className="text-center py-32 text-[#193060] font-medium min-h-screen bg-[#F8FAFC]">Memuat detail...</div>;
  if (!job) return <div className="text-center py-32 text-[#193060] font-medium min-h-screen bg-[#F8FAFC]">Pekerjaan tidak ditemukan.</div>;

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    alert('Link disalin ke clipboard!');
  };

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };
  
  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.type === 'application/pdf' && file.size <= 2 * 1024 * 1024) {
        setCvFile(file);
      } else {
        alert('File harus berupa PDF dan maksimal 2MB.');
      }
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.size <= 2 * 1024 * 1024) {
        setCvFile(file);
      } else {
        alert('Ukuran file maksimal 2MB.');
        e.target.value = '';
      }
    }
  };

  const daysAgo = Math.floor((new Date().getTime() - new Date(job.created_at).getTime()) / (1000 * 3600 * 24));
  
  const metaDescription = job.description.replace(/<[^>]+>/g, '').substring(0, 150) + '...';

  const jsonLd = {
    "@context": "https://schema.org/",
    "@type": "JobPosting",
    "title": job.title,
    "description": job.description,
    "datePosted": job.created_at,
    "employmentType": job.type.toUpperCase(),
    "hiringOrganization": {
      "@type": "Organization",
      "name": "Kurma Group",
      "logo": window.location.origin + "/icons.ico"
    },
    "jobLocation": {
      "@type": "Place",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": job.location,
        "addressCountry": "ID"
      }
    }
  };

  return (
    <div className="section-dark min-h-screen pt-[100px] pb-24 font-sans">
      <div className="section-dark-overlay"></div>
      <Helmet>
        <title>{`${job.title.replace(/\b\w/g, l => l.toUpperCase())} – Karier Kurma Group`}</title>
        <meta name="description" content={metaDescription} />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>

      <div className="max-w-[1100px] mx-auto px-6 relative z-10">
        {/* Top Header */}
        <div className="mb-8 w-full">
          <div className="text-sm text-[#f4f1ea]/80 mb-6 flex items-center gap-2">
            <button onClick={() => navigate('/karier')} className="hover:text-white transition-colors">Karier</button>
            <span>/</span>
            <span className="font-medium text-white capitalize">{job.title}</span>
          </div>
          
          <div className="text-[#C9A227] text-[12px] uppercase tracking-widest font-bold mb-3 drop-shadow-md">{job.department}</div>
          <h1 className="text-4xl md:text-[36px] font-heading font-medium text-white capitalize mb-6">{job.title}</h1>
          
          <div className="flex flex-wrap items-center gap-6 text-[#f4f1ea]/90 text-sm font-medium">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
              {job.location}
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
              {job.type}
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
              Dibuka {daysAgo} hari lalu
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column (8) */}
          <div className="lg:col-span-8 flex flex-col gap-6">
            
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-[16px] p-6 md:p-8 border border-[#E2E8F0] shadow-[0_1px_3px_rgba(2,6,23,0.06),0_8px_24px_rgba(2,6,23,0.05)]">
              <h2 className="text-[22px] font-heading font-medium text-[#193060] mb-4">Tentang Posisi</h2>
              <div 
                className="text-[#334155] leading-relaxed space-y-4"
                dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(job.description, sanitizeConfig) }}
              />
            </motion.div>

            {job.requirements && job.requirements.length > 0 && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-white rounded-[16px] p-6 md:p-8 border border-[#E2E8F0] shadow-[0_1px_3px_rgba(2,6,23,0.06),0_8px_24px_rgba(2,6,23,0.05)]">
                <h2 className="text-[22px] font-heading font-medium text-[#193060] mb-4">Persyaratan</h2>
                <ul className="space-y-3">
                  {job.requirements.map((req, i) => (
                    <li key={i} className="flex items-start gap-3 text-[#334155]">
                      <svg className="w-5 h-5 text-[#C9A227] shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                      <span dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(req, sanitizeConfig) }} />
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}

            {job.benefits && job.benefits.length > 0 && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-white rounded-[16px] p-6 md:p-8 border border-[#E2E8F0] shadow-[0_1px_3px_rgba(2,6,23,0.06),0_8px_24px_rgba(2,6,23,0.05)]">
                <h2 className="text-[22px] font-heading font-medium text-[#193060] mb-4">Benefit</h2>
                <ul className="space-y-3">
                  {job.benefits.map((ben, i) => (
                    <li key={i} className="flex items-start gap-3 text-[#334155]">
                      <svg className="w-5 h-5 text-[#C9A227] shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" /></svg>
                      <span dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(ben, sanitizeConfig) }} />
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}

            {/* Application Form */}
            <div id="form-lamaran" ref={formRef} className="mt-8">
              <AnimatePresence mode="wait">
                {isSuccess ? (
                  <motion.div 
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-white rounded-[16px] p-10 md:p-14 border border-[#E2E8F0] shadow-[0_1px_3px_rgba(2,6,23,0.06),0_8px_24px_rgba(2,6,23,0.05)] text-center flex flex-col items-center"
                  >
                    <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6">
                      <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                    </div>
                    <h2 className="text-[28px] font-heading font-medium text-[#193060] mb-3">Lamaran Terkirim</h2>
                    <p className="text-[#64748B] text-lg mb-8 max-w-[400px]">
                      Terima kasih, {formData.name}. Tim kami akan menghubungi kamu jika profilmu sesuai.
                    </p>
                    <button onClick={() => navigate('/karier')} className="border border-[#E2E8F0] hover:border-[#193060] text-[#193060] hover:bg-[#F8FAFC] font-medium py-3 px-8 rounded-xl transition-all">
                      Lihat Lowongan Lain
                    </button>
                  </motion.div>
                ) : (
                  <motion.div 
                    key="form"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-[16px] p-6 md:p-8 border border-[#E2E8F0] shadow-[0_1px_3px_rgba(2,6,23,0.06),0_8px_24px_rgba(2,6,23,0.05)]"
                  >
                    <h2 className="text-[28px] font-heading font-medium text-[#193060] mb-2">Kirim Lamaran</h2>
                    <p className="text-[#64748B] text-[15px] mb-8">Isi data dengan benar, kami akan menghubungi lewat email atau WhatsApp.</p>
                    
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div>
                        <label className="block text-[14px] font-medium text-[#193060] mb-2">Nama Lengkap</label>
                        <input required type="text" className="w-full h-[48px] px-4 rounded-[10px] border border-[#E2E8F0] bg-white focus:outline-none focus:ring-2 focus:ring-[#193060] focus:border-transparent transition-all placeholder:text-[#94A3B8]" placeholder="Masukkan nama lengkap" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
                      </div>
                      
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-[14px] font-medium text-[#193060] mb-2">Email</label>
                          <input required type="email" className="w-full h-[48px] px-4 rounded-[10px] border border-[#E2E8F0] bg-white focus:outline-none focus:ring-2 focus:ring-[#193060] focus:border-transparent transition-all placeholder:text-[#94A3B8]" placeholder="contoh@email.com" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
                        </div>
                        <div>
                          <label className="block text-[14px] font-medium text-[#193060] mb-2">Nomor WhatsApp</label>
                          <div className="relative">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#64748B] font-medium">+62</span>
                            <input required type="tel" pattern="[0-9]*" className="w-full h-[48px] pl-[52px] pr-4 rounded-[10px] border border-[#E2E8F0] bg-white focus:outline-none focus:ring-2 focus:ring-[#193060] focus:border-transparent transition-all placeholder:text-[#94A3B8]" placeholder="81234567890" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value.replace(/[^0-9]/g, '')})} />
                          </div>
                        </div>
                      </div>

                      <div>
                        <label className="block text-[14px] font-medium text-[#193060] mb-2">Link Portofolio / LinkedIn <span className="text-[#64748B] font-normal">(opsional)</span></label>
                        <input type="url" className="w-full h-[48px] px-4 rounded-[10px] border border-[#E2E8F0] bg-white focus:outline-none focus:ring-2 focus:ring-[#193060] focus:border-transparent transition-all placeholder:text-[#94A3B8]" placeholder="https://" value={formData.portofolio_url} onChange={e => setFormData({...formData, portofolio_url: e.target.value})} />
                      </div>

                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <label className="block text-[14px] font-medium text-[#193060]">Pesan Singkat <span className="text-[#64748B] font-normal">(opsional)</span></label>
                          <span className="text-[12px] text-[#94A3B8]">{formData.message.length}/500</span>
                        </div>
                        <textarea maxLength={500} rows={4} className="w-full p-4 rounded-[10px] border border-[#E2E8F0] bg-white focus:outline-none focus:ring-2 focus:ring-[#193060] focus:border-transparent transition-all placeholder:text-[#94A3B8] resize-none" placeholder="Tulis pesan singkat untuk tim rekrutmen..." value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})} />
                      </div>

                      <div>
                        <label className="block text-[14px] font-medium text-[#193060] mb-2">Unggah CV</label>
                        
                        <div 
                          className={`relative w-full border-2 border-dashed rounded-[10px] p-8 text-center transition-all cursor-pointer ${isDragging ? 'border-[#193060] bg-gray-50' : cvFile ? 'border-green-500 bg-green-50' : 'border-[#CBD5E1] hover:border-[#94A3B8]'}`}
                          onDragOver={handleDragOver}
                          onDragLeave={handleDragLeave}
                          onDrop={handleDrop}
                          onClick={() => !cvFile && fileInputRef.current?.click()}
                        >
                          <input 
                            required={!cvFile}
                            type="file" 
                            accept="application/pdf" 
                            className="sr-only" 
                            ref={fileInputRef}
                            onChange={handleFileChange} 
                          />
                          
                          {cvFile ? (
                            <div className="flex flex-col items-center gap-2">
                              <div className="w-12 h-12 rounded-full bg-green-100 text-green-600 flex items-center justify-center mb-1">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                              </div>
                              <p className="text-[#193060] font-medium text-sm truncate max-w-[200px]">{cvFile.name}</p>
                              <p className="text-xs text-[#64748B]">{(cvFile.size / 1024 / 1024).toFixed(2)} MB</p>
                              <button type="button" onClick={(e) => { e.stopPropagation(); setCvFile(null); if (fileInputRef.current) fileInputRef.current.value = ''; }} className="mt-2 text-sm text-red-600 hover:text-red-700 font-medium">Hapus File</button>
                            </div>
                          ) : (
                            <div className="flex flex-col items-center gap-2">
                              <div className="w-12 h-12 rounded-full bg-gray-100 text-[#64748B] flex items-center justify-center mb-1">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                              </div>
                              <p className="text-[#193060] font-medium text-sm">Tarik & lepas CV di sini atau klik untuk pilih</p>
                              <p className="text-xs text-[#94A3B8]">PDF, maks 2 MB</p>
                            </div>
                          )}
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3 mt-6">
                        <input required type="checkbox" id="agreement" className="mt-1 w-4 h-4 text-[#193060] rounded border-[#E2E8F0] focus:ring-[#193060]" checked={agreement} onChange={e => setAgreement(e.target.checked)} />
                        <label htmlFor="agreement" className="text-[13px] text-[#64748B] leading-relaxed cursor-pointer">
                          Saya menyatakan data yang saya isi benar dan setuju data ini digunakan untuk proses rekrutmen Kurma Group.
                        </label>
                      </div>

                      {/* Honeypot field - hidden from real users */}
                      <input type="text" style={{ position: 'absolute', left: '-9999px' }} tabIndex={-1} autoComplete="off" value={formData.honeypot} onChange={e => setFormData({...formData, honeypot: e.target.value})} aria-hidden="true" />

                      <button type="submit" disabled={submitMutation.isPending || !agreement} className="bg-[#193060] text-white hover:bg-opacity-90 h-[52px] px-8 rounded-[12px] w-full text-[15px] font-semibold mt-4 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2">
                        {submitMutation.isPending ? (
                          <>
                            <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Mengirim...
                          </>
                        ) : (
                          <>
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>
                            Kirim Lamaran
                          </>
                        )}
                      </button>
                    </form>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            
          </div>

          {/* Right Column - Summary (4) */}
          <div className="lg:col-span-4 sticky top-[100px]">
            <div className="bg-white rounded-[16px] p-6 border border-[#E2E8F0] shadow-[0_1px_3px_rgba(2,6,23,0.06),0_8px_24px_rgba(2,6,23,0.05)]">
              <h3 className="text-[18px] font-heading font-medium text-[#193060] mb-5">Ringkasan</h3>
              
              <div className="space-y-4 mb-8">
                <div className="flex justify-between items-center border-b border-[#F1F5F9] pb-3">
                  <span className="text-[#64748B] text-sm">Divisi</span>
                  <span className="text-[#193060] text-sm font-medium">{job.department}</span>
                </div>
                <div className="flex justify-between items-center border-b border-[#F1F5F9] pb-3">
                  <span className="text-[#64748B] text-sm">Lokasi</span>
                  <span className="text-[#193060] text-sm font-medium">{job.location}</span>
                </div>
                <div className="flex justify-between items-center border-b border-[#F1F5F9] pb-3">
                  <span className="text-[#64748B] text-sm">Tipe</span>
                  <span className="text-[#193060] text-sm font-medium">{job.type}</span>
                </div>
                <div className="flex justify-between items-center border-b border-[#F1F5F9] pb-3">
                  <span className="text-[#64748B] text-sm">Diposting</span>
                  <span className="text-[#193060] text-sm font-medium">{daysAgo === 0 ? 'Hari ini' : `${daysAgo} hari lalu`}</span>
                </div>
              </div>

              <div className="space-y-3">
                <button onClick={scrollToForm} className="w-full bg-[#193060] text-white hover:bg-opacity-90 h-[48px] rounded-[10px] font-medium text-[15px] transition-all">
                  Lamar Sekarang
                </button>
                <button onClick={handleShare} className="w-full bg-white border border-[#E2E8F0] text-[#193060] hover:bg-[#F8FAFC] h-[48px] rounded-[10px] font-medium text-[15px] transition-all flex items-center justify-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" /></svg>
                  Bagikan
                </button>
              </div>

              <div className="mt-6 text-center">
                <p className="text-[12px] text-[#94A3B8]">Proses seleksi 3–7 hari kerja</p>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}
