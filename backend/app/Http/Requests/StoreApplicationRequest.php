<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreApplicationRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'job_id' => ['required', 'exists:jobs,id'],
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'email', 'max:255'],
            'phone' => ['required', 'string', 'max:20'],
            'portofolio_url' => ['nullable', 'url', 'max:255'],
            'cv' => ['required', 'file', 'max:2048', 'mimes:pdf', 'mimetypes:application/pdf', 'extensions:pdf'],
            'honeypot' => ['nullable', 'string'] // Handled in controller
        ];
    }

    public function messages(): array
    {
        return [
            'cv.required' => 'CV wajib diunggah.',
            'cv.file' => 'CV harus berupa file.',
            'cv.max' => 'Ukuran CV maksimal 2MB.',
            'cv.mimes' => 'CV harus berformat PDF.',
            'cv.mimetypes' => 'CV harus berformat PDF.',
            'cv.extensions' => 'CV harus berformat PDF.',
            'job_id.required' => 'Pekerjaan wajib dipilih.',
            'job_id.exists' => 'Pekerjaan tidak valid.',
        ];
    }
}
