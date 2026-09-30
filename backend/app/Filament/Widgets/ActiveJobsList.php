<?php

namespace App\Filament\Widgets;

use App\Filament\Resources\JobResource;
use App\Models\Job;
use Filament\Tables;
use Filament\Tables\Table;
use Filament\Widgets\TableWidget as BaseWidget;

class ActiveJobsList extends BaseWidget
{
    protected static ?string $heading = 'Lowongan Aktif';
    protected int | string | array $columnSpan = ['default' => 'full', 'md' => 4];
    protected static ?int $sort = 5;

    public function table(Table $table): Table
    {
        return $table
            ->query(
                Job::query()->where('is_active', true)->latest()->limit(5)
            )
            ->heading('Lowongan Aktif')
            ->description('5 lowongan terakhir')
            ->paginated(false)
            ->recordUrl(
                fn (Job $record): string => JobResource::getUrl('edit', ['record' => $record])
            )
            ->columns([
                Tables\Columns\TextColumn::make('title')
                    ->label('Judul')
                    ->weight('bold')
                    ->description(fn (Job $record): string => $record->applications()->count() . ' Pelamar'),
                Tables\Columns\TextColumn::make('created_at')
                    ->label('Dibuat')
                    ->since(),
            ])
            ->headerActions([
                Tables\Actions\Action::make('view_all')
                    ->label('Lihat semua')
                    ->url(JobResource::getUrl('index'))
                    ->link()
            ])
            ->emptyStateHeading('Tidak ada lowongan aktif')
            ->emptyStateIcon('heroicon-o-briefcase');
    }
}
