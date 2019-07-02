import {Component, Input, OnInit} from '@angular/core';
import {CartService} from '../cart.service';
import {Product} from '../../admin/abstract-products-service';

@Component({
  selector: 'app-product-cart',
  templateUrl: './product-cart.component.html',
  styleUrls: ['./product-cart.component.css']
})
export class ProductCartComponent implements OnInit {
  quantity: number;
  @Input() product: Product;
  @Input() productId: string;

  constructor(private cartService: CartService) {
  }

  ngOnInit() {
    this.cartService.getProductsCart(this.productId).subscribe(p => {
      this.quantity = p ? p.quantity : 0;
    });
  }

  subtractQuantity() {
    if (this.quantity === 1) {
      this.cartService.removeProductCart(this.productId).then(() => this.quantity = 0);
    } else {
      this.cartService.updateProductCart(this.productId, this.quantity - 1).subscribe(() => {
        --this.quantity;
      });
    }


  }

  addQuantity() {
    this.cartService.updateProductCart(this.productId, this.quantity + 1).subscribe(() => ++this.quantity);
  }

  addProduct() {
    this.cartService.createProductCart(this.product).then(() => this.quantity = 1);

  }
}
