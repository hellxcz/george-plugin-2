import * as React from 'react';
import { Component } from 'react';
import * as moment from 'moment';

import {
  getAccounts,
  getCategoryDetails,
  getCategoryTransactionsByDate
} from '../../apiClient/index';
import {
  Account,
  CategoryDetails,
  Transaction
} from "../../apiClient/dtos";
import Transactions from '../../components/Transactions';


export interface State {

  data: {

    accounts: Map<String, Account>, // {[id: string]: Account},
    categoryDetails: CategoryDetails,

    transactions: Transaction[]
  }

}

export interface Props {
  transactionCategory: string;
}

export default class extends Component<Props, State> {

  constructor(props) {

    super(props);

    this.state =
      {
        data: {
          accounts: new Map(),
          categoryDetails: {},
          transactions: []
        }
      };

    const categoryDetailsPromise = getCategoryDetails(props.transactionCategory);

    const transactionsPromise = getCategoryTransactionsByDate(props.transactionCategory, moment('2013-03-01'), moment('2018-08-01'));

    const accountsPromise = getAccounts();

    Promise.all([categoryDetailsPromise, transactionsPromise, accountsPromise])
      .then(([categoryDetails, transactions, accounts]) => {

        const accountsMap =
          accounts.collection
            .map<[string, Account]>(account => [account.transactionAccountId, account]);

        return this.setState((prevState: State, props) => {

          const newState = { ...prevState };

          newState.data = {
            accounts: new Map(accountsMap),
            transactions: transactions.collection,
            categoryDetails: categoryDetails
          };

          return newState;

        })

      });

  }

  render() {

    const data = this.state.data;
    const transactions = data.transactions;
    const accountsMap = data.accounts;


    transactions.forEach(transaction => {

      if (!accountsMap.has(transaction.owner)){
        console.log('could not find !!!');
      }

    });

    return (

      <Transactions transactions={transactions} accountsMap={accountsMap}/>

    )

  }

}