import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { backendUrl } from 'src/app/constants';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.css'],
})
export class CreateAccountComponent {
  error: string = '';
  user = {
    username: '',
    password: '',
    email: 'awd',
  };

  constructor(private http: HttpClient, private router: Router) {}

  createUser() {
    this.http.post(`${backendUrl}/users`, this.user).subscribe(
      (response) => {
        console.log('User created', response);
        this.router.navigateByUrl('/login');
      },
      (error) => {
        console.log('Error creating user', error);
        this.error = 'Error creating the new account';
      }
    );
  }
}
