import {Injectable} from '@angular/core';
import {Action, AngularFirestore, DocumentSnapshot} from '@angular/fire/firestore';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {Product} from '../admin/abstract-products-service';

export class CartConfig {
  static readonly CART_ID = 'cartId';
  static readonly CART_COLLECTION = 'carts';
  static readonly CART_PRODUCT = 'cart_products';
}

export interface Cart {
  timestamp: number;
}

export interface ProductCart {
  cartId: string;
  productId: string;
  quantity: number;
  title: string;
  price: number;
  imageUrl: string;
  totalPrice: number;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cartId: string;
  products: Observable<ProductCart> [];

  constructor(private fireStore: AngularFirestore) {
    if (!localStorage.getItem(CartConfig.CART_ID)) {
      const cart: Cart = {timestamp: new Date().getTime()};
      fireStore.collection<Cart>(CartConfig.CART_COLLECTION).add(cart).then(doc => {
        this.cartId = doc.id;
        localStorage.setItem(CartConfig.CART_ID, this.cartId);
      });
    } else {
      this.cartId = localStorage.getItem(CartConfig.CART_ID);
    }

  }

  createProductCart(product: Product): Promise<void> {
    const id = this.cartId + product.id;
    // tslint:disable-next-line:max-line-length
    const productCart: ProductCart = {
      productId: product.id,
      cartId: this.cartId,
      quantity: 1,
      imageUrl: product.imageUrl,
      price: product.price,
      title: product.title,
      totalPrice: product.price
    };
    return this.fireStore.collection<ProductCart>(CartConfig.CART_PRODUCT).doc(id).set(productCart);
  }

  updateProductCart(productId: string, quantity: number): Observable<void> {
    const id = this.cartId + productId;
    // tslint:disable-next-line:max-line-length
    return this.getProductsCart(productId).pipe(map(p => {
      p.quantity = quantity;
      p.totalPrice = p.price * quantity;
      this.fireStore.collection<ProductCart>(CartConfig.CART_PRODUCT).doc(id).set(p);
    }));

  }

  removeProductCart(productID: string): Promise<void> {
    const id = this.cartId + productID;
    return this.fireStore.collection<ProductCart>(CartConfig.CART_PRODUCT).doc(id).delete();

  }

  getProductsCart(productId: string): Observable<ProductCart> {
    // tslint:disable-next-line:max-line-length
    return this.fireStore.collection<ProductCart>(CartConfig.CART_PRODUCT).doc(this.cartId + productId).get().pipe(map(p => p.data() as ProductCart));
  }

  getAllProductInCart(): Observable<ProductCart[]> {

    return this.fireStore.collection<ProductCart>(CartConfig.CART_PRODUCT, ref => {
      return ref.where('cartId', '==', this.cartId);
    }).valueChanges();
  }

  getProductsSelected(productId: string): Observable<ProductCart> {
    return this.fireStore.collection<ProductCart>(CartConfig.CART_PRODUCT).doc(this.cartId + productId)
      .snapshotChanges().pipe(map(p => p.payload.data() as ProductCart));
  }



  removeAll(): Observable<void> {
    return this.getAllProductInCart().pipe(map(product => {
      product.forEach(p => {
        this.removeProductCart(p.productId).then();
      });
    }));
  }
}
