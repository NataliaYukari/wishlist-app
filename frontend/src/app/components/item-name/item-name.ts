import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-item-name',
  imports: [CommonModule],
  templateUrl: './item-name.html',
  styleUrl: './item-name.css',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class ItemName {
  @Input() itemName: string = 'Nome do Item'
}
