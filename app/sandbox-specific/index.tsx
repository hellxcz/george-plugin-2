import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { OverviewBoxModel } from './adapter/overviewCard';

import { MenuItemModel } from './adapter/menuItemModel';

import { init } from '../apiClient';

import SmartFilterCard from '../containers/SmartFilterCard';
import SmartFilterDetailScreen from '../containers/SmartFilterDetailScreen';

import {
  getApiUrl,
  getAuthorizationHeader
} from './adapter/georgeAPI';
import * as _ from "underscore";


const render = (elementId, reactElement) => {

  ReactDOM.render(
    reactElement,
    document.getElementById(elementId)
  );

};

const pluginName = 'plugins.cz-smart-filter';

const routeName = 'smartFilter';

const foodBoxId = 'cz-smart-filter-overview-food-root';

const withdrawalId = 'cz-smart-filter-overview-withdrawal-root';

const reactMarionetteWrapper = (rootId, _onShow?) => {

  return class extends Marionette.LayoutView<any> {


    getTemplate() {
      return _.template(`<div id="${rootId}"></div>`);
    }

    onShow() {

      if (_onShow) {
        _onShow(rootId);
      }

    }

  }
};

const registerMenuItem = () => {

  george.app.vent.on("accounts:syncedMenuItems", () => {

    const menuItem = new MenuItemModel({
      id: 'OTHER-' + pluginName,
      mainItemId: 'OTHER',
      url: '#' + routeName,
      icon: 'hand-coins'
    });

    george.current.menuItems.add(menuItem);

  });

};

const addOverviewBoxes = () => {

  const foodBox = new OverviewBoxModel({
    id: foodBoxId,
    type: "plugin2",
    name: "plugin2",
    // position: 2,
    // column: 3
  });

  const withdrawalBox = new OverviewBoxModel({
    id: withdrawalId,
    type: "plugin2",
    name: "plugin2"
  });

  foodBox.displayView = reactMarionetteWrapper(
    foodBoxId,
    (rootId) => render(rootId, <SmartFilterCard transactionCategory="FOOD"/>)
  );

  withdrawalBox.displayView = reactMarionetteWrapper(
    withdrawalId,
    (rootId) => render(rootId, <SmartFilterCard transactionCategory="WITHDRAWAL"/>)
  );

  george.current.overviewBoxes.add(foodBox);
  george.current.overviewBoxes.add(withdrawalBox);

};

class PluginRouter extends Marionette.AppRouter {
  onRoute(routeName, routePath, routeArgs) {
    george.app.defaultRouteHandler(routeName, routePath, routeArgs);
  }
}

export const bootstrap = () => {

  george.app.module(pluginName, {
    define: function (testApp) {

      this.addInitializer((opts) => {

        init(
          getApiUrl(),
          {
            Authorization: getAuthorizationHeader()
          }
        );


        addOverviewBoxes();

        registerMenuItem();

        const LayoutView = george.app.baseViews.areaMainLayoutBase.extend({
          initialize: () => {
            //Calling Base Initialize
            george.app.baseViews.areaMainLayoutBase.prototype.initialize.call(this);
          }
        });

        new PluginRouter({
          routes: {},
          appRoutes: {
            'smartFilter':'show',
            'smartFilter/:category': 'show',

          },
          controller: {

            show: (category: string) => {

              const layoutView = new LayoutView();

              george.app.mainContainer.show(layoutView);

              const _category = !!category ? category : 'WITHDRAWAL';

              const dummyView = reactMarionetteWrapper(
                'idddd',
                (rootId) => render(rootId, <SmartFilterDetailScreen transactionCategory={_category}/>)
              );

              layoutView.showContent(new dummyView());

            }

          }
        });

      });

      this.onPluginActivation = () => {

        console.log('plugin activation');

      };

      this.onPluginDeactivation = () => {
        console.log('plugin de-activation');

      };

    },

  })
};
