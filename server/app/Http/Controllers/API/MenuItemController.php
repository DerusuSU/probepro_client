<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\MenuItem;
use Illuminate\Http\Request;

class MenuItemController extends Controller
{
    public function index()
    {
        return MenuItem::with('children')->whereNull('parent_id')->orderBy('order')->get();
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'title' => 'required|string|max:255',
            'url' => 'required|string',
            'parent_id' => 'nullable|exists:menu_items,id',
            'order' => 'integer',
        ]);
        return MenuItem::create($data);
    }

    public function update(Request $request, MenuItem $menuItem)
    {
        $data = $request->validate([
            'title' => 'sometimes|required|string|max:255',
            'url' => 'sometimes|required|string',
            'parent_id' => 'nullable|exists:menu_items,id',
            'order' => 'integer',
        ]);
        $menuItem->update($data);
        return $menuItem;
    }

    public function destroy(MenuItem $menuItem)
    {
        $menuItem->delete();
        return response()->noContent();
    }
}
