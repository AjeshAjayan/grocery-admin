import { Component, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AngularFirestore } from 'angularfire2/firestore';
import { Subscription } from 'rxjs';
import { Pincode } from 'src/app/models/pincode';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-pincode-dialog',
  templateUrl: './pincode-dialog.component.html',
  styleUrls: ['./pincode-dialog.component.scss']
})
export class PincodeDialogComponent implements OnInit, OnDestroy {

  @ViewChild('form') form: NgForm;

  subscriptions: Subscription[] = [];

  pincodeModel: Pincode = {
    city: '',
    country: '',
    district: '',
    pincode: '',
    state: '',
    place: ''
  }

  constructor(
    private notificationService: NotificationService,
    private firestore: AngularFirestore,
    private dialogRef: MatDialogRef<PincodeDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Pincode
  ) { }

  ngOnInit(): void {
    // check if edit or save
    if (this.data && this.data.id) {
      this.pincodeModel = this.data;
    }
  }

  async onSave() {
    if (this.form.valid) {
      const toster = this.notificationService.quickLoaderSaveing();
      try {
        if(this.pincodeModel.id) { // update
          await this.firestore.collection('pincodes').doc(this.pincodeModel.id)
            .set(this.pincodeModel, {merge: true});
        } else { // save
          await this.firestore.collection('pincodes').add(this.pincodeModel);
        }
        toster.toastRef.close();
        this.notificationService.quickSaved();
        this.form.reset();
      } catch (e) {
        console.log(e);
        toster.toastRef.close();
        this.notificationService.quickError(3000);
      }
    }
    else {
      this.notificationService.notify('All fields are mandatory', '', 'warning', 5000);
    }
  }

  ngOnDestroy() {
    this.subscriptions.map(s => s.unsubscribe());
  }
}
