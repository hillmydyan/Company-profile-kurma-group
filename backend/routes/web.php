<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/', function () {
    return redirect('/admin');
});

Route::middleware(['auth', 'web'])->group(function () {
    Route::get('/admin/applications/{application}/cv', function (\App\Models\Application $application) {
        if (!$application->cv_path || !\Illuminate\Support\Facades\Storage::disk('private')->exists($application->cv_path)) {
            abort(404);
        }

        return response()->streamDownload(function () use ($application) {
            $stream = \Illuminate\Support\Facades\Storage::disk('private')->readStream($application->cv_path);
            fpassthru($stream);
            if (is_resource($stream)) {
                fclose($stream);
            }
        }, $application->cv_original_name ?: 'cv.pdf', [
            'Content-Type' => 'application/pdf',
            'Content-Disposition' => 'attachment; filename="' . ($application->cv_original_name ?: 'cv.pdf') . '"',
            'X-Content-Type-Options' => 'nosniff',
            'Content-Security-Policy' => "default-src 'none'",
        ]);
    })->name('admin.applications.cv');
});
