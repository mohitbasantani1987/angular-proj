import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styles: []
})
export class ProductListComponent implements OnInit {
  products = [];
  constructor(private productService: ProductService) { }

  ngOnInit() {
    this.productService.getAll().subscribe((res) => {
      this.products = res;
    })
  }
  deleteProduct(id: string) {
    if (confirm('Are you sure to delete?')) {
      this.productService.delete(id).subscribe((res) => {
        if (res.status == 200) {
          window.location.reload();
        }
      });
    }
  }
}
