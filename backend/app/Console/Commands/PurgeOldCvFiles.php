<?php

namespace App\Console\Commands;

use App\Models\Application;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Storage;
use Carbon\Carbon;

class PurgeOldCvFiles extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'applications:purge-cv';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Menghapus file CV dari lamaran berstatus ditolak/diterima yang lebih dari 180 hari';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $cutoffDate = Carbon::now()->subDays(180);
        
        $applications = Application::whereNotNull('cv_path')
            ->whereIn('status', ['rejected', 'accepted'])
            ->where('updated_at', '<', $cutoffDate)
            ->get();

        $count = 0;
        foreach ($applications as $app) {
            if (Storage::disk('private')->exists($app->cv_path)) {
                Storage::disk('private')->delete($app->cv_path);
            }
            
            $app->update([
                'cv_path' => null,
                'cv_original_name' => null,
                'cv_mime' => null,
                'cv_size' => null,
                'cv_hash' => null,
            ]);
            
            $count++;
        }

        $this->info("Berhasil menghapus {$count} file CV lama.");
    }
}
