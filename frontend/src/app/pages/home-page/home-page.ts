import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';

import { TitleComponent } from '../../components/title-component/title-component';
import { InputComponent } from '../../components/input-component/input-component';
import { ButtonComponent } from '../../components/button-component/button-component';
import { IconButtonComponent } from '../../components/icon-button-component/icon-button-component';
import { ItemCardComponent } from '../../components/item-card-component/item-card-component';
import { NewItemPage } from '../new-item-page/new-item-page';
import { MatSnackBar } from '@angular/material/snack-bar'; // Adicionei o MatSnackBar

import { GetItemsService } from '../../services/getItem.service';
import { WishlistItem } from '../../item.interface';

@Component({
  selector: 'app-home-page',
  imports: [
    CommonModule,
    TitleComponent,
    ButtonComponent,
    InputComponent,
    MatIconModule,
    IconButtonComponent,
    ItemCardComponent, // Removi o comentário
    MatDialogModule
  ],
  templateUrl: './home-page.html',
  styleUrl: './home-page.css'
})

export class HomePage implements OnInit {

  items: WishlistItem[] = [];
  
  constructor(
    private router: Router,
    private dialog: MatDialog,
    private getItemService: GetItemsService,
    private cdr: ChangeDetectorRef // Injetei o ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.getAllItems();
  }

  getAllItems(): void {
    this.getItemService.getItems().subscribe({
      next: (items) => {
        this.items = items;
        console.log("deveria ser item:", items);
        this.cdr.detectChanges(); // Força a detecção de mudanças e a atualização da tela
      },
      error: (error) => {
        console.error('Erro ao buscar itens:', error);
      }
    });
  }

   onDeleteItem(id: string): void {
    this.getItemService.deleteItem(id).subscribe({
      next: () => {
        this.items = this.items.filter(item => item.id !== id);
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Erro ao excluir item:', error);
      }
    });
  }

  onEditItem(itemToEdit: WishlistItem): void {
    const dialogRef = this.dialog.open(NewItemPage, {
        width: '600px', // Defina o tamanho do seu modal
        data: itemToEdit // Passe os dados do item para o modal
    });

    dialogRef.afterClosed().subscribe(result => {
        // Se o modal for fechado e um resultado for retornado,
        // isso significa que o item foi editado com sucesso
        if (result) {
            this.getAllItems(); // Recarrega a lista de itens para mostrar a atualização
        }
    });
  }

  openNewItemModal(): void {
    const dialogRef = this.dialog.open(NewItemPage, {
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.router.navigate(['/home']);
      }
    });
  }
}