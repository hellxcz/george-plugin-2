import * as moment from 'moment';
import { Moment } from 'moment';

import {
  Collection,
  Transaction
} from '../../apiClient/dtos';
import * as George from '../../types/george/george';
import AreaChartData = George.charts.AreaChartData;

interface GraphData {
  date: Moment,
  value: number
}

export const renderCategoryTransactions_usingAreaChart = (chartUUID: string, transactions: Collection<Transaction>) => {

  const grouping: { [key: number]: GraphData[] } = {};

  transactions.collection.forEach(
    item => {

      const date = moment(new Date(item.bookingDate));
      const key = date.format("YYYY-MM"); // we are grouping by month

      if (grouping[key] == null || grouping[key] == undefined) {
        grouping[key] = [];
      }

      const group: GraphData[] = grouping[key];

      group.push({
        date: date,
        value: item.amount.value
      });

    }
  );

  const graphData: AreaChartData[] = Object.keys(grouping).sort((a, b) => a > b ? 1 : 0)
    .map(key => {

      const group: GraphData[] = grouping[key];
      let sum = 0;
      let count = 0;
      let date: Moment = null;

      group.forEach((value, index, array) => {

        sum += value.value;

        count++;

        date = value.date;
      });

      return {
        xData: date.format('YYYY-MM-DD'),
        yData: -sum
      }
    });

  const container = document.getElementById(chartUUID);

  george.app.charts.areaChart({
    container: container,
    data: graphData,

    // colors: [george.ui.colors.RED],
    width: 232,
    height: 126,
    margin: {
      left: 20,
      right: 20
    },
    xAxisFormatter: (xData: string) => {

      return moment(xData).format('MMM');

    },
    tooltipHandler: (d) => {

      const date = moment(new Date(d.xData)).format('MMM');

      const amount = d.yData;

      return `<span>${date} ${amount}</span>`;

    }

  });
};

export const renderCategoryTransactions_usingLineChart = (chartUUID: string, transactions: Collection<Transaction>) => {

  const grouping: { [key: number]: GraphData[] } = {};

  transactions.collection.forEach(
    item => {

      const date = moment(new Date(item.bookingDate));
      const key = date.format("YYYY-MM"); // we are grouping by month

      if (grouping[key] == null || grouping[key] == undefined) {
        grouping[key] = [];
      }

      const group: GraphData[] = grouping[key];

      group.push({
        date: date,
        value: item.amount.value
      });

    }
  );

  console.log(grouping);

  const graphData = Object.keys(grouping).sort((a, b) => a > b ? 1 : 0)
    .map(key => {

      const group: GraphData[] = grouping[key];
      let sum = 0;
      let count = 0;
      let date: Moment = null;

      group.forEach((value, index, array) => {

        sum += value.value;

        count++;

        date = value.date;
      });

      return {
        x: date.format('YYYY-MM-DD'),
        y: -sum,
        count: count
      }
    });


  const last3 = graphData.slice(graphData.length > 4 ? graphData.length - 4 : 0);

  // console.log(graphData);
  // console.log(last3);

  const data = [last3];

  const container = document.getElementById(chartUUID);

  // try areaChart as is on overviewMainAccountBox.js

  const chart = george.app.charts.lineChart({
    container: container,
    data: data,

    colors: [george.ui.colors.RED],
    seriesNames: [
      'one'
    ],
    width: 232,
    height: 126,
    margin: {
      left: 50,
      right: 10
    },
    xAxisFormatter: (xData: string) => {

      return moment(xData).format('MMM');

    },
    tooltipHandler: (d) => {

      console.log(d);

      const date = moment(d.point.x).format('MMM');

      const amount = d.point.y;

      return `<span>${date} ${amount}</span>`;

    }

  });
};