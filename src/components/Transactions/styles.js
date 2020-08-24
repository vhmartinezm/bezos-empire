import styled from 'styled-components';

export const Transaction = styled.li`
  display: grid;
  grid-template: 2fr / 1.2em auto auto;
  grid-column-gap: 2em;
  grid-row-gap: 1em;
  padding: 1em;
  border-bottom: 1px solid ${(props) => props.theme.gray};

  & .icon {
    align-self: center;
    cursor: pointer;
    font-size: 1.2em;
    grid-row: 1 / 3;
    color: ${props => props.success ? props.theme.success : props.theme.gray};
  }

  & .date {
    color: #9E9E9E;
    font-size: .8em;
  }

  & .merchant, & .categories {
    text-align: right;
  }

  & .merchant {
    color: ${(props) => props.theme.highlight};
    font-weight: 600;
  }
`;

export const Transactions = styled.ul`
  max-height: 70vh;
  overflow-y: scroll;
  list-style: none;
  padding: 0;
  margin: 0;
  border: 1px solid ${(props) => props.theme.gray};
  border-radius: .7em;

  & :last-child {
    border-bottom: 0;
  }
`;

export const Container = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  grid-column-gap: 2em;
  padding: .5em 2em;

  & .title {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  & .sort {
    cursor: pointer;
  }

  @media screen and (max-width: 992px) {
    grid-template-columns: 1fr;
  }
`;

export const Summary = styled.div`
  border: 1px solid ${(props) => props.theme.gray};
  border-radius: .7em;
  padding: .5em;
`;

export const SummaryItem = styled.div`
  padding: .8em;
  display: grid;
  grid-template-columns: auto auto;
  justify-content: space-between;
  align-items: center;

  & .values {
    display: grid;
    grid-auto-flow: column;
    align-items: center;
    grid-column-gap: 5px;
  }

  & .percentage {
    color: ${(props) => props.theme.blue};
    font-weight: 600;
    font-size: .9em;
  }

  & .merchant {
    color: ${(props) => props.theme.highlight};
    font-weight: 600;
  }
`;

export const Message = styled.div`
  text-align: center;
  margin-top: 100px;
  font-size: 2em;
`;
