<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateTaskRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'title' => ['required', 'string', 'max:20', 'min:3'],
            'description' => ['required', 'string', 'min:10', 'max:255'],
            'priority' => ['required', 'integer', 'max_digits:1', 'min:1', 'max:9'],
            'due_date' => ['required', 'date', 'after:yesterday'],
            'completed' => ['required', 'boolean']
        ];
    }
}