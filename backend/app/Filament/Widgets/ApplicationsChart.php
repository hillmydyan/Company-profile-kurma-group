<?php

namespace App\Filament\Widgets;

use App\Models\Application;
use Filament\Widgets\ChartWidget;
use Carbon\Carbon;

class ApplicationsChart extends ChartWidget
{
    protected static ?string $pollingInterval = null;
    protected static ?string $heading = 'Aplikasi Masuk (6 Bulan Terakhir)';
    protected static ?int $sort = 2;
    protected int | string | array $columnSpan = ['default' => 'full', 'md' => 8];
    protected static ?string $maxHeight = '300px';

    protected function getData(): array
    {
        $data = [];
        $labels = [];
        Carbon::setLocale('id');

        for ($i = 5; $i >= 0; $i--) {
            $month = Carbon::now()->startOfMonth()->subMonths($i);
            $labels[] = $month->translatedFormat('F');
            $data[] = Application::whereYear('created_at', $month->year)
                ->whereMonth('created_at', $month->month)
                ->count();
        }

        // Remove the empty array return so it always draws the line
        return [
            'datasets' => [
                [
                    'label' => 'Pelamar',
                    'data' => $data,
                    'borderColor' => '#020617',
                    'backgroundColor' => 'rgba(2, 6, 23, 0.08)',
                    'fill' => true,
                    'tension' => 0.4,
                ],
            ],
            'labels' => $labels,
        ];
    }

    protected function getType(): string
    {
        return 'line';
    }

    protected function getOptions(): array
    {
        return [
            'plugins' => [
                'legend' => [
                    'display' => false,
                ],
                'tooltip' => [
                    'intersect' => false,
                ],
            ],
            'scales' => [
                'y' => [
                    'beginAtZero' => true,
                    'suggestedMax' => 5,
                    'ticks' => [
                        'stepSize' => 1,
                        'precision' => 0,
                    ],
                ],
            ],
            'maintainAspectRatio' => false,
        ];
    }

    public function getDescription(): ?string
    {
        $data = $this->getData();
        if (array_sum($data['datasets'][0]['data'] ?? []) === 0) {
            return 'Belum ada pelamar dalam 6 bulan terakhir';
        }
        return null;
    }
}
