import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-button-component',
  imports: [
    CommonModule,
    MatButtonModule
  ],
  templateUrl: './button-component.html',
  styleUrl: './button-component.css'
})
export class ButtonComponent {
  @Input() buttonLabel: string= '';
  @Input() buttonType: string= '';
}
