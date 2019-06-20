import {Component, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {AngularFirestore} from '@angular/fire/firestore';
import * as _ from 'lodash';
import {Product} from '../abstract-products-service';
import {Observable} from 'rxjs';
import {CategoriesService, Category} from '../categories.service';
import {ProductsFirebaseService} from '../products-firebase.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {
  category: Category[];
  imageUrl = '';
  placeholder = 'https://www.ruralvixen.com/image/cache/catalog/placeholderproduct-500x500.png';

  constructor(private categoryService: CategoriesService, private productServise: ProductsFirebaseService) {
  }

  ngOnInit() {
    this.categoryService.getCategories().subscribe(category => {
      this.category = category as Category [];
    });
  }

  add(form: NgForm) {
    form.value.id = this.getRandomId();
    console.log(form.value);
    this.createProduct(form);
  }

  private getRandomId(): string {
    return _.random(10000, 99999).toString();
  }

  private createProduct(form: NgForm) {
   this.productServise.addProduct(form.value).then(() => form.reset());
  }

}
