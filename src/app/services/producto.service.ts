import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Producto } from '../models/producto';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  constructor(private http: HttpClient) {
  }

  list(): Observable<Producto[]> {
    return this.http.get<Producto[]>(`${environment.url_ms_negocio}/productos`);
  }
  
  delete(id: number) {
    return this.http.delete<Producto>(`${environment.url_ms_negocio}/productos/${id}`,
    );
  }

  create(Producto: Producto):Observable<Producto> {
    return this.http.post<Producto>(`${environment.url_ms_negocio}/productos`, Producto);
  }

  update(Producto: Producto):Observable<Producto> {
    return this.http.put<Producto>(`${environment.url_ms_negocio}/productos/${Producto.id}`, Producto);
  }

  view(id: number): Observable<Producto> {
    return this.http.get<Producto>(`${environment.url_ms_negocio}/productos/${id}`);
  }
}
