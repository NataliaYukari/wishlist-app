// backend/app/Models/PersonalAccessToken.php
<?php

namespace App\Models;

use MongoDB\Laravel\Eloquent\Model;
use Laravel\Sanctum\PersonalAccessToken as SanctumPersonalAccessToken;

class PersonalAccessToken extends SanctumPersonalAccessToken
{
    protected $connection = 'mongodb'; 
    protected $table = 'personal_access_tokens'; 

    protected $primaryKey = '_id'; 

}