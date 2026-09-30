<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Models\Job;
use App\Models\Application;

Route::get('/jobs', function () {
    return Job::where('is_active', true)->get();
});

Route::get('/jobs/{id}', function ($id) {
    return Job::findOrFail($id);
});

Route::post('/applications', function (\App\Http\Requests\StoreApplicationRequest $request, \App\Services\CvUploadService $cvService) {
    // Early size check before heavy validation
    if ($request->hasFile('cv')) {
        $file = $request->file('cv');
        if ($file->getSize() > 2048 * 1024) { // 2MB
            return response()->json(['message' => 'Ukuran CV maksimal 2MB.', 'errors' => ['cv' => ['Ukuran CV maksimal 2MB.']]], 422);
        }
    }
    
    // Honeypot check
    if ($request->filled('honeypot')) {
        // Silently reject
        return response()->json(['message' => 'Application submitted successfully!'], 201);
    }

    $validated = $request->validated();
    unset($validated['honeypot'], $validated['cv']); // Remove before save

    try {
        $application = $cvService->validateAndStore($validated, $request->file('cv'));
        return response()->json(['message' => 'Application submitted successfully!', 'data' => $application], 201);
    } catch (\Exception $e) {
        return response()->json(['message' => $e->getMessage(), 'errors' => ['cv' => [$e->getMessage()]]], 422);
    }
})->middleware('throttle:5,10');
