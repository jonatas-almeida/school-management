import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss'
})
export class InputComponent {
  //Propriedades do componente
  @Input() label: string = '';
  @Input() placeholder: string = '';

  @Output() onClick = new EventEmitter();
  @Output() onInput = new EventEmitter();
  @Output() onChange = new EventEmitter();
  @Output() onBlur = new EventEmitter();
  @Output() onClear = new EventEmitter();
}
