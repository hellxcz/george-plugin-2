import * as React from 'react';
import { Component } from 'react';
import * as moment from 'moment';

import * as _ from 'underscore';

import { getCategoryDetails } from '../../apiClient';

import DashboardCard from '../../components/dashboardCard';
import Balance from '../../components/Balance';
import { CategoryDetails } from '../../apiClient/dtos';

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

          this.renderChart(this.state.chartUUID);


          return { ...prevState }.data.categoryDetails = categoryDetails;

        })

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

  private renderChart(chartUUID: string) {

    // const s = moment(new Date('')).format("YYYY-MM-DD");
    //
    const f = (date: number) => moment(new Date(date)).format('YYYY-MM-DD');

    const container = document.getElementById(chartUUID);

    const chart = george.app.charts.lineChart({
      container: container,
      data: [
        [
          {
            x: '2016-06-04',
            y: 100,
            count: 1
          },
          {
            x: '2016-07-04',
            y: 110,
            count: 1
          },
          {
            x: '2016-08-04',
            y: 120,
            count: 1
          },
          {
            x: '2016-08-04',
            y: 130,
            count: 1
          },
        ]
      ],
      colors: [george.ui.colors.RED],
      seriesNames: [
        'one'
      ],
      width: 232,
      height: 126

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

            <div id={this.state.chartUUID}></div>

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
