import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Cliente } from '../models/cliente';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  constructor(private http: HttpClient) {
  }

  list(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(`${environment.url_ms_negocio}/clientes`);
  }
  
  delete(id: number) {
    return this.http.delete<Cliente>(`${environment.url_ms_negocio}/clientes/${id}`,
    );
  }

  create(Cliente: Cliente):Observable<Cliente> {
    return this.http.post<Cliente>(`${environment.url_ms_negocio}/clientes`, Cliente);
  }

  update(Cliente: Cliente):Observable<Cliente> {
    return this.http.put<Cliente>(`${environment.url_ms_negocio}/clientes/${Cliente.id}`, Cliente);
  }

  view(id: number): Observable<Cliente> {
    return this.http.get<Cliente>(`${environment.url_ms_negocio}/clientes/${id}`);
  }
}
