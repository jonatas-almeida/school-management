import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { DividerComponent } from '../divider/divider.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule, MatIconModule, DividerComponent],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss'
})
export class ModalComponent {

  // Propriedades do componente
  @Input() title: string = '';
  @Input() modalOpen: boolean = false;

  @Output() onClose = new EventEmitter();
}
