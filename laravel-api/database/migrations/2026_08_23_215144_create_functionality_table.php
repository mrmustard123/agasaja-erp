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
        Schema::create('functionality', function (Blueprint $table) {
            $table->increments('id_functionality');
            $table->string('func_name', 100)->unique('idx1_func_name');
            $table->string('icon_name', 200)->nullable();
            $table->string('func_link', 200)->nullable();
            $table->dateTime('created_at')->nullable();
            $table->dateTime('updated_at')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('functionality');
    }
};
