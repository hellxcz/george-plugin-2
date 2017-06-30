import * as React from 'react';

import Logo from '../Logo';

import { Transaction } from '../../apiClient/dtos';
import { CSSProperties } from 'react';
export interface Props {

  transaction: Transaction

}


const rowStyle: CSSProperties = {
  display: 'flex'
};

/*

 <div className="amount">{transaction.amountSender}</div>

* */
const sfc: React.SFC<Props> = (({ transaction }) => (

    <div className="transactionRow" style={rowStyle}>

      <div className="transaction-date">{transaction.valuationDate}</div>

      <div className="transaction-icon"><Logo logo={transaction.logo}/></div>
      <div className="transaction-info">{transaction.title}</div>

      <div className="transaction-amount">{transaction.amount.value}</div>
    </div>
  )

);

export default sfc;