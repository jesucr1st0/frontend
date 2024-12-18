import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { VehiculoConductor } from '../models/vehiculo-conductor';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VehiculoConductorService {

  constructor(private http:HttpClient) { 

  }
  list(): Observable<VehiculoConductor[]> {
    return this.http.get<VehiculoConductor[]>(`${environment.url_ms_negocio}/conductoresvehiculos`);
  }
  delete(id: number) {
    return this.http.delete<VehiculoConductor>(`${environment.url_ms_negocio}/conductoresvehiculos/${id}`,
    );
  }
  create(VehiculoConductor: VehiculoConductor) {
    return this.http.post<VehiculoConductor>(`${environment.url_ms_negocio}/conductoresvehiculos`, VehiculoConductor);
  }
  update(VehiculoConductor: VehiculoConductor) {
    return this.http.put<VehiculoConductor>(`${environment.url_ms_negocio}/conductoresvehiculos/${VehiculoConductor.id}`, VehiculoConductor);
  }
  view(id: number): Observable<VehiculoConductor> {
    return this.http.get<VehiculoConductor>(`${environment.url_ms_negocio}/conductoresvehiculos/${id}`);
  }
  findByConductorId(conductorId: number): Observable<any[]> {
    return this.http.get<any[]>(`${environment.url_ms_negocio}/conductores/${conductorId}/vehiculo-conductor`);
  }
  findByVehiculoId(vehiculoId: number): Observable<any[]> {
    return this.http.get<any[]>(`${environment.url_ms_negocio}/conductoresvehiculos/${vehiculoId}/vehiculo`);
  }
}
