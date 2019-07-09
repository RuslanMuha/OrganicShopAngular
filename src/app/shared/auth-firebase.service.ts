import {Injectable} from '@angular/core';
import {AuthService, User} from './auth-service';
import {AngularFireAuth} from '@angular/fire/auth';
import * as firebase from 'firebase/app';
import {AngularFirestore} from '@angular/fire/firestore';
import {Router} from '@angular/router';

interface Administrators {
  uid: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthFirebaseService implements AuthService {
  user: firebase.User;
  administrators: Administrators[];

  constructor(private afAuth: AngularFireAuth, private fireStore: AngularFirestore) {
    fireStore.collection<Administrators>('administrators').valueChanges().subscribe(admins => {
      this.administrators = admins;
    });
    afAuth.authState.subscribe(user => {
      this.user = user;
    });
  }

  getUser(): User {
    if (!this.user) {
      return undefined;
    }
    return {email: this.user.email, displayName: this.user.displayName, uid: this.user.uid} as User;
  }

  isAdmin(): boolean {
    if (!this.isAuth()) {
      return false;
    }
    return !!this.administrators.find(admin => admin.uid === this.user.uid);
  }

  isAuth(): boolean {
    return !!this.user;

  }

  login(loginMethod: string): Promise<any> {
    if (loginMethod === 'google') {
     return  this.loginWithGoogle();
    }
    if (loginMethod === 'facebook') {
     return  this.loginWithFacebook();
    }
    if (loginMethod === 'github') {
     return  this.loginWithGitHub();
    }
  }

  logout() {
    this.afAuth.auth.signOut().then();
  }

  private loginWithGoogle(): Promise<any> {

   return  this.afAuth.auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider());
  }

  private loginWithFacebook(): Promise<any> {
    return this.afAuth.auth.signInWithRedirect(new firebase.auth.FacebookAuthProvider());
  }

  private loginWithGitHub(): Promise<any> {
    return this.afAuth.auth.signInWithRedirect(new firebase.auth.GithubAuthProvider());

  }
}
