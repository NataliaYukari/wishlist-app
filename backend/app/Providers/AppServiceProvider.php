<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Laravel\Sanctum\Sanctum;
use App\Models\PersonalAccessToken;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        
        Sanctum::usePersonalAccessTokenModel(PersonalAccessToken::class);

        try {
            DB::connection()->getPdo();
            $dbName = DB::connection()->getDatabaseName();

            Log::info("Connected to the database: {$dbName}");
        
        } catch (\Exception $e) {
            Log::error("Unable to connect to the datase: " . $e->getMessage());
        }

    }
}
