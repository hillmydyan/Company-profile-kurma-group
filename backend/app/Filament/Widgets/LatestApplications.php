<?php

namespace App\Filament\Widgets;

use App\Filament\Resources\ApplicationResource;
use App\Models\Application;
use Filament\Tables;
use Filament\Tables\Table;
use Filament\Widgets\TableWidget as BaseWidget;

class LatestApplications extends BaseWidget
{
    protected static ?string $pollingInterval = null;
    protected int | string | array $columnSpan = ['default' => 'full', 'md' => 8];
    protected static ?int $sort = 4;

    public function table(Table $table): Table
    {
        return $table
            ->query(
                Application::query()->latest()->limit(10)
            )
            ->heading('Pelamar Terbaru')
            ->description('10 lamaran masuk terakhir')
            ->paginated(false)
            ->recordUrl(
                fn (Application $record): string => ApplicationResource::getUrl('edit', ['record' => $record])
            )
            ->emptyStateIcon('heroicon-o-inbox')
            ->emptyStateHeading('Belum ada pelamar')
            ->emptyStateDescription('Lamaran yang masuk dari halaman Karier akan muncul di sini.')
            ->emptyStateActions([
                Tables\Actions\Action::make('create_job')
                    ->label('Buat Lowongan')
                    ->url(\App\Filament\Resources\JobResource::getUrl('create'))
                    ->button()
            ])
            ->headerActions([
                Tables\Actions\Action::make('view_all')
                    ->label('Lihat semua')
                    ->url(ApplicationResource::getUrl('index'))
                    ->icon('heroicon-m-arrow-right')
                    ->iconPosition('after')
                    ->link()
            ])
            ->columns([
                Tables\Columns\TextColumn::make('name')
                    ->label('Nama')
                    ->weight('bold')
                    ->description(fn (Application $record): string => $record->email),
                Tables\Columns\TextColumn::make('job.title')
                    ->label('Posisi'),
                Tables\Columns\TextColumn::make('status')
                    ->label('Status')
                    ->badge()
                    ->color(fn (string $state): string => match ($state) {
                        'baru', 'pending' => 'info',
                        'diproses', 'reviewed', 'interviewed' => 'warning',
                        'diterima', 'accepted' => 'success',
                        'ditolak', 'rejected' => 'danger',
                        default => 'gray',
                    }),
                Tables\Columns\TextColumn::make('created_at')
                    ->label('Tanggal')
                    ->since(),
                Tables\Columns\IconColumn::make('cv')
                    ->label('CV')
                    ->icon(fn (Application $record): ?string => $record->cv ? 'heroicon-m-document-text' : null)
                    ->color('primary'),
            ]);
    }
}
