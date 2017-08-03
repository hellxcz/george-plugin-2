export = George;
export as namespace george;

declare namespace George {
  import Charts = George.charts.Charts;
  import Features = George.features.Features;
  export interface TestApp {

  }

  export interface Define {
    define: (app: TestApp) => void;
  }

  namespace charts {

    export enum ChartType {
      PIE,
      BAR
    }

    export interface Chart {

      chartType: ChartType;
      dataset(data: any);
      focus(on: string);

    }

    export interface ChartsInitializer<TData, TChartData> {
      container: Element;
      data: TData;
      onClickHandler?: (data: any, index: number) => void;
      tooltipHandler?: (data: TChartData, max: number) => void;
      cssClass?: string;

      height: number;
      width: number;

    }

    export interface PieChartInitializer extends ChartsInitializer<any, any> {

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

    export interface BarChartInitializer extends ChartsInitializer<any, any> {
      barHeight?: number;
      barSpace?: number;
      totalAmount?: number;
    }

    export interface CashFlowChartInitializer extends ChartsInitializer<any, any> {

      statTypes?: string[];
      color?: any; /// TODO
      formatAxisDate: any;
      forceMinHeight?: boolean;
      onBarClickHandler: any;
      max: number;
      tooltipOffset: number;
      margin?: Margin;
    }

    export interface LineChartData {
      x: string; // date in ('YYYY-MM-DD')
      y: number;
      count: number;
    }

    export interface RenderedLineChartData {

      index: number;
      point : LineChartData,
      seriesName: string

    }

    export interface LineChartInitializer extends ChartsInitializer<LineChartData[][], RenderedLineChartData> {

      colors : string[];
      xAxisFormatter : any;
      seriesNames?: string[];
      tickValues?: any;
      margin?: Margin;

    }

    export interface AreaChartData {

      xData: String,
      yData: number

    }

    export interface AreaChartInitializer extends ChartsInitializer<AreaChartData[], AreaChartData> {

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

  namespace features {
    export interface BaseFeatures {

      decimalSeperator: string;
      thousandSeperator: string;
    }

    export interface Features {

      base: BaseFeatures;

    }
  }

  export interface App {

    vent: any;

    module(name: String, define: Define) : void;

    addInitializer(cb: () => void): void;

    baseViews: any;

    defaultRouteHandler: any;

    mainContainer: any;

    charts: Charts;
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