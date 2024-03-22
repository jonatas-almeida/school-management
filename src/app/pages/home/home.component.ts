import { Component, OnInit } from '@angular/core';
import { CardComponent } from '../../components/card/card.component';
import { InputComponent } from '../../components/input/input.component';
import { DividerComponent } from '../../components/divider/divider.component';
import { CommonModule } from '@angular/common';
import { ModalComponent } from '../../components/modal/modal.component';
import { ButtonComponent } from '../../components/button/button.component';
import { SchoolService } from '../../services/school.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, CardComponent, InputComponent, DividerComponent, ModalComponent, ButtonComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {


  schoolsArray = [
    {
      id: 1,
      label: "Nome da escola",
      address: "Endereço da escola",
      showDetails: false
    },
    {
      id: 2,
      label: "Nome da escola",
      address: "Endereço da escola",
      showDetails: false
    },
    {
      id: 3,
      label: "Nome da escola",
      address: "Endereço da escola",
      showDetails: false
    }
  ];

  constructor(private schoolService: SchoolService) {}

  ngOnInit(): void {
      
  }

  async getAllSchools(): Promise<void> {
    
  }

  showSchoolDetails(index: number) {
    if(this.schoolsArray) {
      if(this.schoolsArray[index].showDetails) {
        this.schoolsArray[index].showDetails = false;
      }
      else {
        this.schoolsArray[index].showDetails = true;
      }
    }
  }

}
