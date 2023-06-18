import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { backendUrl } from 'src/app/constants';
import { Video } from 'src/app/types/Video';

@Component({
  selector: 'app-watch-video',
  templateUrl: './watch-video.component.html',
  styleUrls: ['./watch-video.component.css'],
})
export class WatchVideoComponent implements OnInit {
  videoid: string = '';
  videoDetails!: Video;
  backendLoc = backendUrl;

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.videoid = params['id'] || '';
    });

    this.http.get(`${backendUrl}/videos/${this.videoid}`).subscribe((video) => {
      if (!video) return;
      this.videoDetails = video as Video;

      this.http
        .patch(`${backendUrl}/videos/${this.videoid}/watched`, {})
        .subscribe();
    });
  }
}
