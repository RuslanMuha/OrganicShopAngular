import {Component, OnInit, ViewChild} from '@angular/core';
import {Product, ProductsService} from '../abstract-products-service';
import {CategoriesService} from '../categories.service';
import {AngularFirestore} from '@angular/fire/firestore';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  dataSource: MatTableDataSource<Product>;
  displayedColumns: string[] = ['title', 'price', 'category', 'edit', 'delete'];
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private productsService: ProductsService, private categoriesService: CategoriesService) {
  }

  ngOnInit() {
    this.productsService.getProducts().subscribe(products => {
      this.dataSource = new MatTableDataSource<Product>(products as Product[]);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });

  }


  applyFilter(filterValue: any) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


}


