import { Component } from '@angular/core';
import { FetchDataService } from '../fetch-data.service';
import { Post, Comment } from '../data.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-board',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './board.component.html',
  styleUrl: './board.component.css'
})
export class BoardComponent {

  posts: Post[] = [];
  comments: Comment[] = [];
  filteredComments: Comment[] = [];

  selectedId = -1;

  constructor(private fetchData: FetchDataService) {}

  ngOnInit() {
    this.fetchData.getPost().subscribe(res=>{
      this.posts = res;
    })
    this.fetchData.getComment().subscribe(res=>{
      this.comments = res;
    })
  }

  selectPost(index: number) {
    if (this.selectedId !== -1) {
      this.selectedId = -1;
    } else {
      this.selectedId = index;
      this.filteredComments = this.comments.filter(comment => 
        comment.postId === this.posts[index].id
      )
    }
  }

}
