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
        Schema::table('consig_prod', function (Blueprint $table) {
            $table->foreign('product_id', 'fk_consig_prod_product')
                        ->references('product_id')
                        ->on('product')
                        ->onUpdate('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('consig_prod', function (Blueprint $table) {
          $table->dropForeign('fk_consig_prod_product');
        });
    }
};
