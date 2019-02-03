import { Component, OnInit } from '@angular/core';
import { Cart } from '../../models/cart';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styles: []
})
export class LayoutComponent implements OnInit {
  user = {};
  constructor(public cart: Cart, private authService: AuthService, private router: Router) {
    this.user = this.authService.user;
  }
  ngOnInit() {
  }
  signout() {
    this.authService.logOut();
    this.router.navigate(['login']);
  }
}
