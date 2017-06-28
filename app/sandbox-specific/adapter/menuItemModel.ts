import { TypedModel } from './backboneHelpers/typedModel';


export interface IMenuItemModel {
  id: string;
  mainItemId: string;
  subItemId?: string;
  name?: string;
  link?: string;
  productName?: string;
  balance?: number;
  iconString?: string;
  extraHtml?: string;
  smallsubline?: string;
  loadingExternal?: boolean;
  promoted?: boolean;
  url: string;
  icon: string;

}

export class MenuItemModel extends TypedModel<IMenuItemModel> {
  defaults(): IMenuItemModel {
    return {
      id: "",
      mainItemId: "",
      subItemId: "",
      name: "",
      link: "",
      productName: "",
      balance: null,
      iconString: "",
      extraHtml: "",
      smallsubline: "",
      loadingExternal: false,
      promoted: false,
      url: '',
      icon: ''
    };
  }

  /**
   * @property STATE_WEIGHTS
   * @constant
   */
  STATE_WEIGHTS: {
    EMBOSSING: 10,
    INACTIVE: 15,
    ACTIVE: 20,
    TEMPORARY_BLOCKED: 25,
    LOCKED: 30,
    CLOSED: 40
  };
}
