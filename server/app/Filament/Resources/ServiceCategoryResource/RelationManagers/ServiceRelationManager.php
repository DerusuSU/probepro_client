<?php

namespace App\Filament\Resources\ServiceCategoryResource\RelationManagers;

use Filament\Forms;
use Filament\Tables;
use Filament\Resources\RelationManagers\RelationManager;
use Filament\Forms\Components\TextInput;
use Filament\Tables\Columns\TextColumn;

class ServiceRelationManager extends RelationManager
{
    protected static string $relationship = 'services'; // <-- название связи в твоей модели ServiceCategory

    protected static ?string $recordTitleAttribute = 'name'; // заголовок записи в таблице

    public function form(Forms\Form $form): Forms\Form
    {
        return $form
            ->schema([
                TextInput::make('name')
                    ->required()
                    ->maxLength(255),
                TextInput::make('price')
                    ->numeric()
                    ->required(),
            ]);
    }

    public function table(Tables\Table $table): Tables\Table
    {
        return $table
            ->columns([
                TextColumn::make('name')->sortable()->searchable(),
                TextColumn::make('price')->sortable(),
            ]);
    }
}
