import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {CartService, ProductCart} from '../cart.service';
import { MatSelectionListChange} from '@angular/material';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {

  productCart$: Observable<ProductCart[]>;
  totalPrice = 0;
  productId: string;
  constructor(private  cartService: CartService) {

  }

  ngOnInit() {
    this.productCart$ = this.cartService.getAllProductInCart();
  }


  selection(change: MatSelectionListChange, product: ProductCart) {
    const selected = change.option.selected;
    change.source.deselectAll();
    change.option.selected = selected;
    if (selected) {
        this.totalPrice = this.totalPrice + product.totalPrice;
      } else {
        this.totalPrice = this.totalPrice - product.totalPrice;
      }
  }


  trackByFunction(index: number, product: ProductCart) {
    return product ? product.cartId : undefined;
  }


  getQuantity(price: number) {

      // this.totalPrice = this.totalPrice + price;

  }
}
