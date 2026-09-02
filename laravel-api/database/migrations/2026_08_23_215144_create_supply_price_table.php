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
        Schema::create('supply_price', function (Blueprint $table) {
            $table->increments('supply_price_id');
            $table->decimal('value', 10, 5);
            $table->dateTime('start_date');
            $table->string('comments', 400)->nullable();
            $table->integer('supply_id')->index('fk_supply_id01');
            $table->dateTime('created_at')->nullable();
            $table->dateTime('updated_at')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('supply_price');
    }
};
