import { HttpBackend, HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-upload-video',
  template: `<br><br>
    <div class="mb-3">
      <div class="mb-3">
        <h2>Upload Video</h2>
        <label for="videoTitle" class="form-label">Title</label>
        <input [(ngModel)]="title" type="email" class="form-control" id="videoTitle" placeholder="Video Title...">
      </div>
      <div class="mb-3">
        <label for="videoDescription" class="form-label">Description</label>
        <textarea [(ngModel)]="description" class="form-control" id="videoDescription" rows="3"></textarea>
      </div>
        <label for="formFile" class="form-label">Choose video to upload:</label>
        <input class="form-control" type="file" id="formFile" (change)="handleFileInput($event)">
        <br>
        <button type="button" class="btn btn-primary" (click)="upload()">Upload</button>
    </div>
`
})
export class UploadVideoComponent {
  title: string = '';
  description: string = '';
  files: File[] = [];

  constructor(private http: HttpClient){}

  handleFileInput($event: Event) {
    this.files = [];
    const inputElement = $event.target as HTMLInputElement;
    const inputFiles = inputElement.files;

    if(!inputFiles) return;

    this.files.push(inputFiles[0]);
    // for(let i=0;i<inputFiles.length;i++){
    //   const file = inputFiles[i];
    //   this.files.push(file);
    // }
  }

  async upload() {
    const userid = localStorage.getItem('loggedInUser');
    const formData = new FormData();
    formData.append('file', this.files[0], `${userid}__${this.files[0].name}`);

    await this.http.post('http://localhost:3000/videos', {
      title: this.title,
      description: this.description,
      videoid: `${userid}__${this.files[0].name}`,
      userid: userid,
      views: 0,
      rating: []
    }).toPromise();

    const response = await this.http.post('http://localhost:3000/upload', formData).toPromise();
    console.log({response})
  }

}
