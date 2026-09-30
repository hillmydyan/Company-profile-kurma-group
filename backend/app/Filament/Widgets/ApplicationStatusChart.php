<?php

namespace App\Filament\Widgets;

use App\Models\Application;
use Filament\Widgets\ChartWidget;
use Illuminate\Support\Facades\DB;

class ApplicationStatusChart extends ChartWidget
{
    protected static ?string $heading = 'Status Pelamar';
    protected int | string | array $columnSpan = ['default' => 'full', 'md' => 4];
    protected static ?int $sort = 3;
    protected static ?string $maxHeight = '300px';

    protected function getData(): array
    {
        $statusCounts = Application::select('status', DB::raw('count(*) as total'))
            ->groupBy('status')
            ->pluck('total', 'status')
            ->toArray();

        $labels = [];
        $data = [];
        $backgrounds = [];
        $colors = [
            'baru' => '#3b82f6', // info
            'diproses' => '#f59e0b', // warning
            'diterima' => '#10b981', // success
            'ditolak' => '#ef4444', // danger
        ];

        foreach (['baru', 'diproses', 'diterima', 'ditolak'] as $status) {
            $count = $statusCounts[$status] ?? 0;
            $labels[] = ucfirst($status);
            $data[] = $count;
            $backgrounds[] = $colors[$status] ?? '#94a3b8';
        }

        if (array_sum($data) === 0) {
            return [
                'datasets' => [],
                'labels' => []
            ];
        }

        return [
            'datasets' => [
                [
                    'label' => 'Status',
                    'data' => $data,
                    'backgroundColor' => $backgrounds,
                    'borderWidth' => 0,
                    'hoverOffset' => 4,
                ],
            ],
            'labels' => $labels,
        ];
    }

    protected function getType(): string
    {
        return 'doughnut';
    }

    protected function getOptions(): array
    {
        return [
            'plugins' => [
                'legend' => [
                    'position' => 'bottom',
                    'labels' => [
                        'usePointStyle' => true,
                    ],
                ],
            ],
            'scales' => [
                'x' => [
                    'display' => false,
                ],
                'y' => [
                    'display' => false,
                ],
            ],
            'cutout' => '65%',
            'maintainAspectRatio' => false,
        ];
    }

    public function getDescription(): ?string
    {
        $data = $this->getData();
        if (empty($data['datasets'])) {
            return 'Belum ada pelamar';
        }
        return null;
    }
}
