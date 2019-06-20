import {Component, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {ProductsFirebaseService} from '../products-firebase.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Product} from '../abstract-products-service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {
  product: Product ;

  constructor(private productService: ProductsFirebaseService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.productService.getProduct(id).subscribe(product => {
      this.product = product;
    });

  }

  update(form: NgForm) {
    this.product.price = form.value.price;
    this.productService.updateProduct(this.product).then(() => {
      form.reset();
      this.back();
    });
  }

  back() {
    this.router.navigate(['admin/products']).then();
  }
}
