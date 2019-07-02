import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { OrdersComponent } from './orders/orders.component';
import {
  MatButtonModule,
  MatCardModule,
  MatCheckboxModule,
  MatGridListModule,
  MatIconModule,
  MatListModule,
  MatSidenavModule
} from '@angular/material';
import {FlexLayoutModule} from '@angular/flex-layout';
import { FilterPipe } from './filter.pipe';
import {FormsModule} from '@angular/forms';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import { ProductCartComponent } from './product-cart/product-cart.component';


@NgModule({
  declarations:
    [HomeComponent, ShoppingCartComponent, OrdersComponent, FilterPipe, ProductCartComponent],
  imports: [
    CommonModule,
    MatListModule,
    MatGridListModule,
    MatCardModule,
    MatSidenavModule,
    MatButtonModule,
    FlexLayoutModule,
    FormsModule,
    AngularFirestoreModule,
    MatCheckboxModule,
    MatIconModule
  ],
  exports: [HomeComponent, ShoppingCartComponent, OrdersComponent]
})
export class UserModule { }
