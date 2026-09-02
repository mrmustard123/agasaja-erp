<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('consignee', function (Blueprint $table) {
            $table->foreign(['account_id'], 'fk_consignee_account1')->references(['account_id'])->on('account')->onUpdate('no action')->onDelete('no action');
            $table->foreign(['ctas_por_cobrar_id'], 'fk_consignee_account2')->references(['account_id'])->on('account')->onUpdate('no action')->onDelete('no action');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('consignee', function (Blueprint $table) {
            $table->dropForeign('fk_consignee_account1');
            $table->dropForeign('fk_consignee_account2');
        });
    }
};
