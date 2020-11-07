import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFirestore } from 'angularfire2/firestore';
import { Subscription } from 'rxjs';
import { Manager } from 'src/app/models/manager';
import { Pincode } from 'src/app/models/pincode';
import { MangerService } from 'src/app/services/manger.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-manage-managers',
  templateUrl: './manage-managers.component.html',
  styleUrls: ['./manage-managers.component.scss']
})
export class ManageManagersComponent implements OnInit, OnDestroy {

  @ViewChild('form') form: NgForm;

  subscriptions: Subscription[] = [];

  isUpdate = false;

  manager: Manager = {
    firstname: '',
    lastname: '',
    username: '',
    password: '',
    email: '',
    address: '',
    district: '',
    country: '',
    postal: '',
    state: '',
    contctno1: '',
    contctno2: '',
    isDeleted: false,
    createdDate: Date.now(),
    assignedPincodes: []
  };

  pincodes: Pincode[] = [];
  pincodeStore: Pincode[] = [];
  selectedPincodes: Pincode[] = [];

  constructor(
    private firestore: AngularFirestore,
    private notificationService: NotificationService,
    private mangerService: MangerService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    // get all pincodes
    const toster = this.notificationService.quickLoaderFetch();
    this.subscriptions.push(
      this.firestore.collection('pincodes').snapshotChanges().subscribe(response => {
        this.pincodes = response.map(res => {
          return {...res.payload.doc.data() as Pincode, id: res.payload.doc.id };
        })
        this.pincodeStore = this.pincodes;
        toster.toastRef.close();
      }, error => {
        console.log(error);
        toster.toastRef.close();
        this.notificationService.quickError(3000);
      })
    );

    // check if save or edit
    this.subscriptions.push(
      this.activatedRoute.paramMap.subscribe(param => {
        this.manager.id = param.get('id');
      })
    );
    this.isUpdate = (this.manager.id === '0') ? false : true;

    // if edit get managed by id and load details in form
    if (this.isUpdate) {
      const toster = this.notificationService.quickLoaderFetch();
      this.mangerService.getByID(this.manager.id)
        .subscribe(response => {
          this.manager = { ...response.payload.data() as Manager, id: response.payload.id };
          this.selectedPincodes = this.manager.assignedPincodes;

          toster.toastRef.close();
        }, error => {
          toster.toastRef.close();
          this.notificationService.quickError(3000);
          console.error(error);
        });
    }
  }

  filterPincodes(e) {
    this.pincodes = this.pincodeStore.filter(
      p => p.pincode.toString().match(e)
        || p.place.toLowerCase().match(e)
        || p.district.toLowerCase().match(e)
        || p.state.toLowerCase().match(e)
        || p.country.toLowerCase().match(e)
        || p.city.toLowerCase().match(e)
    );
  }

  customCompare(c1, c2) {
    return c1 && c2 ? c1.id === c2.id : c1 === c2;
  }

  onSubmit() {
    if (this.form.valid) {
      if (this.isUpdate) {
        this.manager.assignedPincodes = this.selectedPincodes;
        const toster = this.notificationService.quickLoaderUpdating();
        this.mangerService.update(this.manager).then(() => {
          toster.toastRef.close();
          this.notificationService.quickUpdated();
          this.router.navigate(['/managers']);
        }).catch(error => {
          toster.toastRef.close();
          this.notificationService.quickError(3000);
          console.error(error);
        })
      }
      else {
        this.mangerService.addManager(this.manager, this.selectedPincodes);
      }
    }
    else {
      this.notificationService.notify('Please fill all mandatory fields', '', 'warning', 5000);
    }
  }

  ngOnDestroy() {
    this.subscriptions.forEach(s => s.unsubscribe());
  }
}
