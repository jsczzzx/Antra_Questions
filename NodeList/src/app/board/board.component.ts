import { Component } from '@angular/core';
import { Note } from '../data.model';
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
  notes: Note[] = [
    {title: "Note1", content: "abcde"},
    {title: "Note2", content: "12345"},
  ];
  isCreatingNewNote = false;
  currentNote: Note = {title: "", content: ""};
  selectedIndex = -1;

  initialize() {
    this.currentNote = {title: "", content: ""};
    this.selectedIndex = -1;
  }

  onSelect(index: number) {
    //alert(index);
    this.selectedIndex = index;
    this.currentNote = {...this.notes[this.selectedIndex]};
  }

  createNewNote() {
    this.initialize();
    this.isCreatingNewNote = true;
  }

  deleteNote(index: number) {
    this.notes.splice(index, 1);
    this.initialize();
  }

  saveNote() {
    if (this.isCreatingNewNote) {
      if (this.currentNote.title !== "" && this.currentNote.content !== "") {
        this.notes.push(this.currentNote);
      }
    } else {
      this.notes[this.selectedIndex] = this.currentNote;
    }
    this.isCreatingNewNote = false;
  }

  revertNote() {
    this.currentNote = {...this.notes[this.selectedIndex]};
  }

  
}
