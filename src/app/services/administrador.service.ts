import { Injectable } from '@angular/core';
import { Administrador } from '../models/administrador';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AdministradorService {

  constructor(private http: HttpClient) {
  }

  list(): Observable<Administrador[]> {
    return this.http.get<Administrador[]>(`${environment.url_ms_negocio}/administradores`);
  }
  
  delete(id: number) {
    return this.http.delete<Administrador>(`${environment.url_ms_negocio}/administradores/${id}`,
    );
  }

  create(Administrador: Administrador):Observable<Administrador> {
    return this.http.post<Administrador>(`${environment.url_ms_negocio}/administradores`, Administrador);
  }

  update(Administrador: Administrador):Observable<Administrador> {
    return this.http.put<Administrador>(`${environment.url_ms_negocio}/administradores/${Administrador.id}`, Administrador);
  }

  view(id: number): Observable<Administrador> {
    return this.http.get<Administrador>(`${environment.url_ms_negocio}/administradores/${id}`);
  }
}
