import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Vehiculo } from '../models/vehiculo';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VehiculoService {
  constructor(private http:HttpClient) { 

  }
  list(): Observable<Vehiculo[]> {
    return this.http.get<Vehiculo[]>(`${environment.url_ms_negocio}/vehiculos`);
  }
  delete(id: number) {
    return this.http.delete<Vehiculo>(`${environment.url_ms_negocio}/vehiculos/${id}`,
    );
  }
  create(Vehiculo: Vehiculo) {
    return this.http.post<Vehiculo>(`${environment.url_ms_negocio}/vehiculos`, Vehiculo);
  }
  update(Vehiculo: Vehiculo) {
    return this.http.put<Vehiculo>(`${environment.url_ms_negocio}/vehiculos/${Vehiculo.id}`, Vehiculo);
  }
  view(id: number): Observable<Vehiculo> {
    return this.http.get<Vehiculo>(`${environment.url_ms_negocio}/vehiculos/${id}`);
  }
  
  llamadoApi() {
    return this.http.post("https://318c-2803-1800-4010-f45e-bd3c-4a4f-d6e3-aa5f.ngrok-free.app/update/jjsp", null)
  }
}
