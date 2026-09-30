<?php

namespace App\Services;

use App\Models\Application;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;

class CvUploadService
{
    public function validateAndStore(array $applicationData, UploadedFile $file): Application
    {
        return DB::transaction(function () use ($applicationData, $file) {
            $this->validateDeepCv($file);

            $path = $this->storeFile($file);

            $applicationData['cv_path'] = $path;
            $applicationData['cv_original_name'] = $this->sanitizeFileName($file->getClientOriginalName());
            $applicationData['cv_mime'] = $this->getRealMimeType($file);
            $applicationData['cv_size'] = $file->getSize();
            $applicationData['cv_hash'] = hash_file('sha256', $file->getRealPath());
            
            // Set status defaults
            $applicationData['status'] = 'baru'; // or pending

            return Application::create($applicationData);
        });
    }

    protected function validateDeepCv(UploadedFile $file): void
    {
        $realPath = $file->getRealPath();
        
        // Check magic bytes
        $magicBytes = file_get_contents($realPath, false, null, 0, 4);
        if ($magicBytes !== '%PDF') {
            throw new \Exception("File bukan PDF yang valid.");
        }

        // Check real MIME
        $mime = $this->getRealMimeType($file);
        if ($mime !== 'application/pdf') {
            throw new \Exception("Tipe file tidak diizinkan. Harus berupa PDF.");
        }

        // Check filename malicious patterns
        $originalName = $file->getClientOriginalName();
        if (preg_match('/\.pdf\.[a-z0-9]+$/i', $originalName) || 
            str_contains($originalName, "\0") || 
            str_contains($originalName, '..') || 
            str_contains($originalName, '/') || 
            str_contains($originalName, '\\')) {
            throw new \Exception("Nama file tidak valid atau mengandung karakter berbahaya.");
        }

        // Deep content inspection
        $content = file_get_contents($realPath);
        
        $maliciousPatterns = [
            '<?php',
            '<script',
        ];

        foreach ($maliciousPatterns as $pattern) {
            if (stripos($content, $pattern) !== false) {
                throw new \Exception("CV tidak boleh mengandung skrip berbahaya.");
            }
        }

        // Optional ClamAV scan
        if (config('app.cv_scan_enabled', false)) {
            $this->scanWithClamAv($realPath);
        }
    }

    protected function getRealMimeType(UploadedFile $file): string
    {
        $finfo = finfo_open(FILEINFO_MIME_TYPE);
        $mime = finfo_file($finfo, $file->getRealPath());
        finfo_close($finfo);
        return $mime;
    }

    protected function sanitizeFileName(string $name): string
    {
        $sanitized = preg_replace('/[^\w\s.-]/', '', $name);
        return Str::limit($sanitized, 120, '');
    }

    protected function storeFile(UploadedFile $file): string
    {
        $filename = Str::uuid() . '.pdf';
        $directory = 'cv/' . date('Y/m');
        
        $path = $file->storeAs($directory, $filename, 'private');
        
        // Attempt to set 0644 permission if running on unix
        $fullPath = storage_path('app/private/' . $path);
        if (file_exists($fullPath)) {
            @chmod($fullPath, 0644);
        }
        
        return $path;
    }

    protected function scanWithClamAv(string $realPath): void
    {
        // Placeholder for real clamscan
        $output = [];
        $returnVar = 0;
        // exec("clamscan " . escapeshellarg($realPath), $output, $returnVar);
        // if ($returnVar !== 0) { throw ... }
        
        Log::warning('ClamAV scan skipped because it is only a placeholder implementation.');
    }
}
