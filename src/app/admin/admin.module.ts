import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrdersComponent } from './orders/orders.component';
import { ProductsComponent } from './products/products.component';
import {ProductsService} from './abstract-products-service';
import {ProductsFirebaseService} from './products-firebase.service';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import {HttpClientModule} from '@angular/common/http';
import {
  MatButtonModule, MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatPaginatorModule,
  MatSelectModule,
  MatSortModule,
  MatTableModule
} from '@angular/material';
import { AddProductComponent } from './add-product/add-product.component';
import {RouterModule} from '@angular/router';
import {FormsModule} from '@angular/forms';
import { PriceDirective } from './price.directive';
import { EditProductComponent } from './edit-product/edit-product.component';

@NgModule({
  declarations: [OrdersComponent, ProductsComponent, AddProductComponent, PriceDirective, EditProductComponent],
  imports: [
    CommonModule,
    AngularFirestoreModule,
    HttpClientModule,
    MatInputModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatButtonModule,
    MatIconModule,
    RouterModule,
    MatSelectModule,
    FormsModule,
    MatGridListModule
  ],
  exports: [OrdersComponent, ProductsComponent],
  providers: [{provide: ProductsService, useClass: ProductsFirebaseService}]
})
export class AdminModule { }
