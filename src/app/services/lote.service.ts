import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Lote } from '../models/lote';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoteService {

  constructor(private http: HttpClient) {
  }

  list(): Observable<Lote[]> {
    return this.http.get<Lote[]>(`${environment.url_ms_negocio}/lotes`);
  }
  
  delete(id: number) {
    return this.http.delete<Lote>(`${environment.url_ms_negocio}/lotes/${id}`,
    );
  }

  create(Lote: Lote):Observable<Lote> {
    return this.http.post<Lote>(`${environment.url_ms_negocio}/lotes`, Lote);
  }

  update(Lote: Lote):Observable<Lote> {
    return this.http.put<Lote>(`${environment.url_ms_negocio}/lotes/${Lote.id}`, Lote);
  }

  view(id: number): Observable<Lote> {
    return this.http.get<Lote>(`${environment.url_ms_negocio}/lotes/${id}`);
  }
}
