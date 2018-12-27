export enum NotificationType {
  Info = 'info',
  Success = 'success',
  Error = 'error'
}

export interface INotification {
  message: string;
  type?: NotificationType | string;
}

export class Notification implements INotification {

  message: string;
  type: NotificationType;

  isUnread = true;

  constructor(notification: INotification) {
    Object.assign(this, notification);
  }

  read() {
    this.isUnread = false;
  }
}
