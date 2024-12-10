import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Operacion } from '../models/operacion';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OperacionService {

  constructor(private http: HttpClient) {
  }

  list(): Observable<Operacion[]> {
    return this.http.get<Operacion[]>(`${environment.url_ms_negocio}/operaciones`);
  }
  
  delete(id: number) {
    return this.http.delete<Operacion>(`${environment.url_ms_negocio}/operaciones/${id}`,
    );
  }

  create(Operacion: Operacion):Observable<Operacion> {
    return this.http.post<Operacion>(`${environment.url_ms_negocio}/operaciones`, Operacion);
  }

  update(Operacion: Operacion):Observable<Operacion> {
    return this.http.put<Operacion>(`${environment.url_ms_negocio}/operaciones/${Operacion.id}`, Operacion);
  }

  view(id: number): Observable<Operacion> {
    return this.http.get<Operacion>(`${environment.url_ms_negocio}/operaciones/${id}`);
  }
}
