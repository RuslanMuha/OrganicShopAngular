import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { OrdersComponent } from './orders/orders.component';

@NgModule({
  declarations:
    [HomeComponent, ShoppingCartComponent, OrdersComponent],
  imports: [
    CommonModule
  ],
  exports: [HomeComponent, ShoppingCartComponent, OrdersComponent]
})
export class UserModule { }
