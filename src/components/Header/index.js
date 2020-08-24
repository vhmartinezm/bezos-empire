import React from 'react';
import styled from 'styled-components';
import { UserOutlined } from '@ant-design/icons';


export const Header = styled.header`
  padding: 0 2em;
  display: grid;
  grid-template-columns: auto auto;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid ${(props) => props.theme.gray};
`;

export const User = styled.header`
  display: grid;
  grid-auto-flow: column;
  align-items: center;
  grid-column-gap: 5px;
  font-size: 1.1em;
`;


function HeaderComponent() {
  return (
    <Header>
      <h1>BEZOS EMPIRE</h1>
      <User>
        <UserOutlined />
        <span>Ahmed</span>
      </User>
    </Header>
  );
}

export default HeaderComponent;
