import {Injectable} from '@angular/core';
import {AuthService, User} from './auth-service';
import {AngularFireAuth} from '@angular/fire/auth';
import * as firebase from 'firebase/app';
import {AngularFirestore} from '@angular/fire/firestore';

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

  login(loginMethod: string) {
    if (loginMethod === 'google') {
      this.loginWithGoogle();
    }
    if (loginMethod === 'facebook') {
      this.loginWithFacebook();
    }
    if (loginMethod === 'github') {
      this.loginWithGitHub();
    }
  }

  logout() {
    this.afAuth.auth.signOut().then();
  }

  private loginWithGoogle() {

    this.afAuth.auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider()).catch(error => console.log(error));
  }

  private loginWithFacebook() {
    this.afAuth.auth.signInWithRedirect(new firebase.auth.FacebookAuthProvider()).catch(error => console.log(error));
  }

  private loginWithGitHub() {
    this.afAuth.auth.signInWithRedirect(new firebase.auth.GithubAuthProvider()).catch(error => console.log(error));

  }
}
