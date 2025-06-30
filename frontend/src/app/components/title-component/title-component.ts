import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-title-component',
  imports: [CommonModule],
  templateUrl: './title-component.html',
  styleUrl: './title-component.css',
  standalone: true
})

export class TitleComponent {
  @Input() size: 'small' | 'medium' | 'large' = 'medium';
}
