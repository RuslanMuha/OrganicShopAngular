import {Component, OnInit} from '@angular/core';
import {AuthService} from '../auth-service';
import {CartService} from '../../user/cart.service';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';

export interface Link {
  path: string;
  label: string;
  icon: string;

}

@Component({
  selector: 'app-oshop-nav',
  templateUrl: './oshop-nav.component.html',
  styleUrls: ['./oshop-nav.component.css']
})
export class OshopNavComponent implements OnInit {
  navLinks: Link[] = [{path: 'user/home', label: 'Home', icon: 'home'}, {
    path: 'user/shopping-cart',
    label: 'Shopping-cart',
    icon: 'shopping_cart'
  }
  ];
  loginLink: Link = {path: 'login', label: 'Login', icon: ''};
  subLinks: Link[] = [{path: 'user/orders', label: 'My Orders', icon: ''},
    {path: 'admin/orders', label: 'Manage Orders', icon: ''},
    {path: 'admin/products', label: 'Manage Products', icon: ''},
    {path: 'logout', label: 'Logout', icon: ''}];
  quantity: string;

  constructor(private authService: AuthService, private cartService: CartService) {
  }

  isAuth(): boolean {
    return this.authService.isAuth();
  }

  getUserName(): string {
    if (!this.isAuth()) {
      return 'anonymous';
    }
    return this.authService.getUser().displayName;
  }

  isAdmin(): boolean {
    return this.authService.isAdmin();
  }

  ngOnInit() {
    this.cartService.getAllProductInCart().subscribe(p => {
      this.quantity = p ? p.length.toString() : '0';
    });
  }

  isCart(label: string) {
    return label === 'Shopping-cart' && this.quantity !== '0';
  }
}
