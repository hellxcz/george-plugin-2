import React from 'react';
import ReactDOM from 'react-dom';

import {OverviewBoxModel} from './sandbox-specific/adapter/overviewCard';

import {MenuItemModel} from './sandbox-specific/adapter/menuItemModel';

import {init} from './apiClient';

import CategoryTransactionsCard from './containers/CategoryTransactionsCard';

import {getApiUrl, getAuthorizationHeader} from './sandbox-specific/adapter/georgeAPI';


const render = (elementId, card) => {

  ReactDOM.render(
    card,
    document.getElementById(elementId)
  );

};

const pluginName = 'plugins.cz-smart-filter';

const routeName = 'smartFilter';

const foodBoxId = 'cz-smart-filter-overview-food-root';

const withdrawalId = 'cz-smart-filter-overview-withdrawal-root';

const reactMarionetteWrapper = (rootId, onShow) => {
  return Marionette.LayoutView.extend({

    initialize: function() {

    },

    getTemplate: function() {
      return _.template(`<div id="${rootId}"></div>`);
    },
    templateHelpers: function() {
      return {};
    },
    /**
     * Init Currently selected pattern and carousel
     */
    onShow: function() {

      if (onShow) {
        onShow(rootId);
      }

    },
    onDestroy: function() {

    }

  });
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
    (rootId) => render(rootId, <CategoryTransactionsCard transactionCategory="FOOD"/>)
  );

  withdrawalBox.displayView = reactMarionetteWrapper(
    withdrawalId,
    (rootId) => render(rootId, <CategoryTransactionsCard transactionCategory="WITHDRAWAL"/>)
  );

  george.current.overviewBoxes.add(foodBox);
  george.current.overviewBoxes.add(withdrawalBox);

};

george.app.module(pluginName, {
  define: function(testApp) {

    this.addInitializer((opts) => {

      init(
        getApiUrl(),
        {
          Authorization: getAuthorizationHeader()
        }
      );


      addOverviewBoxes();

      registerMenuItem();


      const router = Marionette.AppRouter.extend({
        appRoutes: {
          'smartFilter' : "show"
        },
        onRoute  : george.app.defaultRouteHandler
      });

      const LayoutView = george.app.baseViews.areaMainLayoutBase.extend({
      // const LayoutView = Marionette.LayoutView.extend({
        initialize: () => {
          //Calling Base Initialize
          george.app.baseViews.areaMainLayoutBase.prototype.initialize.call(this);
        }
      });

      new router({
        controller : {

          show : () => {

            const layoutView = new LayoutView();

            george.app.mainContainer.show(layoutView);

            const DummyView = reactMarionetteWrapper('idddd');

            layoutView.showContent(new DummyView());

          }

        }
      })

    });

    this.onPluginActivation = () => {

      console.log('plugin activation');

    };

    this.onPluginDeactivation = () => {
      console.log('plugin de-activation');

    };

  },

});
