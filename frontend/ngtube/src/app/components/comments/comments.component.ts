import { HttpClient } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { Comment } from 'src/app/types/Comment';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent {
  @Input() comments!: Comment[];
  @Input() id!: number;
  myComment: string = "";

  constructor(private http: HttpClient){}

  submitComment(){
    if(!this.myComment) return;
    const loggedInUser = localStorage.getItem('loggedInUser');
    const date = new Date().toDateString();
    this.http.patch('http://localhost:3000/videos/'+this.id, {
      comments: [...this.comments, {
        author: loggedInUser,
        date: date,
        text: this.myComment
      }]
    }).subscribe(() => location.reload());
  }

}
