import * as React from 'react';


import { Transaction } from '../../apiClient/dtos';
import TransactionItem from '../TransactionItem';


export interface Props {
  transactions: Transaction[];
}


export const Transactions: React.SFC<Props> = (({ transactions }) => (

    <table className="transactionlist table table-condensed table-striped">
      <tbody>
      {
        transactions.map(
          transaction => <TransactionItem transaction={transaction}/>
        )
      }
      </tbody>
    </table>


  )
);

export default Transactions;