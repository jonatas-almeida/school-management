import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true
    }
  ],
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss'
})
export class InputComponent {
  value: any;
  onChange: any = () => {};
  onTouch: any = () => {};

  //Propriedades do componente
  @Input() label: string = '';
  @Input() placeholder: string = '';
  @Input() kind: "standard" | "searchbar" = "standard";

  @Output() onClick = new EventEmitter();
  @Output() onInput = new EventEmitter();
  @Output() onBlur = new EventEmitter();
  @Output() onClear = new EventEmitter();

  writeValue(value: any): void {
    this.value = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  onInputChange(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.onChange(value);
    this.onTouch();
  }
}
