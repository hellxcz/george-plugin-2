import * as React from 'react';

import SmartFilterDetailScreenContent from '../../containers/SmartFilterDetailScreenContent';
import {
  AppRoutes,
  Controller,
  PluginRouter
} from '../../sandbox-specific/adapter/backboneHelpers/pluginRouter';
import {
  AreaMainLayoutView,
  MenuItem
} from '../../sandbox-specific/areaMainLayout';
import { reactMarionetteWrapper } from '../../sandbox-specific/adapter/backboneHelpers/reactMarionetteWrapper';
import { render } from '../../sandbox-specific/adapter/reactHelpers/index';
import { getId } from '../../sandbox-specific/constants';

export const routeName = 'smartFilter';

const defaultMenuItemId = 'WITHDRAWAL';

const menuItems: MenuItem[] = [
  {
    id: defaultMenuItemId,
    nameKey: "Withdrawal",
    url: `#${routeName}/WITHDRAWAL`,
    icon: "list"
  },
  {
    id: "FOOD",
    nameKey: 'Food',
    url: `#${routeName}/FOOD`,
    icon: "card"
  }
];

const menuItemsLookup: Map<string, MenuItem> = new Map(
  menuItems.map<[string, MenuItem]>(value => [value.id, value])
);

const controller: Controller = {

  show: (category: string) => {

    const layoutView = new AreaMainLayoutView(menuItems);

    layoutView.show();

    let _category = !!category ? category : defaultMenuItemId;

    if (!menuItemsLookup.has(_category.toUpperCase())){
      _category = defaultMenuItemId;
    }

    const contentView = reactMarionetteWrapper(
      getId(`content_${_category}`),
      (rootId) => render(rootId, <SmartFilterDetailScreenContent transactionCategory={_category}/>)
    );

    layoutView.showContent(new contentView(), _category);
  }
};


export default () => {

  const appRoutes: AppRoutes = {};

  appRoutes[routeName] = 'show';
  appRoutes[`${routeName}/:category`] = 'show';


  return new PluginRouter({
    routes: {},
    appRoutes: appRoutes,
    controller: controller
  });

}

