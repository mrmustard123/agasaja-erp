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
        Schema::create('movement', function (Blueprint $table) {
            $table->comment('warehouse movements');
            $table->bigInteger('mov_id', true);
            $table->char('mov_type', 10)->default('SALIDA');
            $table->dateTime('mov_date');
            $table->decimal('mov_cant', 10)->default(1);
            $table->char('mov_lot', 15)->nullable();
            $table->integer('product_id')->nullable()->index('fk_product02');
            $table->string('comments', 400)->nullable();
            $table->unsignedInteger('user_id')->nullable()->index('fk_user_id04');
            $table->char('reason', 15)->nullable();
            $table->dateTime('created_at')->nullable();
            $table->dateTime('updated_at')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('movement');
    }
};
