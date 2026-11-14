<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class JournalEntryController extends Controller
{
    public function index(Request $request)
    {
        $startDate = $request->query('start_date');
        $endDate = $request->query('end_date');

        if (!$startDate || !$endDate) {
            $startDate = now()->subDays(30)->toDateString();
            $endDate = now()->toDateString();
        }

        if ($startDate > $endDate) {
            return response()->json([
                'message' => 'The end date must be equal to or later than the start date.',
            ], 422);
        }

        $rows = DB::table('entry as e')
            ->join('account as a', 'a.account_id', '=', 'e.account_id')
            ->select([
                'e.entry_id as entry_id',
                'e.entry_date as entry_date',
                'a.account_code as account_code',
                'a.name as account_name',
                'e.details as details',
                'e.balance as balance',
                'e.cbte_cont_nro as document_number',
            ])
            ->whereDate('e.entry_date', '>=', $startDate)
            ->whereDate('e.entry_date', '<=', $endDate)
            ->orderBy('e.entry_date')
            ->orderBy('e.entry_id')
            ->limit(3000)
            ->get();

        return response()->json($rows);
    }
}
