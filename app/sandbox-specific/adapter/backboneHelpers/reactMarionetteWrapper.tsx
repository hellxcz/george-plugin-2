import * as _ from 'underscore';
export const reactMarionetteWrapper = (rootId, _onShow?) => {

  return class extends Marionette.LayoutView<any> {


    getTemplate() {
      return _.template(`<div class="plugin-2" id="${rootId}"></div>`);
    }

    onShow() {

      if (_onShow) {
        _onShow(rootId);
      }

    }

  }
};