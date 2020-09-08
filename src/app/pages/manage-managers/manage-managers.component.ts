import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

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

  constructor() { }

  ngOnInit(): void {
    // TODO : check if save or edit
    // TODO : if edit get managed by id and load details in form
  }

  onSubmit() {
    if(this.form.valid) {
      // TODO: save
    }
    else {
      // TODO: show errors
    }
  }

}
