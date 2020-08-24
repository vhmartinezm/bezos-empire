import { BEZOS_COMPANIES, CATEGORIES } from '../../config.js';


function dateSort(a, b) {
  return new Date(b.date).getTime() - new Date(a.date).getTime();
}

const getBezosCompanies = (userCompanies) => ({
  ...BEZOS_COMPANIES,
  ...userCompanies,
})

function getNewValue(company, userCompanies) {
  let newValue = true;
  if (company in userCompanies) {
    newValue = !userCompanies[company];
  } else if (company in BEZOS_COMPANIES) {
    newValue = false;
  }
  return newValue;
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
  const bezosCompanies = getBezosCompanies(userCompanies);
  return summary.filter(({ company }) => (
    company in bezosCompanies && bezosCompanies[company]
  ));
}

function mapTransactions(transactions, desc = true, userCompanies) {
  const bezosCompanies = getBezosCompanies(userCompanies);
  const data = transactions.map((transaction) => ({
    ...transaction,
    isBezosCompany: transaction.merchant_name in bezosCompanies &&
      bezosCompanies[transaction.merchant_name],
    category: transaction.category.map((cat) => CATEGORIES[cat] || '')
  })).sort(dateSort);

  return desc ? data : data.reverse();
}

export {
  getNewValue,
  getSummary,
  filteredSummary,
  mapTransactions,
}
