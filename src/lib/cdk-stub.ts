// Mock/stub for @inform-elevate/elevate-cdk
// This allows development server to work without requiring CDK authentication

export class InjectionToken {
  constructor(public description?: string) {}
  toString(): string {
    return `InjectionToken(${this.description})`;
  }
}

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

export class BehaviorSubject extends Subject {
  constructor(private value: any) {
    super();
  }
  
  next(newValue: any): void {
    this.value = newValue;
  }
  
  getValue(): any {
    return this.value;
  }
}

// Add with British spelling variant
export const BehaviourSubject = BehaviorSubject;

export class Subscriptions {
  constructor() {}
  add(subscription: any): void {}
  unsubscribe(): void {}
}

// Additional common CDK exports
export const inject = (token: any) => ({});
export const Injectable = (config?: any) => (target: any) => target;
export const Component = (config?: any) => (target: any) => target;

// Web component decorator stub
export const webComponent = (config?: any) => (target: any) => {
  if (config?.tag) {
    customElements.define(config.tag, target);
  }
  return target;
};

// Color utility stub
export class RgbColor {
  constructor(public r: number = 0, public g: number = 0, public b: number = 0) {}
  
  toString(): string {
    return `rgb(${this.r}, ${this.g}, ${this.b})`;
  }
  
  static fromHex(hex: string): RgbColor {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? new RgbColor(
      parseInt(result[1], 16),
      parseInt(result[2], 16),
      parseInt(result[3], 16)
    ) : new RgbColor();
  }
}

// Utility functions
export const delay = (ms: number): Promise<void> => new Promise(resolve => setTimeout(resolve, ms));

export const debounce = (func: Function, delay: number) => {
  let timeoutId: NodeJS.Timeout;
  return (...args: any[]) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(null, args), delay);
  };
};

export const throttle = (func: Function, limit: number) => {
  let inThrottle: boolean;
  return (...args: any[]) => {
    if (!inThrottle) {
      func.apply(null, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
};

// Export as default for convenience
export default {
  InjectionToken,
  DependencyContainer,
  EventSubscription,
  Subject,
  BehaviorSubject,
  BehaviourSubject,
  Subscriptions,
  inject,
  Injectable,
  Component,
  webComponent,
  RgbColor,
  delay,
  debounce,
  throttle
};