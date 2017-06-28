import * as React from 'react';
import { Component } from 'react';

import {getCategoryDetails, getCategoryTransactions} from '../../apiClient';

import DashboardCard from '../../components/dashboardCard';


export default class CategoryTransactionCard extends Component<any, any> {
  transactionCategory;

  constructor(props) {

    super(props);

    this.state =
      {
        data: {

          total: {},

          transactions: {
            collection: []
          }
        }
      };

    getCategoryDetails(props.transactionCategory)
      .then(categoryDetails => {

        this.setState((prevState, props) => {

          return {...prevState}.data.total = categoryDetails;

        })

      });

    getCategoryTransactions(props.transactionCategory)
      .then(transactions => {
        this.setState((prevState, props) => {

          return {...prevState}.data.transactions.collection = transactions.collection;

        })
      });

  }

  render() {


    ///<span class="balance true">€ 3.000<span class="cents">,00</span></span>

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

      <DashboardCard

        header={

          <div>selected category: {this.props.transactionCategory}</div>

        }

        content={

          this.state.data.transactions.collection.map((item) => {
            return <div> {getImg(item)} {item.amount.value} </div>;
          })

        }

        footer={

          <div>Total {

            Object.keys(this.state.data.total).map(key => {
              const item = this.state.data.total[key];

              return <div> {key}: {item.value} </div>;
            })

          } </div>
        }

      />

      // <div
      //   className="overview-block box-saveable box-bottom-btn box-groupable box-canbegrouped box-canbemain box-size-md ui-widget ui-helper-clearfix">
      //   <div className="displaycard smallbox topbar COLOR_8-bar">
      //
      //     <div className="innerCard" style={innerCardStyle}>
      //       <div className="displayinner nameblock showNegative">
      //         <div className="clearfix showNegative">
      //           <div>
      //             <div className="label-sm truncate"> selected category: {transactionCategory} </div>
      //           </div>
      //         </div>
      //       </div>
      //
      //       <div className="paddedcontainer summarycontainer box-visible-md box-visible-lg">
      //
      //         {
      //           this.state.data.transactions.collection.map((item) => {
      //             return <div> {getImg(item)} {item.amount.value} </div>;
      //           })
      //
      //         }
      //
      //       </div>
      //       <div className="displayinner bottomButton box-visible-md box-visible-lg">
      //         <a className="nobubble btn btn-block btn-lg btn-light actionBtn">
      //           Total {
      //
      //           Object.keys(this.state.data.total).map(key => {
      //             const item = this.state.data.total[key];
      //
      //             return <div> {key}: {item.value} </div>;
      //           })
      //         }
      //         </a>
      //       </div>
      //     </div>
      //
      //   </div>
      // </div>
    );
  }

}


// export default DashboardCard;