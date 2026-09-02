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
        Schema::table('supply', function (Blueprint $table) {
            $table->foreign(['account_id'], 'fk_account_id03')->references(['account_id'])->on('account')->onUpdate('cascade')->onDelete('no action');
            $table->foreign(['cost_account_id'], 'fk_cost_account_id01')->references(['account_id'])->on('account')->onUpdate('cascade')->onDelete('no action');
            $table->foreign(['prod_cost_id'], 'fk_prod_cost_id')->references(['prod_cost_id'])->on('product_cost')->onUpdate('cascade')->onDelete('no action');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('supply', function (Blueprint $table) {
            $table->dropForeign('fk_account_id03');
            $table->dropForeign('fk_cost_account_id01');
            $table->dropForeign('fk_prod_cost_id');
        });
    }
};
