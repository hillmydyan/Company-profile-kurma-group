<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        \App\Models\Job::create([
            'title' => 'Talent Acquisition (Rekrutmen & Onboarding)',
            'department' => 'Human Resources',
            'location' => 'Bandar Lampung (WFO)',
            'type' => 'Full-time',
            'description' => 'Mencari kandidat terbaik untuk berkembang bersama Kurma Group.',
            'requirements' => ['Lulusan Psikologi', 'Pengalaman 1 tahun', 'Komunikatif'],
            'benefits' => ['Gaji Pokok', 'BPJS Kesehatan', 'Bonus Kinerja'],
            'is_active' => true,
        ]);
        
        \App\Models\Job::create([
            'title' => 'Graphic Designer & Animator',
            'department' => 'Creative',
            'location' => 'Bandar Lampung (WFO)',
            'type' => 'Full-time',
            'description' => 'Membuat desain visual dan animasi menarik untuk kampanye marketing.',
            'requirements' => ['Menguasai Adobe Illustrator & After Effects', 'Kreatif', 'Mampu bekerja dalam tim'],
            'benefits' => ['Gaji Pokok', 'Fasilitas Kerja', 'Cuti Tahunan'],
            'is_active' => true,
        ]);
    }
}
