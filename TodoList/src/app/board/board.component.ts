import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-board',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './board.component.html',
  styleUrl: './board.component.css'
})
export class BoardComponent {

  username = '';

  todoList = [
    {todo: "Finish the coding assignment", isDone: false, user: 'felix'},
    {todo: "Cook dinner", isDone: false, user: 'felix'},
    {todo: "Watch a movie", isDone: false, user: 'JR'},

  ];

  newTodo = '';


  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit() {
    this.loadTodos();
    this.username = localStorage.getItem('username') || '';
  }
  
  loadTodos(){
    const storedTodoList = localStorage.getItem('todoList');
    if (storedTodoList !== null) {
      this.todoList = JSON.parse(storedTodoList);
    } else {
      this.saveTodos();
    }
  }

  saveTodos(){
    localStorage.setItem('todoList', JSON.stringify(this.todoList));
  }

  onLogOut() {
    if (this.auth.logOut()) {
      this.router.navigate(['login']);
    }
  }

  add() {
    if (this.newTodo !== '') {
      this.todoList.push({todo: this.newTodo, isDone: false, user: this.username});
      this.saveTodos();
    }
  }

  markAsDone(index: number){
    this.todoList[index].isDone = true;
    this.saveTodos();
  }

  remove(index: number){
    this.todoList.splice(index,1);
    this.saveTodos();
  }

}
