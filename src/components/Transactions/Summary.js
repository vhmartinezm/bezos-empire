import React from 'react';

import Currency from '../Currency';

import { Summary, SummaryItem } from './styles';

function SummaryComponent({ summary }) {
  if (summary?.length === 0) return null;
  return (
    <Summary>
      {summary.map((item) => (
        <SummaryItem key={item.company}>
          <span className="merchant">{item.company}</span>
          <div className="values">
            <Currency>{item.totalAmount}</Currency>
            <span className="percentage">({item.percentage}%)</span>
          </div>
        </SummaryItem>
      ))}
    </Summary>
  )
}

export default SummaryComponent;
