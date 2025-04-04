import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Post, Comment } from './data.model';

@Injectable({
  providedIn: 'root'
})
export class FetchDataService {

  url_post = "https://jsonplaceholder.typicode.com/posts";
  url_comment = "https://jsonplaceholder.typicode.com/comments";

  constructor(private http: HttpClient) { }

  getPost(): Observable<Post[]> {
    return this.http.get<Post[]>(this.url_post);
  }

  getComment(): Observable<Comment[]> {
    return this.http.get<Comment[]>(this.url_comment);
  }
}
