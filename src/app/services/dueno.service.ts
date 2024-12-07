import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Dueno } from '../models/dueno';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class duenoservice {

  constructor(private http:HttpClient) { 
  }
  list(): Observable<Dueno[]> {
    return this.http.get<Dueno[]>(`${environment.url_ms_negocio}/duenos`);
  }
  delete(id: string) {
    return this.http.delete<Dueno>(`${environment.url_ms_negocio}/duenos/${id}`,
    );
  }
  create(Dueno: Dueno) {
    return this.http.post<Dueno>(`${environment.url_ms_negocio}/duenos`, Dueno);
  }
  update(Dueno: Dueno) {
    return this.http.put<Dueno>(`${environment.url_ms_negocio}/duenos/${Dueno.id}`, Dueno);
  }
  view(id: number): Observable<Dueno> {
    return this.http.get<Dueno>(`${environment.url_ms_negocio}/duenos/${id}`);
  }
}
