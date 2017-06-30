export interface MenuItem{

  id: string;
  nameKey: string;
  url: string;
  icon: string;

}

export class AreaMainLayoutView {

  private _layoutView;

  constructor(private menuItems : MenuItem[]=[]){

    const layoutViewClass = george.app.baseViews.areaMainLayoutBase.extend({
      initialize: () => {
        //Calling Base Initialize
        george.app.baseViews.areaMainLayoutBase.prototype.initialize.call(this);
      },
      getSubmenuItems: () => {

        return menuItems;

      }
    });

    this._layoutView = new layoutViewClass();

  }

  public showContent(view : Marionette.LayoutView<any>){

    this._layoutView.showContent(view);

  }

  public show(){

    george.app.mainContainer.show(this._layoutView);

  }
}
