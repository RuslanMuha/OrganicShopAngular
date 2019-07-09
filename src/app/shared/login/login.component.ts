import {Component, OnInit} from '@angular/core';
import {AuthService} from '../auth-service';
import {Router} from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) {
  }

  ngOnInit() {
  }

  loginWithGoogle() {
    this.authService.login('google').then();
    // if (this.authService.isAuth()) {
    //   this.router.navigate(['user/home']).then();
    // }

  }

  loginWithFacebook() {
    this.authService.login('facebook').then();
  }

  loginWithGitHub() {
    this.authService.login('github').then();
  }

}
