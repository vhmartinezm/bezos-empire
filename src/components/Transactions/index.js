import React from 'react';
import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';

import Summary from './Summary';
import Transactions from './Transactions';

import { Container, Message } from './styles';

import useTransactions from './useTransactions';

const SortIcon = React.memo(({ order }) => (
  order ? <ArrowDownOutlined /> : <ArrowUpOutlined />
));

function TransactionsComponent() {
  const {
    error,
    order,
    loading,
    summary,
    toggleOrder,
    transactions,
    toggleUserCompany
  } = useTransactions();

  if (error) return <Message>Error</Message>;
  if (loading) return <Message>Loading...</Message>;

  return (
    <div>
      <Container>
        <div>
          <div className="title">
            <h1>Transactions</h1>
            <span className="sort" onClick={toggleOrder}>
              date <SortIcon order={order} />
            </span>
          </div>
          <Transactions
            transactions={transactions}
            toggleUserCompany={toggleUserCompany}
          />
        </div>
        <div>
          <h1>Bezos-related companies</h1>
          <Summary summary={summary} />
        </div>
      </Container>
    </div>
  );
}

export default TransactionsComponent;
