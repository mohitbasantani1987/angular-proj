import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-layout-user',
  templateUrl: './layout-user.component.html',
  styles: []
})
export class LayoutUserComponent implements OnInit {
  user:{};
  constructor(private authService: AuthService, private router:Router) {
    this.user= this.authService.user;
   }

  ngOnInit() {
  }
 signout() {
    this.authService.logOut();
    this.router.navigate(['login']);
  }
}
