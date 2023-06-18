import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { backendUrl } from 'src/app/constants';
import { Rating } from 'src/app/types/Rating';

@Component({
  selector: 'app-rate-video',
  templateUrl: './rate-video.component.html',
  styleUrls: ['./rate-video.component.css'],
})
export class RateVideoComponent {
  @Input() ratings: Rating[] = [];
  @Input() uploader!: string;
  @Input() id!: string;
  avgRating: string = 'No Ratings Yet!';
  hideRatings: boolean = true;
  alreadyVoted: number = 0;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    const loggedInUser = localStorage.getItem('loggedInUser');

    if (loggedInUser !== this.uploader) {
      this.hideRatings = false;
    }

    if (this.ratings.length) {
      let sumRatings = 0;
      this.ratings.forEach((rating) => {
        sumRatings = sumRatings + rating.vote;
        if (rating.author === loggedInUser) {
          this.alreadyVoted = rating.vote;
        }
      });
      this.avgRating = `Avg Score:${sumRatings / this.ratings.length} (from ${
        this.ratings.length
      } ratings)`;
    }
  }

  submitRating(vote: number) {
    debugger;
    console.log(this.ratings);
    const loggedInUser = localStorage.getItem('loggedInUser');

    this.http
      .put(`${backendUrl}/videos/` + this.id, {
        ratings: [
          ...this.ratings,
          {
            author: loggedInUser,
            vote: vote,
          },
        ],
      })
      .subscribe(() => {
        // this.comments = [
        //   ...this.comments,
        //   {
        //     author: loggedInUser || '',
        //     date: date,
        //     text: this.myComment,
        //   },
        // ];
      });
  }
}

// TODO

// X calculate and show the current ratings
// X show sum of current ratings (also the count of ratings)
// X if none then show a message no ratings left
// X if uploader is the watcher hide the buttons
// all watchers are allowed just one vote
// if a watcher has voted on a video, show them their previous selection
//  allow them to update their choice
