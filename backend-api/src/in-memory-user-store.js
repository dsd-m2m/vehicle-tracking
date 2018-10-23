class InMemoryUserStore {
    constructor() {
      this.users = [];
    }
  
    push(user) {
      this.users.push(user);
    }
  
    get(userId) {
      return this.users.find(u => u.id === userId);
    }
  }

  module.exports = InMemoryUserStore;