import React from 'react';

import Currency from '../Currency';

import { Summary, SummaryItem } from './styles';

const Item = React.memo(function Item({ data }) {
  const { company, totalAmount, percentage } = data;

  return (
    <SummaryItem key={company}>
      <span className="merchant">{company}</span>
      <div className="values">
        <Currency>{totalAmount}</Currency>
        <span className="percentage">({percentage}%)</span>
      </div>
    </SummaryItem>
  )
}, ({ data: d1 }, { data: d2 }) => d1.company === d2.company);

function SummaryComponent({ summary }) {
  if (summary?.length === 0) return null;
  return (
    <Summary>
      {summary.map((item) => (
        <Item data={item} key={item.company} />
      ))}
    </Summary>
  )
}

export default SummaryComponent;
