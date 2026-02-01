<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class () extends Migration {
    public function up(): void
    {
        if (!Schema::hasTable('nicknames') || !Schema::hasColumn('nicknames', 'verified')) {
            return;
        }

        DB::table('nicknames')->whereNull('verified')->update(['verified' => false]);

        $driver = DB::getDriverName();

        switch ($driver) {
            case 'mysql':
            case 'mariadb':
                DB::statement('ALTER TABLE nicknames MODIFY verified TINYINT(1) NOT NULL DEFAULT 0');
                break;
            case 'pgsql':
                DB::statement('ALTER TABLE nicknames ALTER COLUMN verified SET DEFAULT false');
                break;
            case 'sqlsrv':
                DB::statement("ALTER TABLE nicknames ADD CONSTRAINT DF_nicknames_verified DEFAULT 0 FOR verified");
                break;
            case 'sqlite':
                // SQLite doesn't support ALTER COLUMN defaults in many versions.
                break;
            default:
                break;
        }
    }

    public function down(): void
    {
        if (!Schema::hasTable('nicknames') || !Schema::hasColumn('nicknames', 'verified')) {
            return;
        }

        $driver = DB::getDriverName();

        switch ($driver) {
            case 'mysql':
            case 'mariadb':
                DB::statement('ALTER TABLE nicknames MODIFY verified TINYINT(1) NOT NULL');
                break;
            case 'pgsql':
                DB::statement('ALTER TABLE nicknames ALTER COLUMN verified DROP DEFAULT');
                break;
            case 'sqlsrv':
                DB::statement('DECLARE @name nvarchar(200) = (SELECT name FROM sys.default_constraints WHERE parent_object_id = OBJECT_ID(\'nicknames\') AND parent_column_id = COLUMNPROPERTY(OBJECT_ID(\'nicknames\'), \'verified\', \'ColumnId\')); IF @name IS NOT NULL EXEC(\'ALTER TABLE nicknames DROP CONSTRAINT \' + @name)');
                break;
            case 'sqlite':
                break;
            default:
                break;
        }
    }
};
