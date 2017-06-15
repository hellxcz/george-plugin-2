// import backbone from 'backbone';
// import _ from 'underscore';


export const OverviewBoxModel = Backbone.Model.extend({
        defaults: {
            position: 9999,
            column: 9999,
            size: "md",
            temporary: false,
            name: '',
            expanded: true //in case of table overview and group type
        },


        /**
         * @method constructor
         * @constructor
         */
        constructor: function OverviewBoxModel() {
            Backbone.Model.prototype.constructor.apply(this, arguments);
            this.loadBoxSettings();
        },
        /**
         * Find all subboxes if this is a group
         */
        findGroupedBoxes: function () {
            var self = this;
            return george.current.overviewBoxes.select(function (box) {
                return box.get("group") && box.get("group").groupId === self.get("id");
            });
        },
        addToGroup: function(groupId,groupPosition,groupColumn) {
            this.set("group",{groupId:groupId});
            this.set("position",groupPosition);
            this.set("column",groupColumn);

            george.stats.trackEvent("overview", "group_addToGroup", this.get("type")); // Add Box to Group. Attr1: Type of Box that is added
        },
        /**
         * Removes a box from the group
         */
        removeFromGroup: function() {
            this.unset("group");
        },
        /**
         * Closes a group so it removes all boxes from the group and also removes itself from global boxes collection
         */
        closeGroup: function() {
            if (this.get("groupedBoxes") && this.get("groupedBoxes").length>0) {
                var grBoxes = this.get("groupedBoxes");
                grBoxes.each(function(currBox) {
                    var selBox = george.current.overviewBoxes.get(currBox.get("id"));
                    if (selBox) {
                        selBox.removeFromGroup();
                    }
                });
            }

            george.current.overviewBoxes.remove(this);
        },
        /**
         * Gets you a already saved configuration for a box
         * @param boxId
         */
        getLoadedBox: function (boxId) {
            var savedBoxes = [];
            if (george.current.frontendConfig && george.current.frontendConfig.get("overview") && george.current.frontendConfig.get("overview").boxes) savedBoxes = george.current.frontendConfig.get("overview").boxes;
            return _.findWhere(savedBoxes, {id: boxId});
        },
        /**
         * Load Settings for this Box from Overview Box Collection
         */
        loadBoxSettings: function () {
            var loadedBox = this.getLoadedBox(this.get("id"));
            if (loadedBox) {
                //Repairing old string values in position
                if (loadedBox.position && loadedBox.position==="9999") {
                    loadedBox.position = 9999;
                }

                this.set(loadedBox);
            }
        },
        /**
         * Saves the position to the according account. If Updating Position returns true
         * @param cb
         * @returns {boolean}
         */
        savePositionToAccount: function(cb) {
            if (this.displayModel && this.displayModel.get("additionalData")) {
                var newData = _.clone(this.displayModel.get("additionalData"));
                if (newData.position !== this.get("position")) {
                    newData.position = this.get("position");
                    this.displayModel.set("additionalData", newData);
                    this.displayModel.saveSimpleOnGeorgeAPI(cb);

                    return true;
                }
            }
            return false;
        }

    });
