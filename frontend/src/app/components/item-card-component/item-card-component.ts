import { Component, Input, ChangeDetectionStrategy, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { PrioritySelector } from '../priority-selector/priority-selector';
import { StatusSelector } from '../status-selector/status-selector';
import { CategoryComponent } from '../category-component/category-component';
import { ItemName } from '../item-name/item-name';

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
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ItemCardComponent {
  @Input() item: string = '';
  @Input() category: string = '';
  @Input() priority: string = '';
  selectedPriorityFromCard: string = '';
  @Input() status: string = '';
  selectedStatusFromCard: string = '';


  onPriorityChange(newPriority: string) {
    this.selectedPriorityFromCard = newPriority;
  }

  onStatusChange(newStatus: string) {
    this.selectedStatusFromCard = newStatus;
  }
}
