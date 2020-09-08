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
    const toster = this.toastrService.success(content, title);
    return toster;
  }
}
