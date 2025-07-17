import { Component, Input, ChangeDetectionStrategy, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { PrioritySelector } from '../priority-selector/priority-selector';
import { StatusSelector } from '../status-selector/status-selector';
import { CategoryComponent } from '../category-component/category-component';
import { ItemName } from '../item-name/item-name';
import { WishlistItem } from "../../item.interface";

@Component({
  selector: 'app-item-card-component',
  imports: [
    CommonModule,
    MatIconModule,
    PrioritySelector,
    StatusSelector,
    CategoryComponent,
    ItemName,
  ],
  templateUrl: './item-card-component.html',
  styleUrl: './item-card-component.css',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ItemCardComponent {
  @Input() item!: WishlistItem;
  @Output() deleteItem = new EventEmitter<string>();
  @Output() editItem = new EventEmitter<WishlistItem>();
  
  onPriorityChange(newPriority: string) {
    this.item.priority = newPriority;
  }

  onStatusChange(newStatus: string) {
     this.item.status = newStatus;
  }

  onEditItem() {
    this.editItem.emit(this.item); 
  }

  onDeleteItem() {
    console.log("deletar item", this.item.id);
    this.deleteItem.emit(this.item.id);
  }
}