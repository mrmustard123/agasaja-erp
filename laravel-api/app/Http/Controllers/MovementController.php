<?php

namespace App\Http\Controllers;

use App\Models\Entry;
use App\Models\Movement;
use App\Models\MovSupply;
use App\Models\Product;
use App\Models\ProductProduct;
use App\Models\ProductSupply;
use App\Models\ProdCostProd;
use App\Models\Supply;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
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
        $mov_quantity = (float) $request->input('mov_cant');
        $date = $request->input('mov_date');
        $reason = strtoupper((string) ($request->input('reason') ?? ''));
        $userId = $request->user()?->user_id ?? auth()->id();

        /*1.- Salvar el movimiento */
        $movement = Movement::create([
            'mov_type' => $movementType,
            'mov_date' => $date,
            'mov_cant' => $mov_quantity,
            'product_id' => $product->product_id,
            'mov_lot' => $request->input('mov_lot'),
            'comments' => $request->input('comments'),
            'user_id' => $userId,
            'reason' => $reason ?: null,
        ]);

        /* 2.- Disminuir por cada movimiento de ENTRADA, el stock de ingredientes de la receta del producto */
        if ($movementType === 'ENTRADA') {

            /*2a. Aumentar el stock del producto */
            $product->stock = (float) $product->stock + $mov_quantity;
            $product->save();


            /*READ ME AI AGENT: I CHANGED THE IF'S FOR A SWITCH, I LIKE IT MORE... */
            switch ($reason){
                case 'PRODUCCION':
                    $this->applyProductionMovement($product, $mov_quantity, $date, $reason, $request->input('comments'), $userId, $request->input('mov_lot'));                                                                            
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
            $product->stock = max(0, (float) $product->stock - $mov_quantity);
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

    protected function getProdCostProdByProductId(int $productId)
    {
        return DB::table('prod_cost_prod as c')
            ->join('product as p', 'c.product_id', '=', 'p.product_id')
            ->join('product_cost as t', 'c.prod_cost_id', '=', 't.prod_cost_id')
            ->select(
                'c.prod_cost_prod_id as prod_cost_prod_id',
                'p.product_name as product_name',
                't.cost_name as cost_name',
                'c.cost_value as cost_value',
                't.account_id as account_id',
                't.cost_type as cost_type',
                't.saving_type as saving_type',
                't.saving_id as saving_id',
            )
            ->where('c.product_id', $productId)
            ->orderBy('p.product_name')
            ->orderBy('t.cost_name')
            ->get();
    }

    protected function applyProductionMovement(Product $product, float $mov_quantity, string $date, string $reason, ?string $comments, ?int $userId, ?string $movLot): void
    {

        /* READ ME AI AGENT: We will need a $costs variable for adding all the costs */

         /*CREAR LOS ASIENTOS EN EL LIBRO DIÁRIO */

        /*************** PRODUCTS/INGREDIENTS ***************/

        /*3. Obtener todos los ingredientes del producto */
        $components = ProductProduct::where('product_id', $product->product_id)->get();

        $total_cost = 0;

        /*5. Disminuir del stock de cada producto(ingrediente) la cantidad especificada en la 
            lista de product_products */         
        foreach ($components as $component) 
        {
                  
            
            $ingredient = Product::find($component->ingredient_id);

            if (! $ingredient) {
                continue;
            }

            $ingredientQuantity = (float) $component->cant * $mov_quantity;

            /*2b. Disminuir el stock del ingrediente */
            $ingredient->stock = max(0, (float) $ingredient->stock - $ingredientQuantity);
            $ingredient->save();            

            Movement::create([
                'mov_date' => $date,
                'mov_type' => 'SALIDA',
                'mov_cant' => $ingredientQuantity,
                'product_id' => $ingredient->product_id,
                'mov_lot' => $movLot,
                'comments' => $comments,
                'reason' => $reason,                
                'user_id' => $userId,
            ]);

            $price = $ingredient->production_cost;
            /*Asientos*/
            $cost = $ingredientQuantity * (float) $price * -1;

            $total_cost += $cost;

            if ( $ingredient->account_id && ($cost!==0) )
            {
                Entry::create([
                    'account_id' => $ingredient->account_id,
                    'entry_date' => $date,
                    'details' => $comments,
                    'balance' => round($cost, 5),                    
                    'user_id' => $userId,
                ]);
            }
        }

        /*************** SUPPLIES ***************/

        /*5. Obtener los insumos o materiales indirectos */
        $supplies = ProductSupply::where('product_id', $product->product_id)->get();

        /*6. Disminuir el stock de insumos del producto terminado */
        foreach ($supplies as $supplyRelation) 
        {
            $supply = Supply::find($supplyRelation->supply_id);

            if (! $supply) {
                continue;
            }

            $supplyQuantity = (float) $supplyRelation->cant * $mov_quantity;
            $supply->stock = max(0, (float) $supply->stock - $supplyQuantity);
            $supply->save();

            MovSupply::create([
                'mov_supply_type' => 'SALIDA',
                'mov_supply_date' => $date,
                'mov_supply_cant' => $supplyQuantity,
                'mov_supply_lot' => $movLot,
                'supply_id' => $supply->supply_id,
                'comments' => $comments ,
                'user_id' => $userId,
            ]);

            $price = $supply->price;
            /*Asientos */

            $cost = $supplyQuantity * (float) $price * -1;

            $total_cost += $cost;    

            if ( $supply->account_id && ($cost!==0) )
            {                    
                Entry::create([
                    'account_id' => $supply->account_id,                        
                    'entry_date' => $date,
                    'details' => $comments,
                    'balance' => round($cost, 5),                        
                    'user_id' => $userId,
                ]);
            }
        }//end foreach ($supplies as $supplyRelation) 



        /*************** PRODUCTION COSTS ***************/  
        
        /*READ ME AI AGENT: TO DO: Here we will implement the production costs
        accounting entries logic. */
       

        $prodCostProds = $this->getProdCostProdByProductId((int) $product->product_id);

        foreach ($prodCostProds as $prodCostProd) {
            if ($prodCostProd->saving_type == 'MANO DE OBRA' && $prodCostProd->cost_type !== 'ESPECIAL') {
                $cost = (float) $prodCostProd->cost_value * $mov_quantity * -1;

                $total_cost += $cost;

                if ($prodCostProd->account_id && $cost !== 0) {
                    Entry::create([
                        'account_id' => $prodCostProd->account_id,
                        'entry_date' => $date,
                        'details' => $comments,
                        'balance' => round($cost, 5),
                        'user_id' => $userId,
                    ]);
                }
            }

            if ($prodCostProd->saving_type == 'PRODUCCION' && $prodCostProd->cost_type !== 'ESPECIAL') {
                $cost = (float) $prodCostProd->cost_value * $mov_quantity * -1;

                $total_cost += $cost;

                if ($prodCostProd->account_id && $cost !== 0) {
                    Entry::create([
                        'account_id' => $prodCostProd->account_id,
                        'entry_date' => $date,
                        'details' => $comments,
                        'balance' => round($cost, 5),
                        'user_id' => $userId,
                    ]);
                }
            }
        }
        /***************FIN PRODUCTION COSTS ***************/ 




        if ($product->account_id) {
            Entry::create([
                'account_id' => $product->account_id,
                'entry_date' => $date,
                'details' => $comments,
                'balance' => round($total_cost * -1, 5),                
                'user_id' => $userId,
            ]);
        }

    } // end protected function applyProductionMovement
}
