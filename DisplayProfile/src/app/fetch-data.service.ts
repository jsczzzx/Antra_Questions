import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { User } from './data.model';

@Injectable({
  providedIn: 'root'
})
export class FetchDataService {

  url = "https://api.github.com/search/users?q=";

  constructor(private http: HttpClient) { }

  getUsers(username: string): Observable<User[]> {
    return this.http.get<any>(this.url+username).pipe(
      map(res => res.items)
    );
  }
  
}
