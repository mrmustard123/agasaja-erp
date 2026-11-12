<?php

namespace App\Http\Controllers;

use App\Models\Entry;
use App\Models\Movement;
use App\Models\Product;
use App\Models\ProductProduct;
use App\Models\ProductSupply;
use App\Models\Supply;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class MovementController extends Controller
{
    public function recent(Request $request): JsonResponse
    {
        $limit = max(1, min(20, (int) $request->input('limit', 5)));

        $movements = Movement::query()
            ->select('movement.*', 'product.product_name')
            ->leftJoin('product', 'product.product_id', '=', 'movement.product_id')
            ->orderByDesc('movement.mov_id')
            ->limit($limit)
            ->get();

        return response()->json($movements->map(function ($movement) {
            return [
                'mov_id' => $movement->mov_id,
                'mov_date' => $movement->mov_date,
                'mov_type' => $movement->mov_type,
                'mov_cant' => (float) $movement->mov_cant,
                'product_name' => $movement->product_name ?? 'Producto',
                'comments' => $movement->comments,
            ];
        }));
    }

    public function store(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'mov_date' => ['required', 'date_format:Y-m-d H:i:s'],
            'mov_type' => ['required', 'in:ENTRADA,SALIDA'],
            'product_id' => ['required', 'integer', 'min:1'],
            'mov_cant' => ['required', 'numeric', 'min:0'],
            'mov_lot' => ['nullable', 'string', 'max:15'],
            'reason' => ['nullable', 'string', 'max:15'],
            'comments' => ['nullable', 'string', 'max:400'],
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validation failed',
                'errors' => $validator->errors(),
            ], 422);
        }

        $product = Product::find($request->input('product_id'));

        if (! $product) {
            return response()->json([
                'message' => 'Product not found',
            ], 404);
        }

        $movementType = strtoupper((string) $request->input('mov_type'));
        $quantity = (float) $request->input('mov_cant');
        $date = $request->input('mov_date');
        $reason = strtoupper((string) ($request->input('reason') ?? ''));
        $userId = $request->user()?->user_id ?? auth()->id();

        $movement = Movement::create([
            'mov_type' => $movementType,
            'mov_date' => $date,
            'mov_cant' => $quantity,
            'product_id' => $product->product_id,
            'mov_lot' => $request->input('mov_lot'),
            'comments' => $request->input('comments'),
            'user_id' => $userId,
            'reason' => $reason ?: null,
        ]);

        if ($movementType === 'ENTRADA') {

            $product->stock = (float) $product->stock + $quantity;
            $product->save();


            /*READ ME AI AGENT: I CHANGED THE IF'S FOR A SWITCH, I LIKE IT MORE... */
            switch ($reason){
                case 'PRODUCCION':
                    $this->applyProductionMovement($product, $quantity, $date, $reason, $request->input('comments'), $userId, $request->input('mov_lot'));                                                                            
                    break;
                case 'COSECHA':
                    /*READ ME AI AGENT: YOU FORGOT TO IMPLEMENT THIS FEATURE, 
                        BUT WE WILL NOT IMPLEMENT IT UNTIL I COMMAND YOU TO DO IT.*/
                    break;
                case 'ALMACENAJE':                                                         
                    /*READ ME AI AGENT: TO DO: IMPLEMENT THIS FEATURE, BUT DON'T DO ANYTHING YET,
                    I WILL TELL YOU WHEN TO DO IT. */
                    break;
            }




        } elseif ($movementType === 'SALIDA') {
            $product->stock = max(0, (float) $product->stock - $quantity);
            $product->save();

            switch ($reason){
                case 'PRODUCCION':                                                
                /*READ ME AI AGENT: TO DO: IMPLEMENT THIS FEATURE, BUT DON'T DO ANYTHING YET,
                I WILL TELL YOU WHEN TO DO IT. */                    
                    break;
                case 'VENTA':                
                /*READ ME AI AGENT: TO DO: IMPLEMENT THIS FEATURE, BUT DON'T DO ANYTHING YET,
                I WILL TELL YOU WHEN TO DO IT. */                                                   
                    break;
                case 'CONSIGNACION':         
                /*READ ME AI AGENT: TO DO: IMPLEMENT THIS FEATURE, BUT DON'T DO ANYTHING YET,
                I WILL TELL YOU WHEN TO DO IT. */                                   
                    break;
                case 'DEVOLUCION':           
                /*READ ME AI AGENT: TO DO: IMPLEMENT THIS FEATURE, BUT DON'T DO ANYTHING YET,
                I WILL TELL YOU WHEN TO DO IT. */                                 
                    break;
            }


        }

        return response()->json([
            'message' => 'Movement saved',
            'movement' => $movement,
        ], 201);
    }

    protected function applyProductionMovement(Product $product, float $quantity, string $date, string $reason, ?string $comments, ?int $userId, ?string $movLot): void
    {

        /* READ ME AI AGENT: We will need a $costs variable for adding all the costs */


        /*************** PRODUCTS/INGREDIENTS ***************/

        $components = ProductProduct::where('product_id', $product->product_id)->get();

        foreach ($components as $component) {
            $ingredient = Product::find($component->ingredient_id);

            if (! $ingredient) {
                continue;
            }

            $ingredientQuantity = (float) $component->cant * $quantity;

            Movement::create([
                'mov_type' => 'SALIDA',
                'mov_date' => $date,
                'mov_cant' => $ingredientQuantity,
                'product_id' => $ingredient->product_id,
                'mov_lot' => $movLot,
                'comments' => $comments,
                'user_id' => $userId,
                'reason' => $reason,
            ]);

            $ingredient->stock = max(0, (float) $ingredient->stock - $ingredientQuantity);
            $ingredient->save();

            if ($ingredient->account_id && $ingredient->production_cost) {
                Entry::create([
                    'entry_date' => $date,
                    'details' => $comments,
                    'balance' => round($ingredientQuantity * (float) $ingredient->production_cost * -1, 5),
                    'account_id' => $ingredient->account_id,
                    'user_id' => $userId,
                ]);
            }
        }

        /*************** SUPPLIES ***************/

        $supplies = ProductSupply::where('product_id', $product->product_id)->get();

        foreach ($supplies as $supplyRelation) {
            $supply = Supply::find($supplyRelation->supply_id);

            if (! $supply) {
                continue;
            }

            $supplyQuantity = (float) $supplyRelation->cant * $quantity;
            $supply->stock = max(0, (float) $supply->stock - $supplyQuantity);
            $supply->save();

            if ($supply->account_id) {
                Entry::create([
                    'entry_date' => $date,
                    'details' => $comments,
                    //'balance' => round($supplyQuantity * (float) ($supply->unit_cost ?? 0) * -1, 5), READ ME AI AGENT: There is no unit_cost
                    'balance' => round($supplyQuantity * (float) ($supply->price ?? 0) * -1, 5),
                    'account_id' => $supply->account_id,
                    'user_id' => $userId,
                ]);
            }
        }



        /*************** PRODUCTION COSTS ***************/  
        
        /*READ ME AI AGENT: TO DO: Here we will implement the production costs
        accounting entries logic. */


        /*READ ME AI AGENT: Well well, we finally reach the end of the 
        accounting for this production process.
        This last acounting entry is the product entry, in this sense, 
        we have the sum of the ingredients, supplies and costs that make
        the finished product price wich is set to the debit column (positive),
        this is why we must multiply by -1 all the costs (negatives)
        that are in the credit column.
        The sum of all the costs (ingredients, supplies, other costs) are added
        in the $costo_total variable.
        */

        if ($product->account_id) {
            Entry::create([
                'entry_date' => $date,
                'details' => $comments,
                'balance' => round($quantity * (float) ($product->production_cost ?? 0), 5),
                'account_id' => $product->account_id,
                'user_id' => $userId,
            ]);
        }
    }
}
