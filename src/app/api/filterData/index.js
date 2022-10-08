const periods = [
  { name: "This Month" },
  { name: "Half Year" },
  { name: "Last Year" },
  { name: "All Time" }
];

const incomesExpensesFilterData = [
  { name: "Incomes", id: 123456789 },
  { name: "Expenses", id: 987654321 }
];

const fetchPeriods = () =>
  new Promise((resolve) => {
    window.setTimeout(function () {
      resolve(periods);
    }, 2000);
  });

const fetchIncomesExpensesFilterData = () =>
  new Promise((resolve) => {
    window.setTimeout(function () {
      resolve(incomesExpensesFilterData);
    }, 2000);
  });

export default { fetchPeriods, fetchIncomesExpensesFilterData };
