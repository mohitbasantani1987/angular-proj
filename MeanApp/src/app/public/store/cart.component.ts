import { Component, OnInit } from '@angular/core';
import { Cart } from '../../models/cart';
import { StoreService } from '../../services/store.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styles: []
})
export class CartComponent implements OnInit {

  constructor(public cart: Cart, private storeService: StoreService, private authService: AuthService, private router:Router) { }

  ngOnInit() {
  }
  checkout() {
    // const obj = {
    //   userId: '58a945616130970a145bc91b',
    //   name: 'shailendra',
    //   username: 'pro.shailendra@gmail.com',
    //   contactNo: '9876543210'
    // };

    if (this.authService.user.isAuth) {
      this.cart.userId = this.authService.user.userId;

      this.storeService.saveCart(this.cart).subscribe((res: any) => {
        if (res.id !== undefined) {
          this.cart.checkoutPayUmoney(res.id, this.authService.user);
        }
      });
    }
    else {
      this.router.navigate(['login'],{queryParams:{ref:'cart'}});
    }
  }
}
