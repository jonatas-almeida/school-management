import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-floating-button',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './floating-button.component.html',
  styleUrl: './floating-button.component.scss'
})
export class FloatingButtonComponent {
  // Propriedades do componente
  @Output() onClick = new EventEmitter();
}
