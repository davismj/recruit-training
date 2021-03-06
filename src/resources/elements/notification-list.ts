import { inject } from 'aurelia-framework';
import { Notification } from 'models/notification';
import { NotificationService } from 'services/notification';

@inject(NotificationService)
export class NotificationListCustomElement {

  private isOpen = false;

  constructor(
    private notifier: NotificationService) { }

  toggle() {
    this.isOpen ? this.close() : this.open();
  }

  open() {
    this.isOpen = true;
  }

  close() {
    this.isOpen = false;
    this.notifier.notifications.forEach((notification) => notification.read());
  }

  get unreadNotifications() {
    return this.notifier.notifications.filter((n) => n.isUnread);
  }
}

export class UnreadFirstValueConverter {
  toView(notifications: Notification[]) {
    return notifications
      .slice()
      .sort((notification) => notification.isUnread ? -1 : 1);
  }
}
