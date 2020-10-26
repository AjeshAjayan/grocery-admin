import { Component } from "@angular/core";
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  title = "black-dashboard-angular";

  constructor(private angularFireAuth: AngularFireAuth) {
    this.angularFireAuth.authState.subscribe(this.firebaseAuthChangeListener);
  }

  private firebaseAuthChangeListener(response) {
    // if needed, do a redirect in here
    if (response) {
      console.log('Logged in :)');
    } else {
      console.log('Logged out :(');
    }
  }

  // ui = new firebaseui.auth.AuthUI(firebase.auth());
}
