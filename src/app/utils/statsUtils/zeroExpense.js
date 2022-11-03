export function zeroExpense(filterData, accounts, items) {
  let result = [];

  if (filterData.accounts) {
    result = [
      {
        amount: 0,
        currency: accounts.filter(
          (acc) => acc.id === Number(filterData.accounts)
        )[0]?.currency
      }
    ];
  } else if (filterData.items) {
    result = [
      {
        amount: 0,
        currency: items.filter((exp) => exp.id === Number(filterData.items))[0]
          ?.currency
      }
    ];
  } else {
    result = [
      ...new Set(
        items.filter((item) => item.currency).map((item) => item.currency)
      )
    ].map((item) => ({
      amount: 0,
      currency: item
    }));
  }

  return result;
}
