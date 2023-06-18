import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { backendUrl } from 'src/app/constants';

interface User {
  userid: string;
  password: string;
}

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css'],
})
export class LoginFormComponent implements OnInit {
  loginForm!: FormGroup;
  error: string = '';

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit() {
    this.loginForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });
  }

  get username() {
    return this.loginForm.get('username')?.getRawValue();
  }
  get password() {
    return this.loginForm.get('password')?.getRawValue();
  }

  onSubmit() {
    console.log('Form submitted');
    this.http
      .post(`${backendUrl}/users/login`, {
        username: this.username,
        password: this.password,
      })
      .subscribe((response: any) => {
        console.log(response);
        const loggedIn = response?.login;
        if (loggedIn) {
          localStorage.setItem('loggedInUser', this.username);
          this.router.navigateByUrl('/home');
        } else {
          this.error = 'Invalid username or password';
        }
      });
  }

  onClickButton(): void {
    this.router.navigate(['/create-account']);
  }
}
