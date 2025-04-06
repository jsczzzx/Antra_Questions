import { Component } from '@angular/core';
import { Book } from '../data.model';
import { DataService } from '../data.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-wish-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './wish-list.component.html',
  styleUrl: './wish-list.component.css'
})
export class WishListComponent {

  selectedBooks: Book[] = [];

  constructor(private data: DataService) {}

  ngOnInit() {
    this.selectedBooks = this.data.getSelectedBooks();
  }

}
