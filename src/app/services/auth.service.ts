import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private angularFireAuth: AngularFireAuth,) { }

  authState() {
    this.angularFireAuth.authState.subscribe(response => {
      
    }, error => {

    });
  }

  async signIn() {
    const provider = new auth.GoogleAuthProvider();
    const credentials = await this.angularFireAuth.auth.signInWithPopup(provider);
    console.log(credentials.user);
  }
}
