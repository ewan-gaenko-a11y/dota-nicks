<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class () extends Migration {
    public function up(): void
    {
        if (!Schema::hasTable('nicknames')) {
            return;
        }

        if (Schema::hasColumn('nicknames', 'comment')) {
            return;
        }

        if (!Schema::hasColumn('nicknames', 'author')) {
            return;
        }

        $driver = DB::getDriverName();

        switch ($driver) {
            case 'mysql':
            case 'mariadb':
                DB::statement('ALTER TABLE nicknames CHANGE author comment VARCHAR(255) NULL');
                break;
            case 'pgsql':
            case 'sqlite':
                DB::statement('ALTER TABLE nicknames RENAME COLUMN author TO comment');
                break;
            case 'sqlsrv':
                DB::statement("EXEC sp_rename 'nicknames.author', 'comment', 'COLUMN'");
                break;
            default:
                Schema::table('nicknames', function (Blueprint $table) {
                    $table->renameColumn('author', 'comment');
                });
        }
    }

    public function down(): void
    {
        if (!Schema::hasTable('nicknames')) {
            return;
        }

        if (Schema::hasColumn('nicknames', 'author')) {
            return;
        }

        if (!Schema::hasColumn('nicknames', 'comment')) {
            return;
        }

        $driver = DB::getDriverName();

        switch ($driver) {
            case 'mysql':
            case 'mariadb':
                DB::statement('ALTER TABLE nicknames CHANGE comment author VARCHAR(255) NULL');
                break;
            case 'pgsql':
            case 'sqlite':
                DB::statement('ALTER TABLE nicknames RENAME COLUMN comment TO author');
                break;
            case 'sqlsrv':
                DB::statement("EXEC sp_rename 'nicknames.comment', 'author', 'COLUMN'");
                break;
            default:
                Schema::table('nicknames', function (Blueprint $table) {
                    $table->renameColumn('comment', 'author');
                });
        }
    }
};
