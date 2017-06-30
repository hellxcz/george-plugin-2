import * as React from 'react';

import SmartFilterDetailScreenContent from '../../containers/SmartFilterDetailScreenContent';
import {
  PluginRouter,
  AppRoutes,
  Controller
} from '../../sandbox-specific/adapter/backboneHelpers/pluginRouter';
import {
  AreaMainLayoutView,
  MenuItem
} from '../../sandbox-specific/areaMainLayout';
import { reactMarionetteWrapper } from '../../sandbox-specific/adapter/backboneHelpers/reactMarionetteWrapper';
import { render } from '../../sandbox-specific/adapter/reactHelpers/index';

export const routeName = 'smartFilter';

const controller: Controller = {
  show: (category: string) => {

    const menuItems : MenuItem[] = [
      {
        id: "WITHDRAWAL",
        nameKey: "Withdrawal",
        url: `#${routeName}/WITHDRAWAL`,
        icon: "list"
      },
      {
        id: "functions",
        nameKey: 'Food',
        url: `#${routeName}/FOOD`,
        icon: "card"
      }
    ];

    const layoutView = new AreaMainLayoutView(menuItems);

    layoutView.show();

    const _category = !!category ? category : 'WITHDRAWAL';

    const contentView = reactMarionetteWrapper(
      `content_${_category}`,
      (rootId) => render(rootId, <SmartFilterDetailScreenContent transactionCategory={_category}/>)
    );

    layoutView.showContent(new contentView());
  }
};

export default () => {

  const appRoutes : AppRoutes = {};

  appRoutes[routeName] = 'show';
  appRoutes[`${routeName}/:category`] = 'show';

  return new PluginRouter({
    routes: {},
    appRoutes: appRoutes,
    controller: controller
  });

}

