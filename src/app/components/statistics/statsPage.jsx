import React, { useEffect, useState } from "react";
import { useProviderContext } from "../context";
import api from "../../api";
import {
  allUsersMoneyIfAccountsAreDeleted,
  dateFromToFilter,
  totalCalc,
  allUsersExpensesIfExpensesAreDeleted,
  filteredPerAccountUserExpenses,
  zeroExpense
} from "../../utils";
import FiltrationBar from "../filtrationBar";
import Loader from "../loader";

import "@progress/kendo-theme-material/dist/all.css";
import "hammerjs";
import ChartsRender from "./chartsRender";

const StatsPage = () => {
  const [period, setPeriod] = useState("This Month");
  const [incomesExpenses, setIncomesExpenses] = useState();

  const {
    filterData,
    setFilterData,
    userMoney,
    userExpenses,
    handleClearFilters,
    allUsersHistory,
    signedUser,
    allUsersMoney
  } = useProviderContext();

  const noFilter = { name: "All", id: "" };

  const [accounts] = useState([
    noFilter,
    ...allUsersMoneyIfAccountsAreDeleted(
      allUsersHistory[signedUser.id],
      userMoney
    )
  ]);
  const [items] = useState([
    noFilter,
    ...allUsersExpensesIfExpensesAreDeleted(
      allUsersHistory[signedUser.id],
      userExpenses
    )
  ]);

  useEffect(() => {
    api.filterData.fetchIncomesExpensesFilterData().then((data) => {
      setIncomesExpenses([noFilter, ...data]);
    });
  }, []);

  const handleChange = ({ target }) => {
    setFilterData((prevState) => ({
      ...prevState,
      [target.name]: target.value
    }));

    if (target.name === "dateTo" || target.name === "dateFrom") {
      setPeriod("");
    }
  };

  const handleClearStatsFilters = () => {
    handleClearFilters();

    setPeriod("This Month");
  };

  const handleThisMonthStats = () => {
    setPeriod("This Month");
    setFilterData((prevState) => ({ ...prevState, dateFrom: "", dateTo: "" }));
  };

  const handleAllTimeStats = () => {
    setPeriod("All Time");
    setFilterData((prevState) => ({ ...prevState, dateFrom: "", dateTo: "" }));
  };

  const renderHeader = () => {
    return (
      (filterData.accounts &&
        filterData.items &&
        accounts.filter((acc) => acc.id === Number(filterData.accounts))[0]
          ?.name +
          " to " +
          items.filter((exp) => exp.id === Number(filterData.items))[0]
            ?.name) ||
      accounts.filter((acc) => acc.id === Number(filterData.accounts))[0]
        ?.name ||
      items.filter((exp) => exp.id === Number(filterData.items))[0]?.name ||
      ""
    );
  };

  const renderIncomes = () => {
    const userIncomes = allUsersMoneyIfAccountsAreDeleted(
      allUsersHistory[signedUser.id],
      allUsersMoney[signedUser.id]
    ).map((prevState) => ({
      ...prevState,
      amount: allUsersHistory[signedUser.id].incomes
        .filter((data) => data.account === prevState.id)
        .filter((data) => {
          return dateFromToFilter(filterData, data, period);
        })
        .reduce((accum, data) => accum + data.amount, 0)
    }));

    const filteredUserMoney = userIncomes.filter(
      (acc) => acc.id === Number(filterData.accounts)
    );

    const incomes = totalCalc(
      filteredUserMoney.length ? filteredUserMoney : userIncomes
    ).map((acc) => acc.join("") + " ");

    return incomes.length ? incomes : [`0.00${signedUser.currency}`];
  };

  const renderExpenses = () => {
    let filteredPerAccUserExp = filteredPerAccountUserExpenses(
      allUsersHistory[signedUser.id].expenses,
      filterData,
      period
    );

    filteredPerAccUserExp.length
      ? true
      : (filteredPerAccUserExp = zeroExpense(filterData, accounts, items));

    const filteredPerExpenseUserExpenses = filteredPerAccUserExp.filter(
      (exp) => exp.item === Number(filterData.items)
    );

    const expenses = totalCalc(
      filterData.items
        ? filteredPerExpenseUserExpenses.length
          ? filteredPerExpenseUserExpenses
          : zeroExpense(filterData, accounts, items)
        : filteredPerAccUserExp
    ).map((arr) => arr.join("") + " ");

    return expenses;
  };

  if (incomesExpenses) {
    const showIncomes = () => {
      if (
        !filterData.items &&
        (filterData.incomesExpenses === String(incomesExpenses[1].id) ||
          filterData.incomesExpenses === "")
      ) {
        return true;
      } else {
        return false;
      }
    };

    const showExpenses = () => {
      if (
        filterData.incomesExpenses === String(incomesExpenses[2].id) ||
        filterData.incomesExpenses === ""
      ) {
        return true;
      } else {
        return false;
      }
    };

    return (
      <div className="flex justify-center relative">
        <div className="bg-white md:min-w-[750px] w-[430px] mt-[60px] rounded-2xl shadow-xl">
          <div className="text-center">
            <h1 className="text-center font-medium	text-xl pt-3">Statistics</h1>
            <br />

            <FiltrationBar
              data={filterData}
              onChange={handleChange}
              incomesExpenses={incomesExpenses}
              accounts={accounts}
              items={items}
              onClear={handleClearStatsFilters}
              onThisMonth={handleThisMonthStats}
              onAllTime={handleAllTimeStats}
              period={period}
            />

            <br />

            <div className="text-left ml-5  mb-5">
              <h1 className="text-lg font-medium">{renderHeader()}</h1>

              <h1 className={showIncomes() ? "" : "hidden"}>
                Incomes: {renderIncomes()}
              </h1>

              <h1 className={showExpenses() ? "" : "hidden"}>
                Expenses: {renderExpenses()}
              </h1>
            </div>

            <div className="w-[600px] m-auto mb-9">
              <ChartsRender
                expensesData={renderExpenses()}
                incomesData={renderIncomes()}
                filterData={filterData}
                showIncomes={showIncomes()}
                showExpenses={showExpenses()}
                period={period}
                accounts={accounts.filter((item) => item.currency)}
                items={items.filter((item) => item.currency)}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
  return <Loader />;
};

export default StatsPage;
