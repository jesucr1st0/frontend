import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Cuota } from '../models/cuota';

@Injectable({
  providedIn: 'root'
})
export class CuotaService {

  constructor(private http:HttpClient) { 

  }
  list(): Observable<Cuota[]> {
    return this.http.get<Cuota[]>(`${environment.url_ms_negocio}/cuotas`);
  }
  delete(id: string) {
    return this.http.delete<Cuota>(`${environment.url_ms_negocio}/cuotas/${id}`,
    );
  }
  create(Cuota: Cuota) {
    return this.http.post<Cuota>(`${environment.url_ms_negocio}/cuotas`, Cuota);
  }
  update(Cuota: Cuota) {
    return this.http.put<Cuota>(`${environment.url_ms_negocio}/cuotas/${Cuota.id}`, Cuota);
  }
  view(id: number): Observable<Cuota> {
    return this.http.get<Cuota>(`${environment.url_ms_negocio}/cuotas/${id}`);
  }
}
