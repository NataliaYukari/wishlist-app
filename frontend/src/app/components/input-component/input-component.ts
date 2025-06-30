import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-input-component',
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    ReactiveFormsModule
  ],
  templateUrl: './input-component.html',
  styleUrl: './input-component.css',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class InputComponent {
  @Input() label: string= '';
  @Input() type: string= 'text';
  @Input() passwordControl = new FormControl('');
  
  hidePassword = true;

  get inputType(): string {
    return this.type === 'password' && this.hidePassword ? 'password' : 'text';
  }

  toggleVisibility(): void {
    this.hidePassword = !this.hidePassword;
  }

  private _value: string = '';

  @Input() get value(): string {
    return this._value;
  }
  set value(newValue: string) {
    this._value = newValue;
  }
}
