import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-layout-admin',
  templateUrl: './layout-admin.component.html',
  styles: []
})
export class LayoutAdminComponent implements OnInit {

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
