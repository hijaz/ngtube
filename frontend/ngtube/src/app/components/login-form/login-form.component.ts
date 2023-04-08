import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

interface User{
  userid: string;
  password: string;
}

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit{
  loginForm!: FormGroup
  error: string ="";

  constructor(private http: HttpClient, private router: Router){}

  ngOnInit(){
    this.loginForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });
  }

  get username() {return this.loginForm.get('username');}
  get password() {return this.loginForm.get('password');}

  onSubmit(){
    console.log('Form submitted')
    this.http.get<User[]>('http://localhost:3000/users').subscribe(users => {
      console.log({users})
      const foundUser = users.find(user => user.userid === this.username?.value && user.password === this.password?.value);
      if(foundUser){
        localStorage.setItem('loggedInUser', foundUser.userid);
        this.router.navigateByUrl('/home');
      }else{
        this.error = "Invalid username or password";
      }
    })
  }

}
