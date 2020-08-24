import React from 'react';

import Transaction from './Transaction';

import { Transactions } from './styles';

function TransactionsComponent({ transactions, toggleUserCompany }) {
  if (transactions?.length === 0) return null;
  return (
    <Transactions>
      {transactions.map((transaction) => (
        <Transaction
          key={transaction.id}
          toggleMerchant={() => {
            toggleUserCompany(transaction.merchant_name)
          }}
          data={transaction}
        />
      ))}
    </Transactions>
  )
}

export default TransactionsComponent;
