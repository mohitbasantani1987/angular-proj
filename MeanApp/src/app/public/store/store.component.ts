import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Cart } from '../../models/cart';
import { GlobalConfig } from '../../config/global.config';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styles: []
})
export class StoreComponent implements OnInit {
  products = [];
  constructor(private productService: ProductService, public cart: Cart, public globalConfig: GlobalConfig) {
    this.cart.cartName = this.globalConfig.cartName;
  }

  ngOnInit() {
    this.productService.getAll().subscribe((res) => {
      this.products = res;
    });
  }
}
