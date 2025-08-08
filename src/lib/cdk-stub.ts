// Mock/stub for @inform-elevate/elevate-cdk
// This allows development server to work without requiring CDK authentication

export class DependencyContainer {
  constructor() {}
  register(token: any, factory: any): void {}
  resolve(token: any): any {
    return {};
  }
}

export class EventSubscription {
  constructor() {}
  unsubscribe(): void {}
}

export class Subject {
  constructor() {}
  subscribe(callback: any): EventSubscription {
    return new EventSubscription();
  }
  next(value: any): void {}
}

export class Subscriptions {
  constructor() {}
  add(subscription: any): void {}
  unsubscribe(): void {}
}

// Export as default for convenience
export default {
  DependencyContainer,
  EventSubscription,
  Subject,
  Subscriptions
};