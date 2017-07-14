// realying on fact, that sandbox has backbone and underscore loaded
// import backbone from 'backbone';
// import _ from 'underscore';

import { TypedModel } from './backboneHelpers/typedModel';
import * as _ from "underscore";

export interface IOverviewBoxModel {
  id: string;
  position?: number;
  column?: number;
  size?: string;
  temporary?: boolean;
  name: string;
  expanded?: boolean; //in case of table overview and group type
  type: string;
  displayModel: DisplayModel;
}



export class DisplayModel extends TypedModel<any> {
  defaults() {
    return {};
  }

}

export class OverviewBoxModel extends TypedModel<IOverviewBoxModel> {

  public displayView: any;

  defaults(): IOverviewBoxModel {
    return {
      id: "",
      position: 9999,
      column: 9999,
      size: "md",
      temporary: false,
      name: '',
      expanded: true, //in case of table overview and group type
      type: '',
      displayModel: new DisplayModel()
    };
  }


  /**
   * @method constructor
   * @constructor
   */
  constructor(attributes?: IOverviewBoxModel, options?: any) {
    super(attributes, options);

    this.loadBoxSettings();
  }

  /**
   * Find all subboxes if this is a group
   */
  findGroupedBoxes() {

    return george.current.overviewBoxes.select( (box) => {
      return box.get("group") && box.get("group").groupId === this.get("id");
    });
  }

  addToGroup(groupId, groupPosition, groupColumn) {
    this.set("group", { groupId: groupId });
    this.set("position", groupPosition);
    this.set("column", groupColumn);

    george.stats.trackEvent("overview", "group_addToGroup", this.get("type")); // Add Box to Group. Attr1: Type of Box that is added
  }

  /**
   * Removes a box from the group
   */
  removeFromGroup() {
    this.unset("group");
  }

  /**
   * Closes a group so it removes all boxes from the group and also removes itself from global boxes collection
   */
  closeGroup() {
    if (this.get("groupedBoxes") && this.get("groupedBoxes").length > 0) {
      const grBoxes = this.get("groupedBoxes");
      grBoxes.each( (currBox) => {
        const selBox = george.current.overviewBoxes.get(currBox.get("id"));
        if (selBox) {
          selBox.removeFromGroup();
        }
      });
    }

    george.current.overviewBoxes.remove(this);
  }

  /**
   * Gets you a already saved configuration for a box
   * @param boxId
   */
  getLoadedBox(boxId) {
    let savedBoxes = [];
    if (george.current.frontendConfig
      && george.current.frontendConfig.get("overview")
      && george.current.frontendConfig.get("overview").boxes) {

      savedBoxes = george.current.frontendConfig.get("overview").boxes;
    }

    return _.findWhere(savedBoxes, { id: boxId });
  }


  /**
   * Load Settings for this Box from Overview Box Collection
   */
  loadBoxSettings() {
    const loadedBox = this.getLoadedBox(this.get("id"));
    if (loadedBox) {
      //Repairing old string values in position
      if (loadedBox.position && loadedBox.position === "9999") {
        loadedBox.position = 9999;
      }

      this.set(loadedBox);
    }
  }


  // /**
  //  * Saves the position to the according account. If Updating Position returns true
  //  * @param cb
  //  * @returns {boolean}
  //  */
  // savePositionToAccount(cb) {
  //   if (this.displayModel && this.displayModel.get("additionalData")) {
  //     const newData = _.clone(this.displayModel.get("additionalData"));
  //     if (newData.position !== this.get("position")) {
  //       newData.position = this.get("position");
  //       this.displayModel.set("additionalData", newData);
  //       this.displayModel.saveSimpleOnGeorgeAPI(cb);
  //
  //       return true;
  //     }
  //   }
  //   return false;
  // }

}

