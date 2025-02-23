import { CATEGORIES } from '../../config.js';


function dateSort(a, b) {
  return new Date(b.date).getTime() - new Date(a.date).getTime();
}

function getSummary(data) {
  let total = 0;
  const companies = {};

  for (const transaction of data) {
    const amount = transaction.amount;
    if (companies[transaction.merchant_name]) {
      companies[transaction.merchant_name] += amount;
    } else {
      companies[transaction.merchant_name] = amount;
    }
    total += amount;
  }

  return Object.entries(companies).map(([company, amount]) => ({
    company,
    totalAmount: amount.toFixed(1),
    percentage: (amount / total * 100).toFixed(1)
  }));
}

function filteredSummary(summary, userCompanies) {
  return summary.filter(({ company }) => (
    userCompanies.length && userCompanies.includes(company)
  ));
}

function mapTransactions(transactions, desc = true, userCompanies) {
  const data = transactions.map((transaction) => ({
    ...transaction,
    isBezosCompany: userCompanies.length && userCompanies.includes(transaction.merchant_name),
    category: transaction.category.map((cat) => CATEGORIES[cat] || '')
  })).sort(dateSort);

  return desc ? data : data.reverse();
}

export {
  getSummary,
  filteredSummary,
  mapTransactions,
}
