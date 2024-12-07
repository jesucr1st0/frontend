import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Conductor } from '../models/conductor';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ConductorService {

  constructor(private http:HttpClient) { 

  }
  list(): Observable<Conductor[]> {
    return this.http.get<Conductor[]>(`${environment.url_ms_negocio}/conductores`);
  }
  delete(id: string) {
    return this.http.delete<Conductor>(`${environment.url_ms_negocio}/conductores/${id}`,
    );
  }
  create(Conductor: Conductor) {
    return this.http.post<Conductor>(`${environment.url_ms_negocio}/conductores`, Conductor);
  }
  update(Conductor: Conductor) {
    return this.http.put<Conductor>(`${environment.url_ms_negocio}/conductores/${Conductor.id}`, Conductor);
  }
  view(id: number): Observable<Conductor> {
    return this.http.get<Conductor>(`${environment.url_ms_negocio}/conductores/${id}`);
  }
}
