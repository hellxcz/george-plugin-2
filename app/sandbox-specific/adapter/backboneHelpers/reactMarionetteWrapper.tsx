import * as _ from 'underscore';
export const reactMarionetteWrapper = (rootId, _onShow?) => {

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