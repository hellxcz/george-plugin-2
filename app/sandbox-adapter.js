import {OverviewBoxModel} from './sandbox-specific/adapter/overviewCard';

import AppBootstrap from './appBootstrap'

const startApp = (elementId) => {

  AppBootstrap(elementId);
};



console.log('hello from sandbox-adapter');

const pluginName = 'plugins.cz-smart-filter';

const overviewCardRootId = 'cz-smart-filter-overview-root';

var OverviewCardTemplate = `

<div class="overview-block box-saveable box-bottom-btn box-groupable box-canbegrouped box-canbemain box-size-md ui-widget ui-helper-clearfix" data-position="3">
    <div class="displaycard smallbox topbar COLOR_8-bar">

      <div class="innerCard"><div class="displayinner nameblock showNegative">
        <div class="clearfix showNegative">
          <div id="nameblockInner">
            <div class="label-sm truncate">some name</div>

            </div>
          </div>
        </div>

        <div class="paddedcontainer summarycontainer box-visible-md box-visible-lg">
            <div id="` + overviewCardRootId + `"></div>
        </div>
        <div class="displayinner bottomButton box-visible-md box-visible-lg">
          <a class="nobubble btn btn-block btn-lg btn-light actionBtn">
              Card details
          </a>
        </div>
      </div>

    </div>
</div>

`;

var OverviewCard = Marionette.LayoutView.extend({

    initialize: function(){

    },

    getTemplate: function () {
        return _.template(OverviewCardTemplate);
    },
    templateHelpers: function () {
        return {};
    },
    /**
     * Init Currently selected pattern and carousel
     */
    onShow: function () {

      console.log('hello from overViewCard');

      startApp(overviewCardRootId);

    },
    onDestroy: function () {

    }

});

george.app.module(pluginName, {
    define: function (testApp) {

        this.addInitializer(function () {

            // var mainView = new MainView();
            // george.current.overviewBoxes.add(mainView);

            var newBox = new OverviewBoxModel({
                id: "FIO",
                type: "FIO",
                name: "FIO",
                position: 2,
                column: 3
            });

            newBox.displayView = OverviewCard;
            george.current.overviewBoxes.add(newBox);

        });

        this.onPluginActivation = function () {
            // var mainView = new MainView();
            // george.current.overviewBoxes.add(mainView);

        };

        this.onPluginDeactivation = function () {

        };

    },

});
