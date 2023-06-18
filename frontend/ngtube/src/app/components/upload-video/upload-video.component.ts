import { HttpBackend, HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { backendUrl } from 'src/app/constants';

@Component({
  selector: 'app-upload-video',
  template: `<br />
    <div class="alert alert-danger" role="alert" *ngIf="error">
      {{ error }}
    </div>
    <br />
    <div class="mb-3">
      <div class="mb-3">
        <h2>Upload Video</h2>
        <label for="videoTitle" class="form-label">Title</label>
        <input
          [(ngModel)]="title"
          type="email"
          class="form-control"
          id="videoTitle"
          placeholder="Video Title..."
        />
      </div>
      <div class="mb-3">
        <label for="videoDescription" class="form-label">Description</label>
        <textarea
          [(ngModel)]="description"
          class="form-control"
          id="videoDescription"
          rows="3"
        ></textarea>
      </div>
      <label for="formFile" class="form-label">Choose video to upload:</label>
      <input
        class="form-control"
        type="file"
        id="formFile"
        (change)="handleFileInput($event)"
      />
      <br />
      <button type="button" class="btn btn-primary" (click)="upload()">
        Upload
      </button>
    </div> `,
})
export class UploadVideoComponent {
  title: string = '';
  description: string = '';
  error: string = '';
  files: File[] = [];

  constructor(private http: HttpClient, private router: Router) {}

  handleFileInput($event: Event) {
    this.files = [];
    const inputElement = $event.target as HTMLInputElement;
    const inputFiles = inputElement.files;

    if (!inputFiles) return;

    this.files.push(inputFiles[0]);
    // for(let i=0;i<inputFiles.length;i++){
    //   const file = inputFiles[i];
    //   this.files.push(file);
    // }
  }

  async upload() {
    // debugger;
    const userid = localStorage.getItem('loggedInUser') || '';
    const formData = new FormData();
    const filename = this.files[0].name.replace(/[^a-z0-9.-]/gi, '');
    const videoid = `${userid}__${filename}`;

    formData.append('file', this.files[0], videoid);
    formData.append('title', this.title);
    formData.append('description', this.description);
    formData.append('videoid', videoid);
    formData.append('userid', userid);

    // json-server throws an error so we are adding a try catch
    // temporarily to ignore that error

    try {
      this.http.post(`${backendUrl}/uploadVideo`, formData).subscribe(
        (response) => {
          debugger;
          console.log(response);
          this.router.navigateByUrl('/home');
        },
        (err) => {
          if (err.status >= 400) {
            this.error = 'Something went wrong uploading your video';
          } else {
            this.router.navigateByUrl('/home');
          }
        }
      );
    } catch (error) {
      debugger;
      this.error = 'Something went wrong uploading your video';
    }
  }
}
