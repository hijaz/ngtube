import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Route, Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit{
  isLoginPage: boolean = true;

  constructor(private router: Router){}

  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      if(event instanceof NavigationEnd){
        this.isLoginPage = event.url === '/login';
      }
    })
  }

  logout() {
    localStorage.removeItem('loggedInUser');
    this.router.navigateByUrl('/login')
  }

}
