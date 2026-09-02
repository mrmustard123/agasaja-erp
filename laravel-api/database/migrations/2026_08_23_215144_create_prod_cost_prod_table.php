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
        Schema::create('prod_cost_prod', function (Blueprint $table) {
            $table->integer('prod_cost_prod_id', true);
            $table->integer('product_id');
            $table->integer('prod_cost_id')->index('fk_prod_cost_id1');
            $table->decimal('cost_value', 10, 5)->default(0);
            $table->dateTime('created_at')->nullable();
            $table->dateTime('updated_at')->nullable();

            $table->unique(['product_id', 'prod_cost_id'], 'idx_prod_cost1');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('prod_cost_prod');
    }
};
