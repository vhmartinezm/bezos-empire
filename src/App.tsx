import React from 'react';
import { ThemeProvider } from 'styled-components';

import { THEME } from './config';
import { GlobalStyle } from './styles';

import Header from './components/Header';
import Transactions from './components/Transactions';


function App() {
  return (
    <ThemeProvider theme={THEME}>
      <Header />
      <Transactions />
      <GlobalStyle />
    </ThemeProvider>
  );
}

export default App;
