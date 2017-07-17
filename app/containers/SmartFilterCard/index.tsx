import * as React from 'react';
import { Component } from 'react';
import * as moment from 'moment';

import * as _ from 'underscore';

import {
  getCategoryDetails,
  getCategoryTransactions,
  getCategoryTransactionsByDate
} from '../../apiClient';

import DashboardCard from '../../components/dashboardCard';
import Balance from '../../components/Balance';
import {
  CategoryDetails,
  Transaction
} from '../../apiClient/dtos';
import * as George from '../../types/george/george';
import LineChartData = George.charts.LineChartData;
import { Moment } from "moment";

export interface State {
  chartUUID: string,
  data: {

    categoryDetails: CategoryDetails

  }

}

export interface Props {

  transactionCategory: string;
}

interface Balance {
  value: number,
  currency: string,
  precision: number,
  name: string
}

interface GraphData {
  date: Moment,
  value: number
}

export default class extends Component<Props, State> implements Component {

  constructor(props) {

    super(props);

    this.state =
      {

        chartUUID: this.getChartUUID(),
        data: {

          categoryDetails: {}

        }
      };

    getCategoryDetails(props.transactionCategory)
      .then(categoryDetails => {

        this.setState((prevState: State, props) => {

          return { ...prevState }.data.categoryDetails = categoryDetails;

        })

      }).then(() => {

        const state = this.state;

        // this.renderChart(this.state.chartUUID);

    });

    getCategoryTransactionsByDate(props.transactionCategory, moment('2013-03-01'), moment('2018-08-01'))
      .then(transactions => {

        console.log(transactions);

        const grouping : {[key:number]: GraphData[]} = {};

        transactions.collection.forEach(
          item => {

            const date = moment(new Date(item.bookingDate));
            const key = date.format("YYYY-MM"); // we are grouping by month

            if (grouping[key] == null || grouping[key] == undefined){
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

            const group : GraphData[] = grouping[key];
            let sum = 0;
            let count = 0;
            let date : Moment = null;

            group.forEach((value, index, array) => {

              sum += value.value;

              count ++;

              date = value.date;
            });

            return {
              x: date.format('YYYY-MM-DD'),
              y : -sum,
              count : count
            }
          });


        const last3 = graphData.slice(graphData.length > 4 ? graphData.length - 4 : 0);

        console.log(graphData);
        console.log(last3);

        this.renderChart(this.state.chartUUID, [last3]);

      });

  }

  private getBalances(): Balance[] {

    return Object.keys(this.state.data.categoryDetails).map(key => {
      const item = this.state.data.categoryDetails[key];

      return {
        value: item.value,
        currency: item.currency,
        precision: item.precision,
        name: key
      };
    })
      ;

  }

  private getTotalBalance(): Balance {

    let currency = "";
    let precision = 0;

    const balances = this.getBalances();

    if (balances.length == 0) {
      return {
        value: 0,
        currency: '',
        precision: 0,
        name: ""
      };
    }

    return balances.reduce((previousValue, currentValue, currentIndex, array) => {
      return {
        value: previousValue.value + currentValue.value,
        currency: currentValue.currency,
        precision: currentValue.precision,
        name: 'total'
      }
    });

  }

  private getChartUUID(): string {
    return 'smartFilterChart_' + _.uniqueId();
  }

  private renderChart(chartUUID: string, data : LineChartData[][]) {

    // const f = (date: number) => moment(new Date(date)).format('YYYY-MM-DD');

    const container = document.getElementById(chartUUID);

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


        // return xData;


      },
      tooltipHandler: (d) => {

        const date = moment(d.point.x).format('MMM');

        const amount = d.point.y;

        return `<span>${date} ${amount}</span>`;

      }

    });

  }

  render() {

    // const headerStyle: CSSProperties = {
    //   display: 'flex',
    //   'justify-content': `flex-start`,
    //   'align-items': `center`
    // };
    ///<span class="balance true">€ 3.000<span class="cents">,00</span></span>


    // Balances {
    //
    //   this.getBalances().map(
    //     value => {
    //       return <div> {value.name}: {value.value} </div>
    //     }
    //   )
    //
    // }


    const href = `#smartFilter/${this.props.transactionCategory}`;

    const totalBalance = this.getTotalBalance();

    return (

      <DashboardCard

        header={
          <div className="header">

            <div className="icon iconcircle">
              <svg className="ico-card">
                <use xlinkHref="#ico-card"></use>
              </svg>
            </div>

            <div className="text">
              <div className="firstLine">
                Smart filter
              </div>

              <div>
                {this.props.transactionCategory}
              </div>
              <div>
                <Balance balance={totalBalance}/>
              </div>

            </div>
          </div>
        }

        content={

          <div>

            <div id={this.state.chartUUID}/>

          </div>

        }

        footer={
          <div>
            <a href={href}>Detail</a>
          </div>
        }
      />

    );
  }

}
