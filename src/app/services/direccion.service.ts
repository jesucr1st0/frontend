import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Direccion } from '../models/direccion';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DireccionService {

  constructor(private http: HttpClient) {
  }

  list(): Observable<Direccion[]> {
    return this.http.get<Direccion[]>(`${environment.url_ms_negocio}/direcciones`);
  }
  
  delete(id: number) {
    return this.http.delete<Direccion>(`${environment.url_ms_negocio}/direcciones/${id}`,
    );
  }

  create(Direccion: Direccion):Observable<Direccion> {
    return this.http.post<Direccion>(`${environment.url_ms_negocio}/direcciones`, Direccion);
  }

  update(Direccion: Direccion):Observable<Direccion> {
    return this.http.put<Direccion>(`${environment.url_ms_negocio}/direcciones/${Direccion.id}`, Direccion);
  }

  view(id: number): Observable<Direccion> {
    return this.http.get<Direccion>(`${environment.url_ms_negocio}/direcciones/${id}`);
  }
}
