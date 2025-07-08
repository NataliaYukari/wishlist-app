import { Component, ChangeDetectionStrategy, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventEmitter } from '@angular/core';
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
  ],
  templateUrl: './input-component.html',
  styleUrl: './input-component.css',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class InputComponent {
  @Input() label: string= '';
  @Input() type: string= 'text';
  @Input() value:string= '';

  @Output() valueChange = new EventEmitter<string>();

  hidePassword = true;

  private _value = '';
  disabled = false;

  onChange = (value: any) => {};
  onTouched = () => {};

  get inputType(): string {
    return this.type === 'password' && this.hidePassword ? 'password' : 'text';
  }

  toggleVisibility(): void {
    this.hidePassword = !this.hidePassword;
  }

  onInput(event: Event): void {
    const val = (event.target as HTMLInputElement).value;
    this.valueChange.emit(val);
  }
}
