<?php

namespace App\Filament\Resources;

use App\Filament\Resources\ApplicationResource\Pages;
use App\Filament\Resources\ApplicationResource\RelationManagers;
use App\Models\Application;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;

class ApplicationResource extends Resource
{
    protected static ?string $model = Application::class;

    protected static ?string $modelLabel = 'Pelamar';
    protected static ?string $pluralModelLabel = 'Pelamar';
    protected static ?string $navigationIcon = 'heroicon-o-inbox-arrow-down';
    protected static ?string $navigationGroup = 'Rekrutmen';
    protected static ?int $navigationSort = 2;

    public static function getNavigationBadge(): ?string
    {
        return static::getModel()::whereIn('status', ['pending', 'baru'])->count() ?: null;
    }

    public static function getNavigationBadgeColor(): ?string
    {
        return 'warning';
    }

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Section::make('Applicant Information')
                    ->schema([
                        Forms\Components\Select::make('job_id')
                            ->relationship('job', 'title')
                            ->required()
                            ->searchable()
                            ->preload(),
                        Forms\Components\Select::make('status')
                            ->options([
                                'pending' => 'Pending',
                                'reviewed' => 'Reviewed',
                                'interviewed' => 'Interviewed',
                                'accepted' => 'Accepted',
                                'rejected' => 'Rejected',
                            ])
                            ->default('pending')
                            ->required(),
                        Forms\Components\TextInput::make('name')
                            ->required()
                            ->maxLength(255),
                        Forms\Components\TextInput::make('email')
                            ->email()
                            ->required()
                            ->maxLength(255),
                        Forms\Components\TextInput::make('phone')
                            ->tel()
                            ->maxLength(255),
                        Forms\Components\TextInput::make('portofolio_url')
                            ->url()
                            ->maxLength(255),
                    ])->columns(2),

                Forms\Components\Section::make('Notes & CV')
                    ->schema([
                        Forms\Components\Placeholder::make('cv_info')
                            ->label('File CV')
                            ->content(function ($record) {
                                if (!$record || !$record->cv_path) return 'Tidak ada CV yang diunggah.';
                                $size = round($record->cv_size / 1024, 2) . ' KB';
                                return $record->cv_original_name . ' (' . $size . ')';
                            })
                            ->hintAction(
                                Forms\Components\Actions\Action::make('download_cv_form')
                                    ->label('Unduh CV')
                                    ->icon('heroicon-m-arrow-down-tray')
                                    ->url(fn ($record) => $record && $record->cv_path ? route('admin.applications.cv', $record) : null)
                                    ->openUrlInNewTab()
                                    ->visible(fn ($record) => $record && $record->cv_path !== null)
                            ),
                        Forms\Components\Textarea::make('notes')
                            ->columnSpanFull(),
                    ]),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('name')
                    ->searchable()
                    ->sortable(),
                Tables\Columns\TextColumn::make('job.title')
                    ->searchable()
                    ->sortable(),
                Tables\Columns\TextColumn::make('email')
                    ->searchable(),
                Tables\Columns\BadgeColumn::make('status')
                    ->colors([
                        'warning' => 'pending',
                        'primary' => 'reviewed',
                        'success' => fn ($state) => in_array($state, ['interviewed', 'accepted']),
                        'danger' => 'rejected',
                    ]),
                Tables\Columns\TextColumn::make('cv_path')
                    ->label('CV')
                    ->icon(fn ($state) => $state ? 'heroicon-m-document-text' : 'heroicon-m-x-circle')
                    ->color(fn ($state) => $state ? 'success' : 'gray')
                    ->formatStateUsing(fn ($record) => $record->cv_path ? (round($record->cv_size / 1024, 0) . ' KB') : '-')
                    ->toggleable(),
                Tables\Columns\TextColumn::make('created_at')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: false),
            ])
            ->filters([
                Tables\Filters\SelectFilter::make('job_id')
                    ->relationship('job', 'title')
                    ->label('Job'),
                Tables\Filters\SelectFilter::make('status')
                    ->options([
                        'pending' => 'Pending',
                        'reviewed' => 'Reviewed',
                        'interviewed' => 'Interviewed',
                        'accepted' => 'Accepted',
                        'rejected' => 'Rejected',
                    ]),
            ])
            ->actions([
                Tables\Actions\EditAction::make(),
                Tables\Actions\Action::make('download_cv')
                    ->label('Unduh CV')
                    ->icon('heroicon-o-arrow-down-tray')
                    ->url(fn ($record) => $record->cv_path ? route('admin.applications.cv', $record) : null)
                    ->openUrlInNewTab()
                    ->visible(fn ($record) => $record->cv_path !== null),
                Tables\Actions\Action::make('delete_cv')
                    ->label('Hapus CV')
                    ->icon('heroicon-o-trash')
                    ->color('danger')
                    ->requiresConfirmation()
                    ->visible(fn ($record) => $record->cv_path !== null)
                    ->action(function ($record) {
                        if ($record->cv_path) {
                            \Illuminate\Support\Facades\Storage::disk('private')->delete($record->cv_path);
                            $record->update([
                                'cv_path' => null,
                                'cv_original_name' => null,
                                'cv_mime' => null,
                                'cv_size' => null,
                                'cv_hash' => null,
                            ]);
                            \Filament\Notifications\Notification::make()
                                ->title('CV berhasil dihapus')
                                ->success()
                                ->send();
                        }
                    }),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make(),
                ]),
            ]);
    }

    public static function getRelations(): array
    {
        return [
            //
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListApplications::route('/'),
            'create' => Pages\CreateApplication::route('/create'),
            'edit' => Pages\EditApplication::route('/{record}/edit'),
        ];
    }
}
