import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {CartService, ProductCart} from '../cart.service';
import {ProductsFirebaseService} from '../../admin/products-firebase.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {
  productCart$: Observable<ProductCart[]>;
   quantity: number;

  constructor(private  cartService: CartService) {
  }

  ngOnInit() {
    this.productCart$ = this.cartService.getAllProductInCart();
  }

  subtractQuantity(product: ProductCart) {
    this.cartService.updateProductCart(product.productId, product.quantity - 1).subscribe(() => {
     this.quantity = product.quantity - 1;
    });
  }

  addQuantity(product: ProductCart) {
    this.cartService.updateProductCart(product.productId, product.quantity + 1).subscribe(() =>
      this.quantity = product.quantity + 1);
  }
}
