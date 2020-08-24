import React from 'react';
import { PlusCircleOutlined, CheckCircleOutlined } from '@ant-design/icons';

import Currency from '../Currency';

import { Transaction } from './styles';

const Icon = ({ success }) => (
  success ? <CheckCircleOutlined /> : <PlusCircleOutlined />
);

function TransactionComponent({ data, toggleMerchant }) {
  const {
    date,
    amount,
    category,
    merchant_name,
    isBezosCompany,
  } = data;

  return (
    <Transaction success={isBezosCompany}>
      <span className="icon" onClick={toggleMerchant}>
        <Icon success={isBezosCompany} />
      </span>
      <Currency>{amount}</Currency>
      <span className="merchant">{merchant_name}</span>
      <span className="date">{date}</span>
      <span className="categories">{category.join(' ')}</span>
    </Transaction>
  )
}

export default TransactionComponent;
