class EmotionObserver {
    constructor() {
      this.subscribers = [];
    }
  
    subscribe(callback) {
      this.subscribers.push(callback);
    }
  
    unsubscribe(callback) {
      this.subscribers = this.subscribers.filter(sub => sub !== callback);
    }
  
    notify(emotions) {
      this.subscribers.forEach(callback => callback(emotions));
    }
  }
  
  const emotionObserver = new EmotionObserver();
  export default emotionObserver;
  