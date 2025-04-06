import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { Book } from './data.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  url: string = "https://www.googleapis.com/books/v1/volumes?q=";

  selectedBooks: Book[] = [];

  constructor(private http: HttpClient) { }

  getBooks(title: string): Observable<Book[]> {
    return this.http.get<any>(this.url+title).pipe(
      map(res => res.items),
      map(items => {
        return items.map((item: any) => {
          return {
            title: item.volumeInfo.title,
            authors: item.volumeInfo.authors,
            publisher: item.volumeInfo.publisher,
            publishedDate: item.volumeInfo.publishedDate,
            description: item.volumeInfo.description,
            imageUrl: item.volumeInfo.imageLinks.thumbnail
          }
          
        })
      }),
      tap(
        res => {console.log(res);}
      )
    )
  }

  setSelectedBooks(books: Book[]) {
    this.selectedBooks = books;
  }

  getSelectedBooks() {
    return this.selectedBooks;
  }

  
}
