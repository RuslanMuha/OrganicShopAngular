import {AfterViewInit, Component, HostListener, OnInit, ViewChild} from '@angular/core';
import {Product} from '../../admin/abstract-products-service';
import {Observable} from 'rxjs';
import {ProductsFirebaseService} from '../../admin/products-firebase.service';
import {CategoriesService, Category} from '../../admin/categories.service';
import {MediaChange, MediaObserver} from '@angular/flex-layout';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  products$: Observable<Product[]>;
  categories$: Observable<Category[]>;
  columnNum = 4;
  rowHeight = '500px';

  constructor(private productsService: ProductsFirebaseService, private categoryService: CategoriesService, private media: MediaObserver) {
    this.categories$ = this.categoryService.getCategories();

    media.asObservable()
      .subscribe((change: MediaChange[]) => {

        if (change[0].mqAlias === 'xs') {
          this.columnNum = 3;
          this.rowHeight = '250px';
        } else if (change[0].mqAlias === 'sm') {
          this.columnNum = 3;
          this.rowHeight = '310px';
        } else if (change[0].mqAlias === 'md') {
          this.columnNum = 4;
          this.rowHeight = '380px';
        } else  {
          this.columnNum = 4;
          this.rowHeight = '450px';
        }
        console.log(change[0].mqAlias);
      });

  }

  ngOnInit(id?: string) {
    this.products$ = this.productsService.getProducts(id);
  }

  selectCategory(id?: string) {

    this.ngOnInit(id);
  }
}
