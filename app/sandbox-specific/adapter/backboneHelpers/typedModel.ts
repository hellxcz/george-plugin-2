// import * as Backbone from 'backbone';

export abstract class TypedModel<T> extends Backbone.Model {
  constructor(attributes?: T, options?: any) {
    super(attributes, options);

    const defaults = this.defaults();
    for (const key in defaults) {
      const value = defaults[key];

      ((k: any) => {
        Object.defineProperty(this, k, {
          get: (): typeof value => {
            return this.get(k);
          },
          set: (value: any) => {
            this.set(k, value);
          },
          enumerable: true,
          configurable: true
        });
      })(key);
    }
  }

  abstract defaults(): T;
}