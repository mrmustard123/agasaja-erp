<?php
// app/Http/Controllers/UserFunctionalitiesController.php
namespace App\Http\Controllers;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class UserFunctionalitiesController extends Controller
{
    public function __invoke(Request $request): JsonResponse
    {

        $group = $request->user()?->usersGroup()->first(); //<- breakpoint

        if (! $group) {
            return response()->json(['functionalities' => []]);
        }

        $functionalities = $group->directives()
            ->where('directive_rule', 'PERMITIR')
            ->pluck('id_functionality')
            ->toArray();

        return response()->json(['functionalities' => $functionalities]);

    }
}
