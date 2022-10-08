import { dateFromToFilter } from "./dateFromToFilter";

export function historyFiltration(
  filterData,
  incomesExpenses,
  period,
  allUsersHistory,
  signedUser
) {
  const history = [
    ...allUsersHistory[signedUser.id].expenses,
    ...allUsersHistory[signedUser.id].incomes
  ].map((item) => ({
    ...item,
    itemName: allUsersHistory[signedUser.id].expenses.filter(
      (expense) => expense.item === item.item
    )[0]?.name,
    accountName: allUsersHistory[signedUser.id].incomes.filter(
      (acc) => acc.account === item.account
    )[0]?.name,
    currency: (!item.item
      ? allUsersHistory[signedUser.id].incomes
      : allUsersHistory[signedUser.id].expenses
    ).filter((acc) => acc.currency === item.currency)[0]?.currency
  }));

  let filteredHistory = history.filter((history) => {
    if (filterData.incomesExpenses) {
      return Number(filterData.incomesExpenses) === incomesExpenses[1].id
        ? !history.item
          ? history
          : null
        : history.item
        ? history
        : null;
    }
    return true;
  });
  filteredHistory = filteredHistory.filter((history) => {
    if (filterData.accounts) {
      return history.account === Number(filterData.accounts);
    }
    return true;
  });
  filteredHistory = filteredHistory.filter((history) => {
    if (filterData.items) {
      return history.item === Number(filterData.items);
    }
    return true;
  });
  filteredHistory = filteredHistory.filter((history) =>
    dateFromToFilter(filterData, history, period)
  );

  return filteredHistory;
}
