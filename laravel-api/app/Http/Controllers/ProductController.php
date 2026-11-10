<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $query = Product::query();
        $search = trim((string) $request->input('search', ''));
        $limit = max(1, min(20, (int) $request->input('limit', 8)));

        if ($search !== '') {
            $query->where(function ($builder) use ($search) {
                $builder->where('product_name', 'like', "%{$search}%")
                    ->orWhere('product_id', 'like', "%{$search}%");
            });
        }

        $products = $query
            ->orderBy('product_name')
            ->limit($limit)
            ->get([
                'product_id',
                'product_name',
                'stock',
                'unit',
            ]);

        return response()->json($products);
    }
}
