import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subscription} from 'rxjs';
import {CartService, ProductCart} from '../cart.service';
import {Router} from '@angular/router';
import {AuthFirebaseService} from '../../shared/auth-firebase.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit, OnDestroy {

  productCart$: Observable<ProductCart[]>;
  totalPrice = 0;
  quantitySelected = 0;
  subscription: Subscription;

  constructor(private  cartService: CartService, private router: Router, private auth: AuthFirebaseService) {

  }

  ngOnInit() {
    this.productCart$ = this.cartService.getAllProductInCart();
    this.cartService.getAllProductInCart().subscribe(product => {
      this.totalPrice = 0;
      product.forEach(p => {
        if (p) {
          this.totalPrice = this.totalPrice + p.totalPrice;
        }

      });
      this.quantitySelected = product.length;
    });
  }



  trackByFunction(index: number, product: ProductCart) {
    return product ? product.cartId : undefined;
  }


  delete(productId: string) {
    let price = 0;
    this.cartService.getProductsCart(productId).subscribe(p => {
      if (p) {
        price = p.totalPrice;
      }

    });

    this.cartService.removeProductCart(productId).then(() => {
      this.totalPrice = this.totalPrice - price;
    });
  }
  toBuy() {
    if (this.quantitySelected !== 0) {
      console.log('im bought this product');
      if (!this.auth.isAuth()) {
        this.router.navigate(['login']).then();
      } else {

        this.router.navigate(['paypal', {cost: this.totalPrice}]).then();
      }
    }
  }



  deleteAll() {
    this.subscription = this.cartService.removeAll().subscribe(() => {
      this.totalPrice = 0;
      this.quantitySelected = 0;
    });

  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }

  }



}
