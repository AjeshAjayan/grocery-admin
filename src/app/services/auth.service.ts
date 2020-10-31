import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private angularFireAuth: AngularFireAuth,) { }

  async authState() {
    return await this.angularFireAuth.authState;
  }

  async signIn() {
    const provider = new auth.GoogleAuthProvider();
    const credentials = await this.angularFireAuth.auth.signInWithPopup(provider);
    console.log(credentials.user);
  }
}
