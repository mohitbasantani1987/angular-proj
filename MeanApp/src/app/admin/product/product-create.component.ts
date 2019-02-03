import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { ProductService } from '../../services/product.service';
import { CategoryService } from '../../services/category.service';
import { FormGroup, Validators, NgForm, FormBuilder } from "@angular/forms";
import { GlobalConfig } from '../../config/global.config';

import { UPLOAD_DIRECTIVES } from 'ng2-file-uploader/ng2-file-uploader';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styles: []
})
export class ProductCreateComponent implements OnInit {
  uploadedFiles: any[] = [];
  categories: any[] = [];
  options: Object;
  productForm: FormGroup;

  productService: ProductService;
  categoryService: CategoryService;

  constructor(formbuilder: FormBuilder, private router: Router, _productService: ProductService, _categoryService: CategoryService, private globalConfig: GlobalConfig) {

    this.options = {
      url: this.globalConfig.apibaseAddress + '/file'
    };

    this.productService = _productService;
    this.categoryService = _categoryService;

    this.productForm = formbuilder.group({
      'name': [null, [Validators.required]],
      'unitPrice': [null, [Validators.required]],
      'imagePath': [null, [Validators.required]],
      'categoryId': ['', [Validators.required]]
    });
  }

  ngOnInit() {
    this.categoryService
      .getAll()
      .subscribe((data: any) => {
        this.categories = data;
      });
  }

  handleUpload(data): void {
    //debugger;
    if (data && data.response) {
      data = JSON.parse(data.response);
      this.productForm.controls['imagePath'].setValue(data.filePath);
      console.log(this.productForm.controls['imagePath'].value);
      return;
    }
  }
  saveData(form: NgForm) {
    this.productForm.controls['imagePath'].setValue('../assets/file-1495869967204.jpg'); 
    if (form.valid) {
      this.productService
        .add(form.value)
        .subscribe((data: any) => {
          this.router.navigate(['/admin/product']);
        });
    }
  }
}
