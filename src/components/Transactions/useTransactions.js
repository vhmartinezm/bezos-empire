import { useState, useEffect } from 'react';

import useLocalStorage from '../../hooks/useLocalStorage.js';

import { API_URL } from '../../config.js';

import { getSummary, getNewValue, mapTransactions, filteredSummary } from './utils';


function useTransactions() {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [order, setOrder] = useState(true); // DESC: true, ASC: false
  const [data, setData] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [summary, setSummary] = useState([]);
  const [userCompanies, setUserCompanies] = useLocalStorage('userCompanies', {});

  const toggleUserCompany = (company) => {
    setUserCompanies({
      ...userCompanies,
      [company]: getNewValue(company, userCompanies),
    });
  }

  const toggleOrder = () => setOrder(!order);

  useEffect(() => {
    async function getTransactions () {
      const data = await fetch(API_URL)
        .then(response => response.json())
        .catch(() => setError(true));
      setData(data);
      setSummary(getSummary(data));
      setLoading(false);
    }

    getTransactions();
  }, []);

  useEffect(() => {
    if (data.length) {
      setTransactions(mapTransactions(data, order, userCompanies));
    }
  }, [data, userCompanies, order]);

  return {
    error,
    order,
    loading,
    summary: filteredSummary(summary, userCompanies),
    toggleOrder,
    transactions,
    toggleUserCompany,
  };
}

export default useTransactions;
