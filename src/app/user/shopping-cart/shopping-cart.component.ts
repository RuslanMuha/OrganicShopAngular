import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {CartService, ProductCart} from '../cart.service';
import {MatListOption, MatSelectionListChange} from '@angular/material';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {

  productCart$: Observable<ProductCart[]>;
  totalPrice = 0;
  quantitySelected = 0;

  constructor(private  cartService: CartService) {

  }

  ngOnInit() {
    this.productCart$ = this.cartService.getAllProductInCart();
  }


  selection(change: MatSelectionListChange) {
    const values = change.option.selectionList.selectedOptions.selected;
    this.quantitySelected = values.length;
    let fl = true;
    if (!change.option.selected && values.length === 0) {
      this.totalPrice = 0;
    }
    values.map(v => v.value).forEach(id => {
      this.cartService.getProductsCart(id).subscribe(product => {
        if (fl) {
          this.totalPrice = 0;
          fl = false;
        }
        this.totalPrice = this.totalPrice + product.totalPrice;
      });
    });
  }


  trackByFunction(index: number, product: ProductCart) {
    return product ? product.cartId : undefined;
  }


  getQuantity(price: number) {

    // this.totalPrice = this.totalPrice + price;

  }

  delete(productId: string) {
    this.cartService.removeProductCart(productId).then();
  }

  toBuy() {
    console.log('im bought this product');
  }

  selectAll(change: MatSelectionListChange) {
    if (change.option.selected) {

    }

  }
}
