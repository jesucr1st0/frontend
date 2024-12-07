import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Factura } from '../models/factura';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FacturaService {

  constructor(private http:HttpClient) { 

  }
  list(): Observable<Factura[]> {
    return this.http.get<Factura[]>(`${environment.url_ms_negocio}/facturas`);
  }
  delete(id: string) {
    return this.http.delete<Factura>(`${environment.url_ms_negocio}/facturas/${id}`,
    );
  }
  create(Factura: Factura) {
    return this.http.post<Factura>(`${environment.url_ms_negocio}/facturas`, Factura);
  }
  update(Factura: Factura) {
    return this.http.put<Factura>(`${environment.url_ms_negocio}/facturas/${Factura.id}`, Factura);
  }
  view(id: number): Observable<Factura> {
    return this.http.get<Factura>(`${environment.url_ms_negocio}/facturas/${id}`);
  }
}
