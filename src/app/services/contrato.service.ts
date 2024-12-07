import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Contrato } from '../models/contrato';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ContratoService {
  constructor(private http:HttpClient) { 

  }
  list(): Observable<Contrato[]> {
    return this.http.get<Contrato[]>(`${environment.url_ms_negocio}/contratos`);
  }
  delete(id: string) {
    return this.http.delete<Contrato>(`${environment.url_ms_negocio}/contratos/${id}`,
    );
  }
  create(Contrato: Contrato) {
    return this.http.post<Contrato>(`${environment.url_ms_negocio}/contratos`, Contrato);
  }
  update(Contrato: Contrato) {
    return this.http.put<Contrato>(`${environment.url_ms_negocio}/contratos/${Contrato.id}`, Contrato);
  }
  view(id: number): Observable<Contrato> {
    return this.http.get<Contrato>(`${environment.url_ms_negocio}/contratos/${id}`);
  }
}
