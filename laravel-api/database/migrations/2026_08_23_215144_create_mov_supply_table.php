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
        Schema::create('mov_supply', function (Blueprint $table) {
            $table->integer('mov_supply_id', true);
            $table->char('mov_supply_type', 10)->default('ENTRADA');
            $table->dateTime('mov_supply_date');
            $table->integer('mov_supply_cant')->default(1);
            $table->char('mov_supply_lot', 15)->nullable();
            $table->integer('supply_id')->index('fk_supply_id02');
            $table->string('comments', 400)->nullable();
            $table->unsignedInteger('user_id')->nullable()->index('fk_user_id03');
            $table->dateTime('created_at')->nullable();
            $table->dateTime('updated_at')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('mov_supply');
    }
};
