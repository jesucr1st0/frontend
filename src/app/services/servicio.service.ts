import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Servicio } from '../models/servicio';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ServicioService {

  constructor(private http:HttpClient) { 

  }
  list(): Observable<Servicio[]> {
    return this.http.get<Servicio[]>(`${environment.url_ms_negocio}/servicios`);
  }
  delete(id: number) {
    return this.http.delete<Servicio>(`${environment.url_ms_negocio}/servicios/${id}`,
    );
  }
  create(Servicio: Servicio) {
    return this.http.post<Servicio>(`${environment.url_ms_negocio}/servicios`, Servicio);
  }
  update(Servicio: Servicio) {
    return this.http.put<Servicio>(`${environment.url_ms_negocio}/servicios/${Servicio.id}`, Servicio);
  }
  view(id: number): Observable<Servicio> {
    return this.http.get<Servicio>(`${environment.url_ms_negocio}/servicios/${id}`);
  }
}
