import { Component } from '@angular/core';
import { FetchDataService } from '../fetch-data.service';
import { User } from '../data.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-board',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './board.component.html',
  styleUrl: './board.component.css'
})
export class BoardComponent {

  users: User[] = [];

  constructor(private fetchData: FetchDataService) {}

  ngOnInit() {
    this.fetchData.getUsers().subscribe(res=>{
      this.users = res;
    })
  }
}
