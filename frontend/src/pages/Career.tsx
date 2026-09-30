import { useState, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

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

const getDaysAgo = (dateStr: string) => {
  const diffTime = Math.abs(new Date().getTime() - new Date(dateStr).getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  if (diffDays === 0) return 'Hari ini';
  if (diffDays > 30) {
    return new Date(dateStr).toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' });
  }
  return `${diffDays} hari lalu`;
};

const IconClockSmall = () => (
  <svg className="w-[14px] h-[14px]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

// Icons components
const IconBriefcase = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
);

const IconLocation = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

const IconClock = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const IconTag = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
  </svg>
);

const IconArrowRight = () => (
  <svg className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
  </svg>
);

export default function Career() {
  const { data: jobs, isLoading, error } = useQuery({ queryKey: ['jobs'], queryFn: fetchJobs });

  const [searchQuery, setSearchQuery] = useState('');
  const [filterDepartment, setFilterDepartment] = useState('');
  const [filterLocation, setFilterLocation] = useState('');
  const [filterType, setFilterType] = useState('');

  // Extract unique options for filters
  const departments = useMemo(() => Array.from(new Set(jobs?.map((j) => j.department) || [])), [jobs]);
  const locations = useMemo(() => Array.from(new Set(jobs?.map((j) => j.location) || [])), [jobs]);
  const types = useMemo(() => Array.from(new Set(jobs?.map((j) => j.type) || [])), [jobs]);

  // Client-side filtering
  const filteredJobs = useMemo(() => {
    if (!jobs) return [];
    return jobs.filter((job) => {
      const matchSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase());
      const matchDept = filterDepartment ? job.department === filterDepartment : true;
      const matchLoc = filterLocation ? job.location === filterLocation : true;
      const matchType = filterType ? job.type === filterType : true;
      return matchSearch && matchDept && matchLoc && matchType;
    });
  }, [jobs, searchQuery, filterDepartment, filterLocation, filterType]);

  return (
    <div className="bg-[#F1F5F9] min-h-screen text-[#020617] font-sans">
      
      {/* SECTION: Hero & Filter */}
      <section className="pt-[140px] pb-10 md:pb-16 px-6">
        <div className="max-w-[1100px] mx-auto">
          {/* Hero Content */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
            <span className="text-sm font-bold tracking-widest text-[#C9A227] uppercase mb-4 block">Karier</span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading text-[#020617] mb-6">Tumbuh Bersama Kami</h1>
            <p className="text-lg text-[#64748B] max-w-2xl mx-auto mb-6">
              Temukan posisi yang sesuai dengan minat dan keahlian Anda. Bergabunglah dengan tim yang inovatif dan dinamis di Kurma Group.
            </p>
            {jobs && (
              <div className="inline-block px-4 py-2 bg-[#020617] text-white text-sm font-medium rounded-full shadow-sm">
                {jobs.length} posisi terbuka
              </div>
            )}
          </motion.div>

          {/* Filter Bar */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="bg-white p-4 rounded-2xl shadow-[0_1px_3px_rgba(2,6,23,0.06),0_8px_24px_rgba(2,6,23,0.05)] border border-[#E2E8F0] flex flex-col md:flex-row gap-4"
          >
            <div className="flex-1">
              <input 
                type="text" 
                placeholder="Cari judul lowongan..." 
                className="w-full h-[46px] px-4 rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] text-[#020617] focus:outline-none focus:border-[#020617] focus:ring-1 focus:ring-[#020617] transition-colors"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex-shrink-0 w-full md:w-[180px]">
              <select 
                className="w-full h-[46px] px-4 rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] text-[#020617] focus:outline-none focus:border-[#020617] focus:ring-1 focus:ring-[#020617] transition-colors appearance-none cursor-pointer"
                value={filterDepartment}
                onChange={(e) => setFilterDepartment(e.target.value)}
              >
                <option value="">Semua Divisi</option>
                {departments.map(d => <option key={d} value={d}>{d}</option>)}
              </select>
            </div>
            <div className="flex-shrink-0 w-full md:w-[180px]">
              <select 
                className="w-full h-[46px] px-4 rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] text-[#020617] focus:outline-none focus:border-[#020617] focus:ring-1 focus:ring-[#020617] transition-colors appearance-none cursor-pointer"
                value={filterLocation}
                onChange={(e) => setFilterLocation(e.target.value)}
              >
                <option value="">Semua Lokasi</option>
                {locations.map(l => <option key={l} value={l}>{l}</option>)}
              </select>
            </div>
            <div className="flex-shrink-0 w-full md:w-[180px]">
              <select 
                className="w-full h-[46px] px-4 rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] text-[#020617] focus:outline-none focus:border-[#020617] focus:ring-1 focus:ring-[#020617] transition-colors appearance-none cursor-pointer"
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
              >
                <option value="">Semua Tipe</option>
                {types.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
          </motion.div>
        </div>
      </section>

      {/* SECTION: Job List */}
      <section className="pb-24 px-6">
        <div className="max-w-[1100px] mx-auto space-y-4">
          
          {isLoading && <div className="text-center py-20 text-[#64748B]">Memuat lowongan pekerjaan...</div>}
          {error && <div className="text-center py-20 text-red-500">Gagal memuat lowongan. Pastikan server terhubung.</div>}

          {!isLoading && !error && filteredJobs.length === 0 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-white rounded-2xl border border-[#E2E8F0] p-12 text-center shadow-[0_1px_3px_rgba(2,6,23,0.06),0_8px_24px_rgba(2,6,23,0.05)]">
              <div className="w-20 h-20 bg-[#F8FAFC] rounded-full flex items-center justify-center mx-auto mb-6 text-[#64748B]">
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              </div>
              <h3 className="text-2xl font-heading text-[#020617] mb-2">Belum ada posisi terbuka saat ini</h3>
              <p className="text-[#64748B] mb-8">Maaf, posisi yang Anda cari belum tersedia atau filter terlalu spesifik.</p>
            </motion.div>
          )}

          {!isLoading && !error && filteredJobs.map((job, i) => (
            <Link key={job.id} to={`/karier/${job.id}`} className="block group">
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="bg-white rounded-2xl p-[28px] border border-[#E2E8F0] shadow-[0_1px_3px_rgba(2,6,23,0.06),0_8px_24px_rgba(2,6,23,0.05)] hover:-translate-y-[2px] hover:border-[#020617] transition-all duration-200 block group"
              >
                <div className="flex flex-col gap-5">
                  {/* Top Row: Icon + Title & Date */}
                  <div className="flex items-start justify-between gap-4 w-full">
                    <div className="flex items-start gap-5">
                      <div className="w-12 h-12 rounded-full border border-[#020617]/10 flex items-center justify-center shrink-0 text-[#020617] bg-[#F8FAFC]">
                        <IconBriefcase />
                      </div>
                      <div className="pt-2">
                        <h3 className="text-[22px] font-heading font-semibold text-[#020617] capitalize group-hover:text-[#C9A227] transition-colors leading-tight">
                          {job.title.toLowerCase()}
                        </h3>
                      </div>
                    </div>
                    
                    {/* Date */}
                    {job.created_at && (
                      <div className="flex shrink-0 items-center gap-1.5 text-[13px] text-[#64748B] pt-2">
                        <IconClockSmall />
                        {getDaysAgo(job.created_at)}
                      </div>
                    )}
                  </div>

                  {/* Bottom Row: Tags & Button */}
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pl-0 md:pl-[68px]">
                    {/* Tags */}
                    <div className="flex flex-wrap gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#F8FAFC] border border-[#E2E8F0] text-[#334155] text-sm">
                        <IconTag /> {job.department}
                      </span>
                      <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#F8FAFC] border border-[#E2E8F0] text-[#334155] text-sm">
                        <IconLocation /> {job.location}
                      </span>
                      <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[rgba(2,6,23,0.06)] text-[#020617] font-medium text-sm">
                        <IconClock /> {job.type}
                      </span>
                    </div>

                    {/* Right side (CTA) */}
                    <div className="shrink-0 w-full md:w-auto">
                      <div className="w-full md:w-auto inline-flex items-center justify-center bg-[#020617] text-white px-6 py-3 rounded-full font-medium transition-transform group-hover:scale-[1.02]">
                        Lihat Detail
                        <IconArrowRight />
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </section>

    </div>
  );
}
