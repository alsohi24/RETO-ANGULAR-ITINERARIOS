import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Itinerario } from '../Store/Model/Itinerario.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ItinerarioService {
  baseurl = 'http://localhost:3001/itinerarios';
  constructor(private http: HttpClient) {}
  GetAll(): Observable<Itinerario[]> {
    return this.http.get<Itinerario[]>(this.baseurl);
  }
  Getbycode(code: string) {
    return this.http.get<Itinerario>(this.baseurl + '/' + code);
  }
  Delete(code: string) {
    return this.http.delete(this.baseurl + '/' + code);
  }
  Update(code: string, data: any) {
    return this.http.patch(this.baseurl + '/' + code, data);
  }
  Create(data: any): Observable<any> {
    return this.http.post(this.baseurl, data);
  }
}
