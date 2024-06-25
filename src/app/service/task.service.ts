import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Task } from '../Store/Model/Task.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  baseurl = 'http://localhost:3001/task';
  constructor(private http: HttpClient) {}
  GetAll(): Observable<Task[]> {
    return this.http.get<Task[]>(this.baseurl);
  }
  Getbycode(code: string) {
    return this.http.get<Task>(this.baseurl + '/' + code);
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
