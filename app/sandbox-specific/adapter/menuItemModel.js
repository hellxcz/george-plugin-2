export const MenuItemModel = Backbone.Model.extend({

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
  },

  /**
   * @property defaults
   */
  defaults: {
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
    promoted: false
  },
});
