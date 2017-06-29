import * as React from 'react';
import { Component } from 'react';
import {
  getCategoryDetails,
  getCategoryTransactions
} from '../../apiClient/index';
import {
  CategoryDetails,
  Transaction
} from "../../apiClient/dtos";

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


    getCategoryTransactions(props.transactionCategory)
      .then(transactions => {
        this.setState((prevState, props) => {

          return { ...prevState }.data.transactions = transactions.collection;

        })
      });


  }

  render() {

    const getImg = (item) => {

      if (item.logo.id) {
        return <img src={item.logo.uri}/>
      } else {

        const className = item.logo.uri.split(':')[1];


        return (<svg className={className}>

          <use xlinkHref={'#' + className}></use>

        </svg>);

      }

    };

    return (

      <div>{
        this.state.data.transactions.map((item) => {
          return <div> {getImg(item)} {item.amount.value} </div>;
        })
      }
      </div>

    )

  }

}