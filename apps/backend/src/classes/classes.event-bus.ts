class EventBus {
  private eventObject: object = {};

  publish(eventName: string, data?: any) {
    const callbackList = this.eventObject[eventName];

    if (!callbackList) return console.warn(eventName + ' not found!');

    if(typeof data === 'object'){
      data = JSON.stringify(data);
    }

    for (let callback of callbackList) {
      callback(data);
    }
  }
  subscribe(eventName: string, callback: (data: string) => void) {
    if (!this.eventObject[eventName]) {
      this.eventObject[eventName] = [];
    }

    this.eventObject[eventName].push(callback);
  }
}

export const eventBus = new EventBus();
