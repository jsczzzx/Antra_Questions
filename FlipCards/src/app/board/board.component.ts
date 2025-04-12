import { Component } from '@angular/core';

@Component({
  selector: 'app-board',
  standalone: true,
  imports: [],
  templateUrl: './board.component.html',
  styleUrl: './board.component.css'
})
export class BoardComponent {
  emojis = [ '🐵', '🐶', '🦊', '🐱', '🦁', '🐯', '🐴', '🦄', '🦓', '🦌', '🐮', '🐷', '🐭', '🐹', '🐻', '🐨', '🐼', '🐽', '🐸', '🐰', '🐙' ];

  length = 4;

  board: string[][] = [];

  isFlipped: boolean[][] = [];

  count = 0;

  flippedGrid1: number[] | null = null;
  flippedGrid2: number[] | null = null;


  ngOnInit() {

    this.initialize();
  }

  shuffle(arr: any[]): any[] {
    const newArr = [];
    const usedIndexes = new Set();
    while (newArr.length != arr.length) {
      let randomIdx = Math.floor(Math.random()*arr.length);
      while (usedIndexes.has(randomIdx)) {
        randomIdx = Math.floor(Math.random()*arr.length);
      }
      newArr.push(arr[randomIdx]);
      usedIndexes.add(randomIdx);
    }
    return newArr;
  }

  initialize() {
    this.count = 0;
    this.board = [];
    this.isFlipped = [];
    this.flippedGrid1 = null;
    this.flippedGrid2 = null;
    
    const shuffledEmojis = this.shuffle(this.emojis).slice(0,8);
    const starterEmojis = this.shuffle([...shuffledEmojis, ...shuffledEmojis]);
    
    for (let i = 0; i < this.length; i++) {
      const row = [];
      for (let j = 0; j < this.length; j++) {
        row.push(starterEmojis[this.length*i+j]);
      }
      this.board.push(row);

      const rowIsFinished = Array(this.length).fill(false);
      this.isFlipped.push(rowIsFinished);

    }
    console.log(shuffledEmojis);
  }

  onSelect(i: number, j: number) {
    //alert(`${i}, ${j}`);
    if (this.isFlipped[i][j]) {
      return;
    }

    this.isFlipped[i][j] = true;

    if (this.flippedGrid1 !== null && this.flippedGrid2 !== null) {
      this.isFlipped[this.flippedGrid1[0]][this.flippedGrid1[1]] = false;
      this.isFlipped[this.flippedGrid2[0]][this.flippedGrid2[1]] = false;
      this.flippedGrid1 = null;
      this.flippedGrid2 = null;
    }

    if (this.flippedGrid1 === null) {
      this.flippedGrid1 = [i, j];
    } else {
      if (this.board[i][j] === this.board[this.flippedGrid1[0]][this.flippedGrid1[1]]) {
        this.flippedGrid1 = null;
        this.count += 2;
        if (this.count === this.length*this.length) {
          alert("You win!");
          //this.initialize();
        }
      } else {
        this.flippedGrid2 = [i, j];
      }
    }


  }
}
