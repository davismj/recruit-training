import { INotification, NotificationType, Notification } from 'models/notification';

export class NotificationService {

  notifications: Array<Notification> = [];

  public notify({ message, type }: INotification) {
    this.notifications.push(new Notification({ message, type: type || NotificationType.Info }));
  }
}
