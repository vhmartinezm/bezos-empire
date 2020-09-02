import { useState, useEffect } from 'react';
import { BEZOS_COMPANIES } from '../../config.js';

import TransactionApi from './api';
import { getSummary, mapTransactions, filteredSummary } from './utils';


function useTransactions() {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [order, setOrder] = useState(true); // DESC: true, ASC: false
  const [data, setData] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [summary, setSummary] = useState([]);
  const [userCompanies, setUserCompanies] = useState([]);

  const toggleUserCompany = async (company) => {
    let newMerchantList;
    if (userCompanies.includes(company)) {
      newMerchantList = [...userCompanies.filter(c => c !== company)];
    } else {
      newMerchantList = [...userCompanies, company];
    }
    const save = await TransactionApi.createOrUpdateMerchantList(newMerchantList);
    if (save) setUserCompanies(newMerchantList);
    else console.log('service is not available');
  };

  const toggleOrder = () => setOrder(!order);

  useEffect(() => {
    async function getTransactions () {
      const [data, merchants] = await Promise.all([
        TransactionApi.getTransations(setError),
        TransactionApi.getMerchantList()
      ]);
      setUserCompanies(merchants || BEZOS_COMPANIES);
      if (data) {
        setData(data);
        setSummary(getSummary(data));
      }
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
