<?php

namespace App\Filament\Widgets;

use App\Models\Application;
use App\Models\Faq;
use App\Models\Gallery;
use App\Models\Job;
use Filament\Widgets\StatsOverviewWidget as BaseWidget;
use Filament\Widgets\StatsOverviewWidget\Stat;
use Carbon\Carbon;

class OverviewStats extends BaseWidget
{
    protected static ?string $pollingInterval = null;
    protected int | string | array $columnSpan = 'full';
    protected static ?int $sort = 1;

    protected function getColumns(): int
    {
        return 4;
    }

    protected function getStats(): array
    {
        Carbon::setLocale('id');
        $now = Carbon::now();
        $startOfMonth = $now->copy()->startOfMonth();
        $startOfLastMonth = $now->copy()->subMonth()->startOfMonth();
        $endOfLastMonth = $now->copy()->subMonth()->endOfMonth();

        // Applications
        $currentMonthApplicants = Application::where('created_at', '>=', $startOfMonth)->count();
        $lastMonthApplicants = Application::whereBetween('created_at', [$startOfLastMonth, $endOfLastMonth])->count();
        $diff = $currentMonthApplicants - $lastMonthApplicants;
        
        $appDesc = "Sama dengan bulan lalu";
        $appColor = 'gray';
        if ($diff > 0) {
            $appDesc = "↑ {$diff} dari bulan lalu";
            $appColor = 'success';
        } elseif ($diff < 0) {
            $appDesc = "↓ " . abs($diff) . " dari bulan lalu";
            $appColor = 'danger';
        }

        // Applications Chart Data (Last 7 days)
        $appChartData = [];
        $hasData = 0;
        for ($i = 6; $i >= 0; $i--) {
            $date = $now->copy()->subDays($i)->format('Y-m-d');
            $count = Application::whereDate('created_at', $date)->count();
            $appChartData[] = $count;
            if ($count > 0) $hasData++;
        }
        
        $appStat = Stat::make('Pelamar Baru', (string) $currentMonthApplicants)
            ->description($appDesc)
            ->descriptionColor($appColor)
            ->icon('heroicon-m-users');
            
        if ($hasData >= 2) {
            $appStat->chart($appChartData)->color('primary');
        }

        // Jobs
        $activeJobs = Job::where('is_active', true)->count();
        $totalJobs = Job::count();
        $jobStat = Stat::make('Lowongan Aktif', (string) $activeJobs)
            ->description("dari {$totalJobs} lowongan")
            ->descriptionColor('gray')
            ->icon('heroicon-m-briefcase');

        // Gallery
        $latestGallery = Gallery::latest()->first();
        $galleryDesc = $latestGallery ? "terakhir ditambah " . $latestGallery->created_at->diffForHumans() : "belum ada data";
        $galleryStat = Stat::make('Total Galeri', (string) Gallery::count())
            ->description($galleryDesc)
            ->descriptionColor('gray')
            ->icon('heroicon-m-photo');

        // FAQ
        $latestFaq = Faq::latest()->first();
        $faqDesc = $latestFaq ? "terakhir ditambah " . $latestFaq->created_at->diffForHumans() : "belum ada data";
        $faqStat = Stat::make('Total FAQ', (string) Faq::count())
            ->description($faqDesc)
            ->descriptionColor('gray')
            ->icon('heroicon-m-question-mark-circle');

        return [
            $appStat,
            $jobStat,
            $galleryStat,
            $faqStat,
        ];
    }
}
