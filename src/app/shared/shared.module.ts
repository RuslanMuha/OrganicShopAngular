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
import {MatButtonModule, MatIconModule, MatMenuModule, MatTabsModule} from '@angular/material';
import {HomeComponent} from '../user/home/home.component';
import {ShoppingCartComponent} from '../user/shopping-cart/shopping-cart.component';
import { LoginComponent } from './login/login.component';
import { AngularFireAuthModule} from '@angular/fire/auth';
import {AuthService} from './auth-service';
import {AuthFirebaseService} from './auth-firebase.service';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import {AddProductComponent} from '../admin/add-product/add-product.component';
import {EditProductComponent} from '../admin/edit-product/edit-product.component';
const routes: Routes = [
  {path: 'admin/orders', component: AdminOrders},
  {path: 'user/orders', component: UserOrders},
  {path: 'admin/products', component: ProductsComponent},
  {path: 'user/home', component: HomeComponent},
  {path: 'user/shopping-cart', component: ShoppingCartComponent},
  {path: 'logout', component: LogoutComponent},
  {path: 'login', component: LoginComponent},
  {path: 'admin/products/add', component: AddProductComponent},
  {path: 'admin/products/edit/:id', component: EditProductComponent},
  // TODO for all components
];
@NgModule({
  declarations: [OshopNavComponent, LogoutComponent, LoginComponent],
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
    AngularFirestoreModule
  ],
  exports: [OshopNavComponent],
  providers: [{provide: AuthService, useClass: AuthFirebaseService}]
})
export class SharedModule { }
