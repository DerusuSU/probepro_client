<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\ServiceCategory;
use Illuminate\Http\Request;

class ServiceCategoryController extends Controller
{
    public function index()
    {
        return ServiceCategory::with('services')->orderBy('order')->get();
    }

    public function show(ServiceCategory $category)
    {
        return $category->load('services');
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => 'required|string|max:255',
            'slug' => 'required|string|unique:service_categories',
            'description' => 'nullable|string',
            'meta_title' => 'nullable|string',
            'meta_description' => 'nullable|string',
            'image' => 'nullable|string',
            'order' => 'integer',
        ]);
        return ServiceCategory::create($data);
    }

    public function update(Request $request, ServiceCategory $category)
    {
        $data = $request->validate([
            'name' => 'sometimes|required|string|max:255',
            'slug' => 'sometimes|required|string|unique:service_categories,slug,' . $category->id,
            'description' => 'nullable|string',
            'meta_title' => 'nullable|string',
            'meta_description' => 'nullable|string',
            'image' => 'nullable|string',
            'order' => 'integer',
        ]);
        $category->update($data);
        return $category;
    }

    public function destroy(ServiceCategory $category)
    {
        $category->delete();
        return response()->noContent();
    }
}
