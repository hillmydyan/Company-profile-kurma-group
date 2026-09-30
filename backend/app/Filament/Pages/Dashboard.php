<?php

namespace App\Filament\Pages;

use Filament\Actions\Action;
use Filament\Pages\Dashboard as BaseDashboard;
use App\Filament\Resources\JobResource;
use App\Filament\Resources\ApplicationResource;
use Carbon\Carbon;

class Dashboard extends BaseDashboard
{
    public function getHeading(): string|\Illuminate\Contracts\Support\Htmlable
    {
        $hour = now()->hour;
        if ($hour < 12) {
            $greeting = 'Selamat pagi';
        } elseif ($hour < 15) {
            $greeting = 'Selamat siang';
        } elseif ($hour < 18) {
            $greeting = 'Selamat sore';
        } else {
            $greeting = 'Selamat malam';
        }

        $name = auth()->user()->name ?? 'Admin';
        
        return "{$greeting}, {$name}";
    }

    public function getSubheading(): string|\Illuminate\Contracts\Support\Htmlable|null
    {
        Carbon::setLocale('id');
        return now()->translatedFormat('l, d F Y');
    }

    protected function getHeaderActions(): array
    {
        return [
            Action::make('lihat_pelamar')
                ->label('Lihat Pelamar')
                ->url(ApplicationResource::getUrl('index'))
                ->color('gray')
                ->outlined(),
            Action::make('tambah_lowongan')
                ->label('Tambah Lowongan')
                ->url(JobResource::getUrl('create'))
                ->color('primary'),
        ];
    }

    public function getWidgets(): array
    {
        return [
            \App\Filament\Widgets\OverviewStats::class,
            \App\Filament\Widgets\ApplicationsChart::class,
            \App\Filament\Widgets\ApplicationStatusChart::class,
            \App\Filament\Widgets\LatestApplications::class,
            \App\Filament\Widgets\ActiveJobsList::class,
        ];
    }

    public function getColumns(): int | string | array
    {
        return [
            'default' => 1,
            'sm' => 1,
            'md' => 12,
            'xl' => 12,
        ];
    }
}
