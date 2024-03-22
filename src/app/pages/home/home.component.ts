import { Component, OnInit } from '@angular/core';
import { CardComponent } from '../../components/card/card.component';
import { InputComponent } from '../../components/input/input.component';
import { DividerComponent } from '../../components/divider/divider.component';
import { CommonModule } from '@angular/common';
import { ModalComponent } from '../../components/modal/modal.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, CardComponent, InputComponent, DividerComponent, ModalComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit{

  schoolsArray = [
    {
      id: 1,
      label: "Nome da escola",
      address: "Endereço da escola"
    }
  ];

  constructor() {}

  ngOnInit(): void {
      
  }

}
