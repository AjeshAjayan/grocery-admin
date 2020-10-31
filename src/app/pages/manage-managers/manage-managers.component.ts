import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Manager } from 'src/app/models/manager';
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
    createdDate: Date.now()
  };

  constructor(
    private notificationService: NotificationService,
    private mangerService: MangerService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
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
          toster.toastRef.close();
        }, error => {
          toster.toastRef.close();
          this.notificationService.quickError(3000);
          console.error(error);
        });
    }
  }

  onSubmit() {
    if (this.form.valid) {
      if (this.isUpdate) {
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
        this.mangerService.addManager(this.manager);
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
