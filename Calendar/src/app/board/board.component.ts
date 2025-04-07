import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { first, last } from 'rxjs';

@Component({
  selector: 'app-board',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './board.component.html',
  styleUrl: './board.component.css'
})
export class BoardComponent {

  calendar: number[][] = [];
  time: Date = new Date();

  months = ['January', 'Febuary', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  selectedDate = "";

  ngOnInit() {
    this.generateMonth(this.time);
  }

  generateMonth(now: Date) {
    this.selectedDate = "";
    let firstDay = new Date(now.getFullYear(), now.getMonth(), 1);
    let lastDay = new Date(now.getFullYear(), now.getMonth()+1, 0);
    let currentWeek = [];
    let count = 1;
    for (let i = 0; i < firstDay.getDay(); i++) {
      currentWeek.push(-1);
    }
    for (let i = firstDay.getDay(); i <= 6; i++) {
      currentWeek.push(count);
      count++;
    }
    this.calendar.push([...currentWeek]);
    currentWeek = [];
    for (; count <= lastDay.getDate(); count++) {
      currentWeek.push(count);
      if (currentWeek.length === 7 || count === lastDay.getDate()) {
        this.calendar.push([...currentWeek]);
        currentWeek = [];
      }
    }
    let l = this.calendar[this.calendar.length-1].length;
    for (let i = l; i < 7; i++) {
      this.calendar[this.calendar.length-1].push(-1);
    }
    console.log(JSON.stringify(this.calendar));
  }

  selectDay(day: number) {
    if (day !== -1) {
      let year = this.time.getFullYear();
      let month = this.time.getMonth();
      this.selectedDate = `${month+1}/${day}/${year}`
    }
  }

  goLast() {
    this.calendar = [];
    this.time = new Date(this.time.getFullYear(), this.time.getMonth()-1);
    this.generateMonth(this.time);
  }

  goNext() {
    this.calendar = [];
    this.time = new Date(this.time.getFullYear(), this.time.getMonth()+1);
    this.generateMonth(this.time);
  }

}
