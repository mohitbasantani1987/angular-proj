import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { NameRoutingModule, routedComponents } from './routing';
import { GlobalConfig } from './config/global.config';
import { CategoryService } from './services/category.service';
import { ProductService } from './services/product.service';
import { UPLOAD_DIRECTIVES } from 'ng2-file-uploader/ng2-file-uploader';
import { AuthService } from './services/auth.service';
import { AdminAuthGuard, UserAuthGuard } from './services/authGuard.service';
import { CartComponent } from './public/store/cart.component';
import { Cart } from './models/cart';
import { StoreService } from './services/store.service';

@NgModule({
  declarations: [
    AppComponent,
    routedComponents,
    UPLOAD_DIRECTIVES,
    CartComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    NameRoutingModule,
    ReactiveFormsModule
  ],
  providers: [GlobalConfig, CategoryService, ProductService, AuthService, AdminAuthGuard, UserAuthGuard, Cart, StoreService],
  bootstrap: [AppComponent]
})
export class AppModule { }
