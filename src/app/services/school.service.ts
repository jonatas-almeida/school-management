import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SchoolService {

  private baseUrl = "http://localhost:3000";
  
  constructor(private http: HttpClient) { }

  // --- ESCOLA --- //
  // Retorna todas as escolas cadastradas
  public getAllSchools(): Observable<any> {
    return this.http.get(`${this.baseUrl}/school`);
  }

  // Retorna uma escola específica
  public getSchool(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/school/${id}`);
  }

  // Cadastra uma nova escola
  public registerSchool(payload: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/school`, payload);
  }

  // Edita uma escola cadastrada
  public editSchool(payload: any, id: number): Observable<any> {
    return this.http.post(`${this.baseUrl}/school/${id}`, payload);
  }

  // Deleta a escola do respectivo ID
  public deleteSchool(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/school/${id}`)
  }

  // --- CLASSES --- //
  // Retorna todas as classes
  public getAllClasses(): Observable<any> {
    return this.http.get(`${this.baseUrl}/school-classes`);
  }

  // Retorna uma classe de uma escola específica
  public getClass(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/school-classes/${id}`);
  }

  // Cadastra uma classe para uma escola específica
  public registerClass(payload: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/school-classes`, payload);
  }

  // Edita uma classe de uma escola específica
  public editClass(payload: any, id: number): Observable<any> {
    return this.http.put(`${this.baseUrl}/school-classes/${id}`, payload);
  }

  // Deleta a classe de uma escola específica
  public deleteClass(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/school-classes/${id}`);
  }
}
