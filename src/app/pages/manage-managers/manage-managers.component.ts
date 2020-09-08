import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-manage-managers',
  templateUrl: './manage-managers.component.html',
  styleUrls: ['./manage-managers.component.scss']
})
export class ManageManagersComponent implements OnInit {

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
    state: ''
  };

  constructor() { }

  ngOnInit(): void {
    // TODO : check if save or edit
    // TODO : if edit get managed by id and load details in form
  }

  onSubmit() {
    // TODO: save
  }

}
