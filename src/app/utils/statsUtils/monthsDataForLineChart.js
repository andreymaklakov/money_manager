import { mSecInOneDay } from "../constantMSecData";
import { getStartOfMonth } from "../date";
import {
  dateFromDate,
  dateFromDateToDifferenceIsLessThanOneYear,
  dateFromIsMoreThanOneYearAgo,
  dateFromMonth,
  dateToDate,
  dateToMonth
} from "./differentDateData";
import {
  allUsersExpensesIfExpensesAreDeleted,
  allUsersMoneyIfAccountsAreDeleted
} from "./HistoryDataIfAllAccsOrExpsAreDeleted";

export function monthsData(
  filterData,
  currentMonth,
  showIncomes,
  showExpenses,
  allUsersHistory,
  allUsersMoney,
  signedUser,
  allUsersExpenses
) {
  const userIncomesPerMonth = (dateFrom, dateTo) => {
    let result = allUsersMoneyIfAccountsAreDeleted(
      allUsersHistory[signedUser.id],
      allUsersMoney[signedUser.id]
    ).map((prevState) => ({
      ...prevState,
      amount: allUsersHistory[signedUser.id].incomes
        .filter((data) => data.account === prevState.id)
        .filter(
          (data) =>
            dateTo - new Date(data.date) <= dateFrom &&
            dateTo - new Date(data.date) >= 0
        )
        .reduce((accum, data) => accum + data.amount, 0)
    }));

    result = filterData.accounts
      ? result.filter((acc) => Number(filterData.accounts) === acc.id)
      : [
          {
            name: "All Accounts",
            amount: result.reduce((accum, data) => accum + data.amount, 0),
            currency: result[0]?.currency
          }
        ];

    return result;
  };

  const userExpensesPerMonth = (dateFrom, dateTo) => {
    let result = allUsersExpensesIfExpensesAreDeleted(
      allUsersHistory[signedUser.id],
      allUsersExpenses[signedUser.id]
    ).map((prevState) => ({
      ...prevState,
      amount: allUsersHistory[signedUser.id].expenses
        .filter((data) => data.item === prevState.id)
        .filter((data) =>
          filterData.accounts
            ? data.account === Number(filterData.accounts)
            : data
        )
        .filter(
          (data) =>
            dateTo - new Date(data.date) <= dateFrom &&
            dateTo - new Date(data.date) >= 0
        )
        .reduce((accum, data) => accum + data.amount, 0)
    }));

    result = filterData.items
      ? result.filter((item) => Number(filterData.items) === item.id)
      : [
          {
            name: "All Items",
            amount: result.reduce((accum, data) => accum + data.amount, 0),
            currency: result[0].currency
          }
        ];

    return result;
  };

  const getYearForCalculation = (data, index) => {
    if (
      dateFromIsMoreThanOneYearAgo(filterData) &&
      !dateFromDateToDifferenceIsLessThanOneYear(filterData)
    ) {
      if (index >= dateFromMonth(filterData)) {
        return Number(data);
      } else {
        return Number(data) + 1;
      }
    } else if (filterData.dateTo) {
      if (index <= dateToMonth(filterData)) {
        return Number(data);
      } else {
        return Number(data) - 1;
      }
    } else {
      if (data > index) {
        return new Date().getFullYear();
      }
      if (data < index) {
        return new Date().getFullYear() - 1;
      }
    }
  };

  const getAmountFunction = (
    index,
    mSecondsInMonth,
    days,
    isIncomesCalculation
  ) => {
    let date;

    if (
      dateFromIsMoreThanOneYearAgo(filterData) &&
      !dateFromDateToDifferenceIsLessThanOneYear(filterData)
    ) {
      date = new Date(
        `${getYearForCalculation(filterData.dateFrom.slice(0, 4), index)},${
          index.length === 1 ? `0${index}` : index
        },${days}`
      );
    } else if (filterData.dateTo) {
      date = new Date(
        `${getYearForCalculation(filterData.dateTo.slice(0, 4), index)},${
          index.length === 1 ? `0${index}` : index
        },${days}`
      );
    } else {
      if (currentMonth === index) {
        return isIncomesCalculation
          ? userIncomesPerMonth(getStartOfMonth(), Date.now())[0].amount
          : userExpensesPerMonth(getStartOfMonth(), Date.now())[0].amount;
      } else {
        date = new Date(
          `${getYearForCalculation(currentMonth, index)},${
            index.length === 1 ? `0${index}` : index
          },${days}`
        );
      }
    }

    return isIncomesCalculation
      ? userIncomesPerMonth(mSecondsInMonth, date)[0].amount
      : userExpensesPerMonth(mSecondsInMonth, date)[0].amount;
  };

  const monthDays = (index, days) => {
    if (filterData.dateTo && dateToMonth(filterData) === index) {
      return dateToDate(filterData);
    } else {
      return days;
    }
  };

  const mSecondsInMonth = (index, days) => {
    if (
      filterData.dateFrom &&
      dateFromMonth(filterData) === index &&
      !(filterData.dateTo && dateToMonth(filterData) === index)
    ) {
      return (days - dateFromDate(filterData)) * mSecInOneDay;
    } else {
      return days * mSecInOneDay;
    }
  };

  const monthIncomesAmount = (index, mSecondsInMonth, days) => {
    if (showIncomes) {
      return getAmountFunction(index, mSecondsInMonth, days, true);
    }
    return null;
  };

  const monthExpensesAmount = (index, mSecondsInMonth, days) => {
    if (showExpenses) {
      return getAmountFunction(index, mSecondsInMonth, days, false);
    }
    return null;
  };

  const monthExample = (name, days, index) => {
    return {
      name: name,
      index: index,
      get days() {
        return monthDays(this.index, days);
      },
      get mSecondsInMonth() {
        return mSecondsInMonth(this.index, this.days);
      },
      get incomesAmount() {
        return monthIncomesAmount(this.index, this.mSecondsInMonth, this.days);
      },
      get expensesAmount() {
        return monthExpensesAmount(this.index, this.mSecondsInMonth, this.days);
      }
    };
  };

  const monthsData = [
    monthExample("Jan", 31, 1),
    monthExample("Feb", 28, 2),
    monthExample("Mar", 31, 3),
    monthExample("Apr", 30, 4),
    monthExample("May", 31, 5),
    monthExample("Jun", 30, 6),
    monthExample("Jul", 31, 7),
    monthExample("Aug", 31, 8),
    monthExample("Sep", 30, 9),
    monthExample("Oct", 31, 10),
    monthExample("Nov", 30, 11),
    monthExample("Dec", 31, 12)
  ];

  return monthsData;
}
