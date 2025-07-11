import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-item-card-component',
  imports: [
    CommonModule,
    MatIconModule
  ],
  templateUrl: './item-card-component.html',
  styleUrl: './item-card-component.css'
})
export class ItemCardComponent {

}
