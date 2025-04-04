import { Component } from '@angular/core';
import { FetchDataService } from '../fetch-data.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { User } from '../data.model';

@Component({
  selector: 'app-board',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './board.component.html',
  styleUrl: './board.component.css'
})
export class BoardComponent {

  users: User[] = [];
  usersFiltered: User[] = [];
  username = "";
  keyword = "";

  constructor(private fetchData: FetchDataService) {}

  ngOnInit() {

  }

  getUsers() {
    this.fetchData.getUsers(this.username).subscribe(res => {
      this.users = res;
      this.usersFiltered = res;
    })
    //alert(JSON.stringify(this.users))

  }

  onFilter() {
    this.usersFiltered = this.users.filter(item => 
      item.avatar_url.includes(this.keyword) || item.login.includes(this.keyword) || item.id.toString().includes(this.keyword)
    )
  }
}
