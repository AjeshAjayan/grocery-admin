import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-manage-managers',
  templateUrl: './manage-managers.component.html',
  styleUrls: ['./manage-managers.component.scss']
})
export class ManageManagersComponent implements OnInit {

  @ViewChild('form') form: NgForm; 

  manager = {
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
    contctno1: ''
  };

  constructor(private notificationService: NotificationService) { }

  ngOnInit(): void {
    // TODO : check if save or edit
    // TODO : if edit get managed by id and load details in form
  }

  onSubmit() {
    if(this.form.valid) {
      // TODO: save
      const toster = this.notificationService.notify('Saving...', '', 'info');
      // toster.toastRef.close();
    }
    else {
      this.notificationService.notify('Please fill all mandatory fields', '', 'warning', 5000);
    }
  }

}
