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
        Schema::table('entry', function (Blueprint $table) {
            $table->foreign(['account_id'], 'fk_account_id')->references(['account_id'])->on('account')->onUpdate('cascade')->onDelete('no action');
            $table->foreign(['user_id'], 'fk_user_id02')->references(['user_id'])->on('user')->onUpdate('no action')->onDelete('no action');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('entry', function (Blueprint $table) {
            $table->dropForeign('fk_account_id');
            $table->dropForeign('fk_user_id02');
        });
    }
};
