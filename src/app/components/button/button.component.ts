import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss'
})
export class ButtonComponent {
  
  // Propriedades do componente
  @Input() buttonLabel: string = '';
  @Input() icon: string = '';
  @Input() kind: "primary" | "secondary" = "primary";

  @Output() onClick = new EventEmitter();
}
