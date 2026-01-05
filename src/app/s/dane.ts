import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Kategoria, KategoriaRaw } from './interfaces';

@Injectable({
  providedIn: 'root'
})
export class pobieranie_danych {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:5000/api/dane';

  pobierz(): Observable<Kategoria[]> {
    return this.http.get<Record<string, KategoriaRaw>>(this.apiUrl).pipe(
      map(response =>
        Object.entries(response).map(([key, value]) => ({
          nazwa: key,
          ...value
        }))
      )
    );
  }
}
