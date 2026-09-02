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
        Schema::table('directive', function (Blueprint $table) {
            $table->foreign(['id_functionality'], 'fk_id_functionality')->references(['id_functionality'])->on('functionality')->onUpdate('cascade')->onDelete('no action');
            $table->foreign(['id_users_group'], 'fk_id_users_group1')->references(['id_users_group'])->on('users_group')->onUpdate('cascade')->onDelete('no action');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('directive', function (Blueprint $table) {
            $table->dropForeign('fk_id_functionality');
            $table->dropForeign('fk_id_users_group1');
        });
    }
};
