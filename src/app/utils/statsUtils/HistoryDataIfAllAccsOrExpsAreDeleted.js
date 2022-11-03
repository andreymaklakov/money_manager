export function allUsersMoneyIfAccountsAreDeleted(userHistory, userMoney) {
  const copyOfUserHistory = JSON.parse(JSON.stringify(userHistory));
  const copyOfUserMoney = JSON.parse(JSON.stringify(userMoney));

  const accountsFromHistory = [
    ...new Set(
      copyOfUserHistory.incomes.map((income) =>
        JSON.stringify({
          id: income.account,
          name: income.name,
          currency: income.currency
        })
      )
    )
  ].map((account) => JSON.parse(account));

  const deletedAndNotAccounts = [
    ...copyOfUserMoney,
    ...accountsFromHistory
  ].map((account) => {
    delete account.amount;
    return JSON.stringify(account);
  });

  const uniqueDeletedAndNotAccounts = [...new Set(deletedAndNotAccounts)].map(
    (account) => JSON.parse(account)
  );

  return uniqueDeletedAndNotAccounts;
}

export function allUsersExpensesIfExpensesAreDeleted(
  userHistory,
  userExpenses
) {
  const copyOfUserHistory = JSON.parse(JSON.stringify(userHistory));
  const copyOfUserExpenses = JSON.parse(JSON.stringify(userExpenses));

  const expensesFromHistory = [
    ...new Set(
      copyOfUserHistory.expenses.map((expense) =>
        JSON.stringify({
          name: expense.name,
          currency: expense.currency,
          id: expense.item
        })
      )
    )
  ].map((expense) => JSON.parse(expense));

  const deletedAndNotItems = [
    ...copyOfUserExpenses,
    ...expensesFromHistory
  ].map((item) => {
    delete item.amount;
    delete item.icon;
    return JSON.stringify(item);
  });

  const uniqueDeletedAndNotItems = [...new Set(deletedAndNotItems)].map(
    (item) => JSON.parse(item)
  );

  return uniqueDeletedAndNotItems;
}
