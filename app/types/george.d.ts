export = George;
export as namespace george;

declare module George {
  export interface TestApp {

  }

  export interface Define {
    define: (app: TestApp) => void;
  }

  export interface App {

    vent: any;

    module: (name: String, define: Define) => void;

    addInitializer(cb: () => void): void;

    baseViews: any;

    defaultRouteHandler: any;

    mainContainer: any;
  }

  export interface Current {

    token: string;

    overviewBoxes: any;

    frontendConfig: any;

    menuItems: any;
  }

  export interface Config {

    georgeApiUrl: string;
  }

  export interface George {
    app: App;
    stats: any;
    config: Config;
    current: Current;


  }
}

declare global {

  const george: George.George;

}