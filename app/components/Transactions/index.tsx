import * as React from 'react';


import { Transaction, Account } from '../../apiClient/dtos';
import TransactionItem from '../TransactionItem';
import { getAccounts } from '../../apiClient/index';


export interface Props {
  transactions: Transaction[];
  accountsMap: Map<String, Account>
}


export const Transactions: React.SFC<Props> = ({ transactions, accountsMap }) => {

    return (
      <table className="transactionlist table table-condensed table-striped">
        <tbody>
        {
          transactions.map(
            transaction => {

              const account = accountsMap.get(transaction.owner);

              return (<TransactionItem transaction={transaction} account={account}/>)
            }
          )
        }
        </tbody>
      </table>
    )
  }
;

export default Transactions;