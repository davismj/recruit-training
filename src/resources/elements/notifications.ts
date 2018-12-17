import { inject } from 'aurelia-framework';
import { NotificationService } from 'services/notification';

@inject(NotificationService)
export class NotificationsCustomElement {

  constructor(private notifier: NotificationService) { }

  animationend(event) {
    if (event.animationName === 'collapse') {
      event.target.style.display = 'none';
    }
  }
}
