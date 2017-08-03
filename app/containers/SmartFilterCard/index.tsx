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
  Collection,
  Transaction
} from '../../apiClient/dtos';
import * as George from '../../types/george/george';
import LineChartData = George.charts.LineChartData;
import { Moment } from "moment";
import {
  renderCategoryTransactions_usingLineChart,
  renderCategoryTransactions_usingAreaChart
} from './chartRenderers';

export interface State {
  chartUUID: string,
  data: {

    categoryDetails: CategoryDetails,
    transactions: Transaction[]

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

          categoryDetails: {},
          transactions: []

        }
      };

    const getCategoryDetailsPromise = getCategoryDetails(props.transactionCategory);

    const getCategoryTransactionsPromise = getCategoryTransactionsByDate(props.transactionCategory, moment('2013-03-01'), moment('2018-08-01'));

    Promise.all([getCategoryDetailsPromise, getCategoryTransactionsPromise])
      .then(([categoryDetails, categoryTransactions]) => {

        this.setState((prevState: State, props) => {

          const newOne = { ...prevState };

          newOne.data = {
            categoryDetails: categoryDetails,
            transactions: categoryTransactions.collection
          };

          return newOne;

        });

        // renderCategoryTransactions_usingLineChart(this.state.chartUUID, categoryTransactions);
        renderCategoryTransactions_usingAreaChart(this.state.chartUUID, categoryTransactions);

      })

  }

  private processCategoryDetails(categoryDetails: CategoryDetails) {

    this.setState((prevState: State, props) => {

      return { ...prevState }.data.categoryDetails = categoryDetails;

    })

  }

  private getBalances(): Balance[] {


    const transactions = this.state.data.transactions;

    if (!transactions) {
      return [];
    }

    const result: Balance = {
      currency: "",
      precision: 0,
      value: 0,
      name: ""
    };

    transactions.forEach(transaction => {
      const amount = transaction.amount;

      result.value += amount.value;
      result.precision = amount.precision;
      result.currency = amount.currency;
      result.name = "";
    });

    return [result];

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

    const id = `cz-smart-filter-${this.props.transactionCategory}`;

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
          <div id={this.state.chartUUID}/>
        }

        footer={
          <div>
            <a id={id} className="footer-link" href={href}>Detail</a>
          </div>
        }
      />

    );
  }

}
