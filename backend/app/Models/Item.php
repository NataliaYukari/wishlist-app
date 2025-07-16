<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use MongoDB\Laravel\Eloquent\Model;

class Item extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     * 
     */
    protected $connection = 'mongodb';
    protected $collection = 'wishlist';

    protected $fillable = [
        'itemName',
        'brand',
        'description',
        'price',
        'link',
        'status',
        'category',
        'priority',
        'user_id'
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'itemName' => 'string',
            'brand' => 'string',
            'description'=> 'string',
            'price' => 'float',
            'link' => 'string',
            'status' => 'string',
            'category' => 'string',
            'priority' => 'string',
            //'user_id' => 'string',
        ];
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

}
