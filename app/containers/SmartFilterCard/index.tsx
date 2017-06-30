import * as React from 'react';
import {
  Component,
  CSSProperties
} from 'react';

import {
  getCategoryDetails
} from '../../apiClient';

import DashboardCard from '../../components/dashboardCard';
import {
  CategoryDetails
} from '../../apiClient/dtos';

export interface State {

  data: {

    categoryDetails: CategoryDetails

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

          categoryDetails: {}

        }
      };

    getCategoryDetails(props.transactionCategory)
      .then(categoryDetails => {

        this.setState((prevState: State, props) => {

          return { ...prevState }.data.categoryDetails = categoryDetails;

        })

      });

  }

  render() {

    const headerStyle: CSSProperties = {
      display: 'flex'
    };
    ///<span class="balance true">€ 3.000<span class="cents">,00</span></span>

    const href = `#smartFilter/${this.props.transactionCategory}`;
    return (

      <DashboardCard

        header={
          <div style={headerStyle}>

            <div>
              <svg className="ico-card">
                <use xlinkHref="#ico-card"></use>
              </svg>
            </div>

            selected category: {this.props.transactionCategory}
          </div>
        }

        content={

          <div>

            Total {

            Object.keys(this.state.data.categoryDetails).map(key => {
              const item = this.state.data.categoryDetails[key];

              return <div> {key}: {item.value} </div>;
            })

          }

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
