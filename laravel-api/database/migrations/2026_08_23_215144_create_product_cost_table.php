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
        Schema::create('product_cost', function (Blueprint $table) {
            $table->integer('prod_cost_id', true);
            $table->string('cost_name');
            $table->string('comments')->nullable();
            $table->char('cost_type', 15)->nullable()->default('VENTA');
            $table->char('saving_type', 15)->nullable();
            $table->unsignedBigInteger('saving_id')->nullable()->index('fk_account_id7');
            $table->unsignedBigInteger('account_id')->nullable()->index('fk_account_id3');
            $table->dateTime('created_at')->nullable();
            $table->dateTime('updated_at')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('product_cost');
    }
};
