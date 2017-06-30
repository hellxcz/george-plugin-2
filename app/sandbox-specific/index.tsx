import * as React from 'react';


import { OverviewBoxModel } from './adapter/overviewCard';

import { MenuItemModel } from './adapter/menuItemModel';

import { init } from '../apiClient';

import SmartFilterDetailScreen from '../containers/SmartFilterDetailScreen';

import SmartFilterCard from '../containers/SmartFilterCard';


import {
  getApiUrl,
  getAuthorizationHeader
} from './adapter/georgeAPI';


import { reactMarionetteWrapper } from './adapter/backboneHelpers/reactMarionetteWrapper';
import { render } from './adapter/reactHelpers/index';




export const pluginName = 'plugins.cz-smart-filter';

const foodBoxId = 'cz-smart-filter-overview-food-root';

const withdrawalId = 'cz-smart-filter-overview-withdrawal-root';


// const registerMenuItem = () => {
//
//   george.app.vent.on("accounts:syncedMenuItems", () => {
//
//     const menuItem = new MenuItemModel({
//       id: 'OTHER-' + pluginName,
//       mainItemId: 'OTHER',
//       url: '#' + routeName,
//       icon: 'hand-coins'
//     });
//
//     george.current.menuItems.add(menuItem);
//
//   });
//
// };

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

export default () => {

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

        // registerMenuItem();

        SmartFilterDetailScreen();

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
