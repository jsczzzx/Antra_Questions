import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-board',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './board.component.html',
  styleUrl: './board.component.css'
})
export class BoardComponent implements OnInit {

  itemlist: string[] = [
    'Changjinhu (2021)',
    'Dune (2021)',
    'Shang-Chi and the Legend of the Ten Rings (2021)',
    'Free Guy (2021)',
    'The Many Saints of Newark (2021)',
    'Finch (2021)',
    'Candyman (2021)',
    'No Time to Die (2021)',
    'Halloween Kills (2021)',
  ];

  isChecked: boolean[] = [];
  selectedItems: string[] = [];
  isAllSelected = false;

  ngOnInit() {
    this.clear();
  }

  clear() {
    this.isChecked = new Array(this.itemlist.length).fill(false);
    this.selectedItems = [];
    this.isAllSelected = false;
  }

  toggleAllSelect() {
    if (this.isAllSelected) {
      this.isChecked = new Array(this.itemlist.length).fill(true);
      this.selectedItems = [...this.itemlist];
    } else {
      this.clear();
    }
  }

  onItemChange(item: string, checked: boolean) {
    if (checked) {
      if (!this.selectedItems.includes(item)) {
        this.selectedItems.push(item);
      }
    } else {
      this.selectedItems = this.selectedItems.filter(i => i !== item);
    }
  }
}
