<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\ContactInformation;
use Illuminate\Http\Request;

class ContactInformationController extends Controller
{
    public function show()
    {
        return ContactInformation::first();
    }

    public function update(Request $request)
    {
        $info = ContactInformation::first();
        if (!$info) {
            $info = new ContactInformation();
        }
        $data = $request->validate([
            'phone' => 'required|string',
            'address' => 'required|string',
            'working_hours' => 'required|string',
        ]);
        $info->fill($data)->save();
        return $info;
    }
}
