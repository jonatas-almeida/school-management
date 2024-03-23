import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { School } from '../interfaces/school';
import { SchoolClass } from '../interfaces/school-class';

@Injectable({
  providedIn: 'root'
})
export class SchoolService {

  private baseUrl = "http://localhost:3000";
  
  constructor(private http: HttpClient) { }

  // --- ESCOLA --- //
  // Retorna todas as escolas cadastradas
  public getAllSchools(): Observable<School[]> {
    return this.http.get<School[]>(`${this.baseUrl}/school`);
  }

  // Retorna uma escola específica
  public getSchool(id: number): Observable<School> {
    return this.http.get<School>(`${this.baseUrl}/school/${id}`);
  }

  // Cadastra uma nova escola
  public registerSchool(payload: School): Observable<School> {
    return this.http.post<School>(`${this.baseUrl}/school`, payload);
  }

  // Edita uma escola cadastrada
  public editSchool(payload: School, id: number): Observable<School> {
    return this.http.put<School>(`${this.baseUrl}/school/${id}`, payload);
  }

  // Deleta a escola do respectivo ID
  public deleteSchool(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/school/${id}`);
  }

  // --- CLASSES --- //
  // Retorna todas as classes
  public getAllClasses(): Observable<SchoolClass[]> {
    return this.http.get<SchoolClass[]>(`${this.baseUrl}/school-classes`);
  }

  // Retorna uma classe de uma escola específica
  public getClass(id: number): Observable<SchoolClass> {
    return this.http.get<SchoolClass>(`${this.baseUrl}/school-classes/${id}`);
  }

  // Cadastra uma classe para uma escola específica
  public registerClass(payload: SchoolClass): Observable<SchoolClass> {
    return this.http.post<SchoolClass>(`${this.baseUrl}/school-classes`, payload);
  }

  // Edita uma classe de uma escola específica
  public editClass(payload: SchoolClass, id: number): Observable<SchoolClass> {
    return this.http.put<SchoolClass>(`${this.baseUrl}/school-classes/${id}`, payload);
  }

  // Deleta a classe de uma escola específica
  public deleteClass(id: number): Observable<SchoolClass> {
    return this.http.delete<SchoolClass>(`${this.baseUrl}/school-classes/${id}`);
  }
}
