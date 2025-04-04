import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { User } from './data.model';

@Injectable({
  providedIn: 'root'
})
export class FetchDataService {

  url = "https://reqres.in/api/users";

  constructor(private http: HttpClient) { }

  getUsers(): Observable<User[]> {
    return this.http.get<any>(this.url).pipe(
      map(res=>res.data)
    )
  }
}
