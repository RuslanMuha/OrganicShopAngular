import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {CartService, ProductCart} from '../cart.service';
import {MatSelectionListChange} from '@angular/material';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {

  productCart$: Observable<ProductCart[]>;
  quantity: number;
  totalPrice = 0;
  productId: string;

  constructor(private  cartService: CartService) {

  }

  ngOnInit() {
    this.productCart$ = this.cartService.getAllProductInCart();
  }


  selection(change: MatSelectionListChange) {
    const selected = change.option.selected;
    change.source.deselectAll();
    change.option.selected = selected;
    this.cartService.getProductsCart(change.option.value).subscribe(p => {
      this.productId = p.productId;
      if (selected) {
        this.totalPrice = this.totalPrice + p.totalPrice;
      } else {
        this.totalPrice = this.totalPrice - p.totalPrice;
      }
    });

    // this.products$ = this.productsService.getProducts(!selected ? '' : change.option.value as string);
  }


  trackByFunction(index: number, product: ProductCart) {
    return product ? product.cartId : undefined;
  }


}
