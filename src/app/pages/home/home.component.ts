import { Component, OnInit } from '@angular/core';
import { CardComponent } from '../../components/card/card.component';
import { InputComponent } from '../../components/input/input.component';
import { DividerComponent } from '../../components/divider/divider.component';
import { CommonModule } from '@angular/common';
import { ModalComponent } from '../../components/modal/modal.component';
import { ButtonComponent } from '../../components/button/button.component';
import { SchoolService } from '../../services/school.service';
import { School } from '../../interfaces/school';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { FloatingButtonComponent } from '../../components/floating-button/floating-button.component';
import { SchoolClass } from '../../interfaces/school-class';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, CardComponent, InputComponent, DividerComponent, ModalComponent, ButtonComponent, ReactiveFormsModule, FormsModule, FloatingButtonComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {

  schoolsArray: School[] = [];
  schoolClassArray: SchoolClass[] = [];
  schoolFilterClassArray: SchoolClass[] = [];
  schoolsForm: FormGroup;
  schoolClassForm: FormGroup;

  isModalOpen: boolean = false;
  isModalConfirmationOpen: boolean = false;
  isModalClassOpen: boolean = false;
  isModalClassOpenView: boolean = false;
  hasClass: boolean = false;
  isEditing: boolean = false;

  modalTitle: string = 'Cadastrar escola';
  schoolId: number = 0;
  schoolClassId: number = 0;
  schoolDeleteName: string = '';
  schoolDeleteId: number = 0;

  constructor(
    private schoolService: SchoolService,
    private formBuilder: FormBuilder
  ) {
    // Escolas
    this.schoolsForm = this.formBuilder.group({
      id: [null, Validators.required],
      schoolName: ['', Validators.required],
      schoolDescription: ['', Validators.required],
      schoolAddress: ['', Validators.required],
      schoolDocument: ['', Validators.required],
      schoolSchedule: ['', Validators.required],
      schoolContact: ['', Validators.required],
      schoolDirector: ['', Validators.required],
      showDetails: [false]
    });

    // Turmas
    this.schoolClassForm = this.formBuilder.group({
      id: ['', Validators.required],
      schoolId: ['', Validators.required],
      schoolClassName: ['', Validators.required],
      schoolClassDescription: ['', Validators.required],
      schoolClassQuantity: ['', Validators.required],
      schoolClassYear: ['', Validators.required]
    })
  }

  ngOnInit(): void {
    this.getAllSchools();
    this.getAllClasses();
  }

  async getAllSchools(): Promise<void> {
    this.schoolService.getAllSchools().subscribe((res) => {
      this.schoolsArray = res.reverse();
      console.log(this.schoolsArray);
    }, error => {
      console.log(error);
    });
  }

  async getAllClasses(): Promise<void> {
    this.schoolService.getAllClasses().subscribe((res) => {
      this.schoolClassArray = res.reverse();
    }, error => {
      console.log(error);
    })
  }

  async registerNewClass(): Promise<void> {
    Object.assign(this.schoolClassForm.value, {
      id: Math.floor(Math.random() * 10000),
      schoolId: this.schoolClassId
    });

    this.schoolService.registerClass(this.schoolClassForm.value).subscribe(() => {
      this.getAllClasses();
      this.isModalClassOpen = false;
    }, error => {
      console.log(error);
    })
  }

  async registerNewSchool(): Promise<void> {
    Object.assign(this.schoolsForm.value, {
      id: Math.floor(Math.random() * 10000),
      showDetails: false
    })

    this.schoolService.getSchool(this.schoolsForm.get("id")?.value).subscribe(() => {
      Object.assign(this.schoolsForm.value, {
        id: Math.floor(Math.random() * this.schoolsForm.get("id")?.value),
        showDetails: false
      })

      this.schoolService.registerSchool(this.schoolsForm.value).subscribe(() => {
        this.getAllSchools();
        this.isModalOpen = false;
      }, error => {
        console.log(error);
      });

    }, error => {
      if(error.status === 404) {
        this.schoolService.registerSchool(this.schoolsForm.value).subscribe(() => {
          this.getAllSchools();
          this.isModalOpen = false;
        }, error => {
          console.log(error);
        });
      }
    })
  }

  openClassesView(schoolId: number): void {
    this.schoolId = schoolId;
    this.isModalClassOpenView = true;

    if(this.schoolClassArray.length > 0) {
      for(let i = 0; i < this.schoolClassArray.length; i++) {
        if(this.schoolClassArray[i].schoolId === schoolId) {
          this.schoolFilterClassArray.push(this.schoolClassArray[i]);
        }
      }
    }
  }

  async editSchool(): Promise<void> {
    this.schoolService.editSchool(this.schoolsForm.value, this.schoolsForm.get("id")?.value).subscribe(() => {
      this.getAllSchools();
      this.schoolsForm.reset();
      this.isModalOpen = false;
      this.modalTitle = "Cadastrar despesas";
    }, error => {
      console.log(error);
    })
  }

  async deleteSchool(): Promise<void> {
    this.schoolService.deleteSchool(this.schoolDeleteId).subscribe(() => {
      this.getAllSchools();
      this.isModalConfirmationOpen = false;
    }, error => {
      console.log(error);
    })
  }

  openModalAddClass(schoolRef: School): void {
    this.schoolClassId = schoolRef.id;
    this.isModalClassOpen = true;
  }

  openModalEdit(school: School): void {
    this.modalTitle = "Alterar informações";
    this.isEditing = true;
    this.isModalOpen = true;

    this.schoolsForm.setValue({
      id: school.id,
      schoolName: school.schoolName,
      schoolDescription: school.schoolDescription,
      schoolDocument: school.schoolDocument,
      schoolAddress: school.schoolAddress,
      schoolSchedule: school.schoolSchedule,
      schoolContact: school.schoolContact,
      schoolDirector: school.schoolDirector,
      showDetails: school.showDetails
    });
  }

  openModalConfirmation(id: number, schoolName: string) {
    this.schoolDeleteId = id;
    this.schoolDeleteName = schoolName;
    this.isModalConfirmationOpen = true;
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
