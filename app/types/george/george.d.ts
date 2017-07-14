
export = George;
export as namespace george;

declare namespace George {
  export interface TestApp {

  }

  export interface Define {
    define: (app: TestApp) => void;
  }

  namespace Charts {

    export enum ChartType {
      PIE,
      BAR
    }

    export interface Chart {

      chartType: ChartType;
      dataset(data: any);
      focus(on: string);

    }

    export interface ChartsInitializer {
      container: Element; // must be id !!! '#idOfElement'
      data: any;
      onClickHandler?: (data: any, index: number) => void;
      tooltipHandler?: (data: any, max: number) => void;
      cssClass?: string;

      height: number;
      width: number;

    }

    export interface PieChartInitializer extends ChartsInitializer {

      disabledCategories?: [string];
      disabledColor?: string;
      radius?: number;
      outerRadius?: number;
      innerRadius?: number;

      color?: (data: any) => string;
      onMouseOutHandler: (data: any, index: number) => void;
      getTitleHandler: (totalAmount: any) => [string];
      showTitle?: boolean;
      showLabels?: boolean;
      labelThreshold?: boolean;

    }

    export interface BarChartInitializer extends ChartsInitializer {
      barHeight?: number;
      barSpace?: number;
      totalAmount?: number;
    }

    export interface CashFlowChartInitializer extends ChartsInitializer {

      statTypes?: string[];
      color?: any; /// TODO
      formatAxisDate: any;
      forceMinHeight?: boolean;
      onBarClickHandler: any;
      max: number;
      tooltipOffset: number;
      margin?: Margin;
    }

    export interface LineChartInitializer extends ChartsInitializer {

      colors : string[];
      xAxisFormatter?(data: any): string;
      seriesNames?: string[];
      tickValues?: any;
      margin?: Margin;

    }

    export interface AreaChartInitializer extends ChartsInitializer {

      xAxisFormatter(data: any): string;
      margin?: Margin;

    }

    export interface Margin {

      top?: number;
      right?: number;
      bottom?: number;
      left?: number;

    }

    export interface Charts {
      pieChart(initializer: PieChartInitializer): Chart;
      barChart(initializer: BarChartInitializer): Chart;
      cashflowChart(initializer: CashFlowChartInitializer): Chart;
      lineChart(initializer: LineChartInitializer): Chart;
      areaChart(initializer: AreaChartInitializer): Chart;
    }

  }

  export interface App {

    vent: any;

    module: (name: String, define: Define) => void;

    addInitializer(cb: () => void): void;

    baseViews: any;

    defaultRouteHandler: any;

    mainContainer: any;

    charts: Charts.Charts;
  }

  export interface Current {

    token: string;

    overviewBoxes: any;

    frontendConfig: any;

    menuItems: any;
  }

  export interface Config {

    georgeApiUrl: string;
  }

  export interface BaseFeatures {

    decimalSeperator: string;
    thousandSeperator: string;
  }

  export interface Features {

    base: BaseFeatures;

  }

  export interface Ui {
    colors: any;
  }

  export interface George {
    app: App;
    ui : Ui;
    stats: any;
    config: Config;
    current: Current;
    features: Features;


  }
}

declare global {

  const george: George.George;

}