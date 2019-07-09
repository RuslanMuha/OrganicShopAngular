import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OshopNavComponent } from './oshop-nav/oshop-nav.component';
import { LogoutComponent } from './logout/logout.component';
import {UserModule} from '../user/user.module';
import {AdminModule} from '../admin/admin.module';
import {RouterModule, Routes} from '@angular/router';
import {OrdersComponent as AdminOrders} from '../admin/orders/orders.component';
import {OrdersComponent as UserOrders} from '../user/orders/orders.component';
import {ProductsComponent} from '../admin/products/products.component';
import {
  MatBadgeModule,
  MatButtonModule,
  MatCardModule,
  MatGridListModule,
  MatIconModule,
  MatMenuModule,
  MatTabsModule
} from '@angular/material';
import {HomeComponent} from '../user/home/home.component';
import {ShoppingCartComponent} from '../user/shopping-cart/shopping-cart.component';
import { LoginComponent } from './login/login.component';
import { AngularFireAuthModule} from '@angular/fire/auth';
import {AuthService} from './auth-service';
import {AuthFirebaseService} from './auth-firebase.service';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import {AddProductComponent} from '../admin/add-product/add-product.component';
import {EditProductComponent} from '../admin/edit-product/edit-product.component';
import { PaypalComponent } from './paypal/paypal.component';
import {NgxPayPalModule} from 'ngx-paypal';
import {AdminGuard, AuthGuard} from './auth-guard';
const routes: Routes = [
  {path: 'admin/orders', component: AdminOrders, canActivate: [AdminGuard]},
  {path: 'user/orders', component: UserOrders, canActivate: [AuthGuard]},
  {path: 'admin/products', component: ProductsComponent, canActivate: [AdminGuard]},
  {path: 'user/home', component: HomeComponent},
  {path: 'user/shopping-cart', component: ShoppingCartComponent},
  {path: 'logout', component: LogoutComponent, canActivate: [AuthGuard]},
  {path: 'login', component: LoginComponent},
  {path: 'admin/products/add', component: AddProductComponent},
  {path: 'admin/products/edit/:id', component: EditProductComponent, canActivate: [AdminGuard]},
  {path: 'paypal', component: PaypalComponent, canActivate: [AuthGuard]},
  {path: '', redirectTo: 'user/home', pathMatch: 'full'},
  // TODO for all components
];
@NgModule({
  declarations: [OshopNavComponent, LogoutComponent, LoginComponent, PaypalComponent],
  imports: [
    CommonModule,
    UserModule,
    AdminModule,
    RouterModule.forRoot(routes),
    MatTabsModule,
    MatMenuModule,
    MatButtonModule,
    MatIconModule,
    AngularFireAuthModule,
    AngularFirestoreModule,
    MatBadgeModule,
    MatGridListModule,
    MatCardModule,
    NgxPayPalModule
  ],
  exports: [OshopNavComponent, PaypalComponent],
  providers: [{provide: AuthService, useClass: AuthFirebaseService}]
})
export class SharedModule { }
