import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { RouterModule } from "@angular/router";
import { ToastrModule } from 'ngx-toastr';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from '../environments/environment';
import { AppComponent } from "./app.component";
import { AdminLayoutComponent } from "./layouts/admin-layout/admin-layout.component";

import { NgbModule } from "@ng-bootstrap/ng-bootstrap";

import { AppRoutingModule } from "./app-routing.module";
import { ComponentsModule } from "./components/components.module";
import { AddLocationComponent } from './pages/add-location/add-location.component';
import { AddCatagoryComponent } from './pages/add-catagory/add-catagory.component';
import { SetMarginComponent } from './pages/set-margin/set-margin.component';
import { DeliverySlotsComponent } from './pages/delivery-slots/delivery-slots.component';
import { ComplaintsComponent } from './pages/complaints/complaints.component';
import { ShopsComponent } from './pages/shops/shops.component';
import { ManagesComponent } from './pages/manages/manages.component';
import { ManageManagersComponent } from './pages/manage-managers/manage-managers.component';
import { CommonModule } from '@angular/common';

import {FirebaseUIModule, firebase, firebaseui} from 'firebaseui-angular';
import { AngularFireAuthModule } from '@angular/fire/auth';

const firebaseUiAuthConfig: firebaseui.auth.Config = {
  signInFlow: 'popup',
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    {
      scopes: [
        'public_profile',
        'email',
        'user_likes',
        'user_friends'
      ],
      customParameters: {
        'auth_type': 'reauthenticate'
      },
      provider: firebase.auth.FacebookAuthProvider.PROVIDER_ID
    },
    firebase.auth.TwitterAuthProvider.PROVIDER_ID,
    firebase.auth.GithubAuthProvider.PROVIDER_ID,
    {
      requireDisplayName: false,
      provider: firebase.auth.EmailAuthProvider.PROVIDER_ID
    },
    firebase.auth.PhoneAuthProvider.PROVIDER_ID,
    firebaseui.auth.AnonymousAuthProvider.PROVIDER_ID
  ],
  tosUrl: '<your-tos-link>',
  privacyPolicyUrl: '<your-privacyPolicyUrl-link>',
  credentialHelper: firebaseui.auth.CredentialHelper.ACCOUNT_CHOOSER_COM
};


@NgModule({
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ComponentsModule,
    NgbModule,
    RouterModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    ToastrModule.forRoot({
      autoDismiss: false,
      disableTimeOut: true,
      positionClass: 'toast-top-center',
      preventDuplicates: true,
    }),
    FirebaseUIModule.forRoot(firebaseUiAuthConfig),
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    AddLocationComponent,
    AddCatagoryComponent,
    SetMarginComponent,
    DeliverySlotsComponent,
    ComplaintsComponent,
    ShopsComponent,
    ManagesComponent,
    ManageManagersComponent,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
