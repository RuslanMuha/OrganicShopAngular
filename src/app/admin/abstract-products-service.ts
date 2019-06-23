import {Observable} from 'rxjs';

export interface Product {
  id: string;
  title: string;
  price: number;
  category: string;
  imageUrl: string;
}
export abstract class ProductsService {
  abstract addProduct(product: Product): Promise<void>;
  abstract deleteProduct(id: string): Promise<void>;
  abstract getProduct(id: string): Observable<Product>;
  abstract getProducts(category?: string): Observable<Product[]>;
  abstract updateProduct(product: Product): Promise<void>;

}
