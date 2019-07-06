import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subscription} from 'rxjs';
import {CartService, ProductCart} from '../cart.service';
import {MatSelectionList, MatSelectionListChange} from '@angular/material';
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
  selectedValues: string [];
  subscription: Subscription;
  constructor(private  cartService: CartService, private router: Router, private auth: AuthFirebaseService) {

  }

  ngOnInit() {
    this.productCart$ = this.cartService.getAllProductInCart();
  }


  selection(change: MatSelectionListChange) {
    const values = change.option.selectionList.selectedOptions.selected;
    this.quantitySelected = values.length;
    console.log( values.map(v => v.value));
    let fl = true;
    if (!change.option.selected && values.length === 0) {
      this.totalPrice = 0;
    }

    values.map(v => v.value).forEach(id => {
       this.subscription = this.cartService.getProductsCart(id).subscribe(product => {
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
    if (this.quantitySelected !== 0) {
      console.log('im bought this product');
      if (!this.auth.isAuth()) {
        this.router.navigate(['login']).then();
      }
      this.router.navigate(['paypal', {cost: this.totalPrice}]).then();
    }
  }

  selectAll(checkAll: boolean, list: MatSelectionList) {
    if (checkAll) {
      list.selectAll();
      this.cartService.getAllProductInCart().subscribe(pr => {
        this.totalPrice = 0;
        pr.forEach(product => {
          this.totalPrice = this.totalPrice + product.totalPrice;
        });
        this.quantitySelected = pr.length;
      });
    } else {
      list.deselectAll();
      this.totalPrice = 0;
      this.quantitySelected = 0;
    }
    console.log(this.selectedValues);
  }

  deleteAll() {
   this.subscription =  this.cartService.removeAll().subscribe(() => {
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
