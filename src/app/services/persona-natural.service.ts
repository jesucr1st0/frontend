import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PersonaNatural } from '../models/persona-natural';

@Injectable({
  providedIn: 'root'
})
export class PersonaNaturalService {

  constructor(private http: HttpClient) {
  }

  list(): Observable<PersonaNatural[]> {
    return this.http.get<PersonaNatural[]>(`${environment.url_ms_negocio}/personas_naturales`);
  }
  
  delete(id: number) {
    return this.http.delete<PersonaNatural>(`${environment.url_ms_negocio}/personas_naturales/${id}`,
    );
  }

  create(PersonaNatural: PersonaNatural):Observable<PersonaNatural> {
    return this.http.post<PersonaNatural>(`${environment.url_ms_negocio}/personas_naturales`, PersonaNatural);
  }

  update(PersonaNatural: PersonaNatural):Observable<PersonaNatural> {
    return this.http.put<PersonaNatural>(`${environment.url_ms_negocio}/personas_naturales/${PersonaNatural.id}`, PersonaNatural);
  }

  view(id: number): Observable<PersonaNatural> {
    return this.http.get<PersonaNatural>(`${environment.url_ms_negocio}/personas_naturales/${id}`);
  }
}
