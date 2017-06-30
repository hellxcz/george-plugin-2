export interface AppRoutes {
  [s: string]: string
}

export interface Controller {


}

export interface PluginRouterOptions extends Marionette.AppRouterOptions{
  appRoutes: AppRoutes;
  controller: Controller;
}

export class PluginRouter extends Marionette.AppRouter {
  constructor(options?: PluginRouterOptions){
    super(options);
  }

  onRoute(routeName, routePath, routeArgs) {
    george.app.defaultRouteHandler(routeName, routePath, routeArgs);
  }
}