import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminDashboardComponent } from './admin/dashboard/index.component';
import { ProductListComponent } from './admin/product/product-list.component';
import { ProductCreateComponent } from './admin/product/product-create.component';
import { CategoryListComponent } from './admin/category/category-list.component';
import { CategoryCreateComponent } from './admin/category/category-create.component';
import { UserDashboardComponent } from './user/dashboard/index.component';
import { StoreComponent } from './public/store/store.component';
import { PagenotfoundComponent } from './public/shared/pagenotfound.component';
import { LayoutAdminComponent } from './admin/shared/layout-admin.component';
import { LayoutUserComponent } from './user/shared/layout-user.component';
import { LayoutComponent } from './public/shared/layout.component';
import { LoginComponent } from './public/account/login.component';
import { SignupComponent } from './public/account/signup.component';
import { UserAuthGuard, AdminAuthGuard } from './services/authGuard.service';
import { UnauthorizeComponent } from './public/shared/unauthorize.component';
import { CartComponent } from './public/store/cart.component';

const adminRoutes: Routes = [
  { path: '', component: AdminDashboardComponent, pathMatch: 'full' },
  { path: 'product', component: ProductListComponent },
  { path: 'product/create', component: ProductCreateComponent },
  { path: 'edit/:id', component: ProductCreateComponent },
  { path: 'category', component: CategoryListComponent },
  { path: 'category/create', component: CategoryCreateComponent },
  { path: 'category/edit/:id', component: CategoryCreateComponent },
];

const userRoutes: Routes = [
  { path: '', component: UserDashboardComponent, pathMatch: 'full' }
];

const publicRoutes: Routes = [
  { path: '', component: StoreComponent, pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'cart', component: CartComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'unauthorize', component: UnauthorizeComponent },
];

const routes: Routes = [
  { path: '', component: LayoutComponent, children: publicRoutes },
  { path: 'admin', component: LayoutAdminComponent, children: adminRoutes, canActivate: [AdminAuthGuard] },
  { path: 'user', component: LayoutUserComponent, children: userRoutes, canActivate: [UserAuthGuard] },
  { path: '**', component: PagenotfoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class NameRoutingModule { }

export const routedComponents = [ProductListComponent,
  ProductCreateComponent,
  CategoryListComponent,
  CategoryCreateComponent,
  AdminDashboardComponent,
  UserDashboardComponent,
  LayoutUserComponent,
  LayoutAdminComponent,
  StoreComponent,
  CartComponent,
  LoginComponent,
  SignupComponent,
  LayoutComponent,
  UnauthorizeComponent,
  PagenotfoundComponent];
