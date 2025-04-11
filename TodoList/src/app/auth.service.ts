import { Injectable } from '@angular/core';
import { User } from './data.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private users: User[] = [
    {username: 'felix', password: 'abc12345'},
    {username: 'JR', password: '98765CBA'}
  ]


  constructor() { }

  logIn(user: User): boolean {
    localStorage.removeItem('username');
    for (let i = 0; i < this.users.length; i++) {
      if (user.username === this.users[i].username && user.password === this.users[i].password) {
        localStorage.setItem('username', user.username);
        return true;
      }
    }
    return false;
  }

  logOut(): boolean {
    localStorage.removeItem('username');
    return true;
  }

  isLoggedIn(): boolean {
    let token = localStorage.getItem('username') || '';
    if (token === '')
      return false;
    else
      return true;
  } 
}
