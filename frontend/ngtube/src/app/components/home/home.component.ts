import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Video } from 'src/app/types/Video'; 

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  myVideos!: Video[];
  popularVideos!: Video[];

  constructor(private http: HttpClient){}
  
  ngOnInit(): void {
    this.http.get('http://localhost:3000/videos').subscribe((response) => {
      this.myVideos = [];
      this.popularVideos = [];
      const loggedInUserId = localStorage.getItem('loggedInUser');
      if(!Array.isArray(response)) return;
      if(!response.length) return;
      response.forEach(video => {
        if(video.userid === loggedInUserId){
          this.myVideos?.push(video);
        }else{
          this.popularVideos?.push(video);
        }
      });
    })
  }


}
