import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DuenoVehiculo } from '../models/dueno-vehiculo';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class DuenoVehiculoService {

  constructor(private http:HttpClient) { 

  }
  list(): Observable<DuenoVehiculo[]> {
    return this.http.get<DuenoVehiculo[]>(`${environment.url_ms_negocio}/duenosvehiculos`);
  }
  delete(id: number) {
    return this.http.delete<DuenoVehiculo>(`${environment.url_ms_negocio}/duenosvehiculos/${id}`,
    );
  }
  create(DuenoVehiculo: DuenoVehiculo) {
    return this.http.post<DuenoVehiculo>(`${environment.url_ms_negocio}/duenosvehiculos`, DuenoVehiculo);
  }
  update(DuenoVehiculo: DuenoVehiculo) {
    return this.http.put<DuenoVehiculo>(`${environment.url_ms_negocio}/duenosvehiculos/${DuenoVehiculo.id}`, DuenoVehiculo);
  }
  view(id: number): Observable<DuenoVehiculo> {
    return this.http.get<DuenoVehiculo>(`${environment.url_ms_negocio}/duenosvehiculos/${id}`);
  }
}
