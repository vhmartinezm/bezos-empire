import React from 'react';
import styled from 'styled-components';

export const Currency = styled.div`
  font-weight: 600;
  font-size: 1.2em;
  color: ${(props) => props.theme.blue};
`;

function CurrencyComponent({ children }) {
  return (
    <Currency>
      ${children}
    </Currency>
  );
}

export default CurrencyComponent;
