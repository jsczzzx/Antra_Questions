import { Component } from '@angular/core';
import { DataService } from '../data.service';
import { Book } from '../data.model';
import { CommonModule } from '@angular/common';
import { CardComponent } from '../card/card.component';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { debounceTime } from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, CardComponent, FormsModule, ReactiveFormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  books: Book[] =  [];
  booksSelected: Book[] = [];

  searchControl = new FormControl('');

  constructor(private data: DataService) {}

  ngOnInit() {
    this.booksSelected = this.data.getSelectedBooks();
    //alert(JSON.stringify(this.books))

    this.searchControl.valueChanges.pipe(
      debounceTime(200)
    ).subscribe(res => {
      this.data.getBooks(res!).subscribe(res=>{
        this.books = res;
      })
    })
  }

  selectBook(book: Book) {
    //alert(book.title);
    let duplicates = this.booksSelected.filter(item => item.title === book.title);
    if (duplicates.length === 0) {
      this.booksSelected.push(book);
      this.data.setSelectedBooks(this.booksSelected);
    }
  }

  remove(book: Book) {
    this.booksSelected = this.booksSelected.filter(item => item.title !== book.title);
    this.data.setSelectedBooks(this.booksSelected);
  }

}
