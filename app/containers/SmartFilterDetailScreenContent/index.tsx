import * as React from 'react';
import { Component } from 'react';
import * as moment from 'moment';

import {
  getCategoryDetails,
  getCategoryTransactions,
  getCategoryTransactionsByDate
} from '../../apiClient/index';
import {
  CategoryDetails,
  Transaction
} from "../../apiClient/dtos";

import TransactionItem from '../../components/TransactionItem';
import Transactions from '../../components/Transactions';


export interface State {

  data :{
    categoryDetails: CategoryDetails,

    transactions: Transaction[]
  }

}

export interface Props {
  transactionCategory: string;
}

export default class extends Component<Props, State>{

  constructor(props) {

    super(props);

    this.state =
      {
        data: {

          categoryDetails: {},

          transactions: []
        }
      };

    getCategoryDetails(props.transactionCategory)
      .then(categoryDetails => {

        this.setState((prevState: State, props) => {

          return { ...prevState }.data.categoryDetails = categoryDetails;

        })

      });


    getCategoryTransactionsByDate(props.transactionCategory, moment('2013-03-01'), moment('2018-08-01'))
    // getCategoryTransactions(props.transactionCategory)
      .then(transactions => {
        this.setState((prevState, props) => {

          return { ...prevState }.data.transactions = transactions.collection;

        })
      });


  }

  render() {

    const transactions = this.state.data.transactions;
    return (

      <Transactions transactions={transactions}/>

    )

  }

}