import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Manager } from 'src/app/models/manager';
import { MangerService } from 'src/app/services/manger.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-manage-managers',
  templateUrl: './manage-managers.component.html',
  styleUrls: ['./manage-managers.component.scss']
})
export class ManageManagersComponent implements OnInit {

  @ViewChild('form') form: NgForm; 

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
    private router: Router
  ) { }

  ngOnInit(): void {
    // TODO : check if save or edit
    // TODO : if edit get managed by id and load details in form
  }

  onSubmit() {
    if(this.form.valid) {
      const toster = this.notificationService.notify('Saving...', '', 'info');
      this.mangerService.addManager(this.manager).then(() => {
        toster.toastRef.close();
        this.notificationService.notify('Success', 'Saved', 'success', 3000);
        this.router.navigate(['/managers'])
      })
      .catch(() => {
        this.notificationService.notify('Oops something went wrong', 'Error', 'error', 3000);
      })
    }
    else {
      this.notificationService.notify('Please fill all mandatory fields', '', 'warning', 5000);
    }
  }

}
