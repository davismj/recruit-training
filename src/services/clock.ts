import { inject } from 'aurelia-framework';

const UPDATE = (fn) => setTimeout(fn, 100);

export class ClockService {

  clock: Date;

  constructor() {
    this.updateClockRecursive();
  }

  updateClockRecursive() {
    const updateClock = () => {
      this.clock = new Date(Date.now());
      UPDATE(updateClock);
    }
    updateClock();
  }
}
