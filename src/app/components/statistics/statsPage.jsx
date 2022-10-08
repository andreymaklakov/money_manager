import React, { useEffect, useState } from "react";
import { useProviderContext } from "../context";
import api from "../../api";
import { dateFromToFilter, totalCalc } from "../../utils";
import FiltrationBar from "../filtrationBar";
import Loader from "../loader";

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
    ...userMoney.map((account) => ({ name: account.name, id: account.id }))
  ]);
  const [items] = useState([
    noFilter,
    ...userExpenses.map((expense) => ({ name: expense.name, id: expense.id }))
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
        userMoney.filter((acc) => acc.id === Number(filterData.accounts))[0]
          ?.name +
          " to " +
          userExpenses.filter((exp) => exp.id === Number(filterData.items))[0]
            ?.name) ||
      userMoney.filter((acc) => acc.id === Number(filterData.accounts))[0]
        ?.name ||
      userExpenses.filter((exp) => exp.id === Number(filterData.items))[0]
        ?.name ||
      ""
    );
  };

  const renderIncomes = () => {
    const userIncomes = allUsersMoney[signedUser.id].map((prevState) => ({
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

    return incomes;
  };

  const renderExpenses = () => {
    const zeroExpense = [
      {
        amount: 0,
        currency: filterData.accounts
          ? userMoney.filter((acc) => acc.id === Number(filterData.accounts))[0]
              ?.currency
          : userExpenses.filter((exp) => exp.id === Number(filterData.items))[0]
              ?.currency
      }
    ];

    let filteredPerAccountUserExpenses = allUsersHistory[signedUser.id].expenses
      .filter((data) => dateFromToFilter(filterData, data, period))
      .map((exp) => ({
        ...exp
      }))
      .filter((data) =>
        filterData.accounts
          ? data.account === Number(filterData.accounts)
          : true
      );

    filteredPerAccountUserExpenses.length
      ? true
      : (filteredPerAccountUserExpenses = zeroExpense);

    const filteredPerExpenseUserExpenses =
      filteredPerAccountUserExpenses.filter(
        (exp) => exp.item === Number(filterData.items)
      );

    const expenses = totalCalc(
      filterData.items
        ? filteredPerExpenseUserExpenses.length
          ? filteredPerExpenseUserExpenses
          : zeroExpense
        : filteredPerAccountUserExpenses
    ).map((arr) => arr.join("") + " ");

    return expenses;
  };

  if (incomesExpenses) {
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

              <h1
                className={
                  !filterData.items &&
                  (filterData.incomesExpenses ===
                    String(incomesExpenses[1].id) ||
                    filterData.incomesExpenses === "")
                    ? ""
                    : "hidden"
                }
              >
                Incomes: {renderIncomes()}
              </h1>

              <h1
                className={
                  filterData.incomesExpenses ===
                    String(incomesExpenses[2].id) ||
                  filterData.incomesExpenses === ""
                    ? ""
                    : "hidden"
                }
              >
                Expenses: {renderExpenses()}
              </h1>
            </div>
          </div>
        </div>
      </div>
    );
  }
  return <Loader />;
};

export default StatsPage;
