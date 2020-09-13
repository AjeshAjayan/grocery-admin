import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private toastrService: ToastrService) { }

  notify(
    title: string,
    content: string,
    type: 'success' | 'info' | 'error' | 'warning',
    time?: number
  ) {
    if (time && time > 0) {
      const toster = this.toastrService[type](content, title);
      setTimeout(() => {
        toster.toastRef.close();
      }, time)
    }
    else {
      const toster = this.toastrService.success(content, title);
      return toster
    }
  }

  loader(title: string, content: string) {
    const toster = this.toastrService.info(content, title);
    return toster;
  }

  quickLoaderFetch() {
    const toster = this.toastrService.info('', 'Fetching...');
    return toster;
  }
  quickError(time: number) {
    const toster = this.toastrService.error('Oops something went wrong', 'Error');
      setTimeout(() => {
        toster.toastRef.close();
      }, time)
  }

  quickLoaderSaveing() {
    const toster = this.toastrService.info('', 'Saving...');
    return toster;
  }

  quickLoaderDeleting() {
    const toster = this.toastrService.info('', 'Deleting...');
    return toster;
  }

  quickLoaderUpdating() {
    const toster = this.toastrService.info('', 'Updating...');
    return toster;
  }

  quickSaved() {
    this.notify('Success', 'Saved', 'success', 3000);
  }

  quickDeleted() {
    this.notify('Success', 'Deleted', 'success', 3000);
  }

  quickUpdated() {
    this.notify('Success', 'Updated', 'success', 3000);
  }
}
