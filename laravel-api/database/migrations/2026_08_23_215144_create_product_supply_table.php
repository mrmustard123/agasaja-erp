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
        Schema::create('product_supply', function (Blueprint $table) {
            $table->bigInteger('product_suppy_id', true);
            $table->integer('product_id');
            $table->integer('supply_id')->index('fk_supply01');
            $table->tinyInteger('cant')->default(1);
            $table->dateTime('created_at')->nullable();
            $table->dateTime('updated_at')->nullable();

            $table->unique(['product_id', 'supply_id'], 'idx_001');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('product_supply');
    }
};
