import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Gasto } from '../models/gasto';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GastoService {
  constructor(private http:HttpClient) { 

  }
  list(): Observable<Gasto[]> {
    return this.http.get<Gasto[]>(`${environment.url_ms_negocio}/gastos`);
  }
  delete(id: number) {
    return this.http.delete<Gasto>(`${environment.url_ms_negocio}/gastos/${id}`,
    );
  }
  create(Gasto: Gasto) {
    return this.http.post<Gasto>(`${environment.url_ms_negocio}/gastos`, Gasto);
  }
  update(Gasto: Gasto) {
    return this.http.put<Gasto>(`${environment.url_ms_negocio}/gastos/${Gasto.id}`, Gasto);
  }
  view(id: number): Observable<Gasto> {
    return this.http.get<Gasto>(`${environment.url_ms_negocio}/gastos/${id}`);
  }
  findByConductorId(conductorId: number): Observable<any> {
    return this.http.get(`${environment.url_ms_negocio}/conductores/${conductorId}/gastos`);
  }
  findByDuenoId(duenoId: number): Observable<any> {
    return this.http.get(`${environment.url_ms_negocio}/duenos/${duenoId}/gastos`);
  }
  findByServicioId(vehiculoId: number): Observable<any> {
    return this.http.get(`${environment.url_ms_negocio}/servicios/${vehiculoId}/gastos`);
  }
}
