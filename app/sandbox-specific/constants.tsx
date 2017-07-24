export const pluginName = 'plugins.cz-smart-filter';

const idStub = 'cz-smart-filter-';

export const getId = (input:string) => {
  return idStub + input;
};

export const foodBoxId = getId('overview-food-root');
export const withdrawalId = getId('overview-withdrawal-root');