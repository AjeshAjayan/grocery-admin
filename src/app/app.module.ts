import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { RouterModule } from "@angular/router";
import { ToastrModule } from 'ngx-toastr';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
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
    AngularFireModule,
    AngularFirestoreModule,
    ToastrModule.forRoot({
      autoDismiss: false,
      disableTimeOut: true,
      positionClass: 'toast-top-center',
      preventDuplicates: true,
    })
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
    ManageManagersComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
