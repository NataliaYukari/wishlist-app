import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { MatDialogRef, MatDialogContent } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';

import { InputComponent } from '../../components/input-component/input-component';
import { ButtonComponent } from '../../components/button-component/button-component';
import { WishlistItem } from '../../item.interface';
import { NewItemService } from '../../services/newItem.service';

import { Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

interface Category {
  value: string;
  viewValue: string;
}

interface Priority {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-new-item-page',
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    InputComponent,
    MatDialogContent,
    MatSelectModule,
    ButtonComponent
],
  templateUrl: './new-item-page.html',
  styleUrl: './new-item-page.css',
  standalone: true
})

export class NewItemPage {
  id: string = '';
  itemName: string = '';
  brand: string = '';
  description: string = '';
  price: number = 0.00;
  link: string = '';
  status: string = '';
  category: string = '';
  priority: string = '';

  categories: Category[] = [
    {value: 'Cosmetics', viewValue: 'Cosmetics'},
    {value: 'Clothing', viewValue: 'Clothing'},
    {value: 'Accessories', viewValue: 'Accessories'},
    {value: 'Home', viewValue: 'Home'},
    {value: 'Pets', viewValue: 'Pets'},
    {value: 'Electronics', viewValue: 'Electronics'},
    {value: 'Miscellaneous', viewValue: 'Miscellaneous'}
  ];

  priorities: Priority[] = [
    {value: 'Low', viewValue: 'Low'},
    {value: 'Medium', viewValue: 'Medium'},
    {value: 'High', viewValue: 'High'}
  ];

  constructor(
    private newItemService: NewItemService,
    private snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<NewItemPage>,
    @Inject(MAT_DIALOG_DATA) public data: WishlistItem | null
  ) {}

  ngOnInit(): void {
    if (!this.category && this.categories.length > 0) {
      this.category = this.categories[0].value;
    }
    if (!this.priority && this.priorities.length > 0) {
      this.priority = this.priorities[0].value;
    }
    if (this.data) {
    // Modo de edição
    this.id = this.data.id;
    this.itemName = this.data.itemName;
    // this.brand = this.data.brand;
    // this.description = this.data.description;
    // this.price = this.data.price;
    // this.link = this.data.link;
    this.status = this.data.status;
    this.category = this.data.category;
    this.priority = this.data.priority;
  } else {
    // Modo de criação
    if (!this.category && this.categories.length > 0) {
      this.category = this.categories[0].value;
    }
    if (!this.priority && this.priorities.length > 0) {
      this.priority = this.priorities[0].value;
    }
  }
  }

  onCategoryChange(event: any): void {
    this.category = event.value; 
    console.log('Category selected:', this.category);
  }

  onPriorityChange(event: any): void {
    this.priority = event.value; 
    console.log('Priority selected:', this.priority);
  }

  handleNewItem(): void {
    if (!this.itemName || !this.category || !this.priority) {
      const snackMessage = this.snackBar.open('Name, category and priority must be filled!', 'Close')
      return;
    }

    const newItemData: WishlistItem = {
      id: this.id,
      itemName: this.itemName,
      brand: this.brand,
      description: this.description,
      price: this.price,
      link: this.link,
      status: this.status,
      category: this.category,
      priority: this.priority
    };

    const request = this.id
    ? this.newItemService.updateItem(this.id, newItemData)
    : this.newItemService.newItem(newItemData);

    this.newItemService.newItem(newItemData).subscribe({
      next: (response) => {
        console.log("Sucess in adding new item:", response);
        this.snackBar.open('New item added to wishlist!', 'Close', {duration: 3000});
        this.dialogRef.close(true);
      },

      error: (errorResponse) => {
        console.log('Error in adding new item:', errorResponse);
        this.snackBar.open("Error in adding new item to wishlist", 'Close', {duration: 5000});
      }
    });
  }
}
