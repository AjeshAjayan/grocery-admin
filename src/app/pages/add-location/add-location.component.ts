import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AngularFirestore } from 'angularfire2/firestore';
import { Subscription } from 'rxjs';
import { Pincode } from 'src/app/models/pincode';
import { NotificationService } from 'src/app/services/notification.service';
import { PincodeDialogComponent } from './pincode-dialog/pincode-dialog.component';


@Component({
  selector: 'app-add-location',
  templateUrl: './add-location.component.html',
  styleUrls: ['./add-location.component.scss']
})
export class AddLocationComponent implements OnInit, OnDestroy {

  pincodes: Pincode[] = [];

  subscribtions: Subscription[] = [];

  constructor(
    private firestore: AngularFirestore,
    private dailog: MatDialog,
    private notificationService: NotificationService
  ) { }

  ngOnInit(): void {
    this.subscribtions.push(
      this.firestore.collection('pincodes').snapshotChanges().subscribe(response => {
        this.pincodes = response.map(res => {
          return { ...res.payload.doc.data() as Pincode, id: res.payload.doc.id }
        })
      }, error => {

      })
    )
  }

  getAllPincodes() {

  }

  openDialog(pincode?: Pincode) {
    const dialogRef = this.dailog.open(PincodeDialogComponent, {
      width: '600px',
      data: pincode
    });
  }

  async onDelete(id: string) {
    const isConfirmed = confirm('Do you want to delete?');
    if (isConfirmed) {
      const toster = this.notificationService.quickLoaderDeleting();
      try {
        await this.firestore.collection('pincodes').doc(id).delete();
        toster.toastRef.close();
        this.notificationService.quickDeleted();
      } catch (e) {
        console.log(e);
        toster.toastRef.close();
        this.notificationService.quickError(3000);
      }
    }
  }

  ngOnDestroy() {
    this.subscribtions.map(s => s.unsubscribe());
  }
}
