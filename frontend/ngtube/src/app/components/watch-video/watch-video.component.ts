import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Video } from 'src/app/types/Video';

@Component({
  selector: 'app-watch-video',
  templateUrl: './watch-video.component.html',
  styleUrls: ['./watch-video.component.css']
})
export class WatchVideoComponent implements OnInit{
  videoid!: string;
  videoDetails!: Video;

  constructor(private route:ActivatedRoute, private http: HttpClient){}
  
  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.videoid = params['id'];
    })

    this.http.get('http://localhost:3000/videos').subscribe(videos => {
      if(!Array.isArray(videos)) return;
      this.videoDetails = videos.find( video => video.videoid === this.videoid);
    })
  }


}
