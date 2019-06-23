import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { OrdersComponent } from './orders/orders.component';
import {MatButtonModule, MatCardModule, MatGridListModule, MatListModule, MatSidenavModule} from '@angular/material';
import {FlexLayoutModule} from '@angular/flex-layout';


@NgModule({
  declarations:
    [HomeComponent, ShoppingCartComponent, OrdersComponent],
  imports: [
    CommonModule,
    MatListModule,
    MatGridListModule,
    MatCardModule,
    MatSidenavModule,
    MatButtonModule,
    FlexLayoutModule
  ],
  exports: [HomeComponent, ShoppingCartComponent, OrdersComponent]
})
export class UserModule { }
