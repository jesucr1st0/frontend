import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Orden } from '../models/orden';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrdenService {

  constructor(private http: HttpClient) {
  }

  list(): Observable<Orden[]> {
    return this.http.get<Orden[]>(`${environment.url_ms_negocio}/ordenes`);
  }
  
  delete(id: number) {
    return this.http.delete<Orden>(`${environment.url_ms_negocio}/ordenes/${id}`,
    );
  }

  create(Orden: Orden):Observable<Orden> {
    return this.http.post<Orden>(`${environment.url_ms_negocio}/ordenes`, Orden);
  }

  /*update(Orden: Orden):Observable<Orden> {
    return this.http.put<Orden>(`${environment.url_ms_negocio}/ordenes/${Orden.id}`, Orden);
  }*/

  view(id: number): Observable<Orden> {
    return this.http.get<Orden>(`${environment.url_ms_negocio}/ordenes/${id}`);
  }
}
