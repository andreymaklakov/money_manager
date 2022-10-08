import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useProviderContext } from "../context";
import SelectField from "../forms/selectField";
import AddExpenseModal from "./addExpenseModal";
import api from "../../api";
import ExpenseModal from "./expenseModal";
import {
  incomeExpenseTimeFilter,
  totalCalc,
  windowWidthResizeCheck
} from "../../utils";
import { arrowDownIcon, doubleArrowDownIcon } from "../../common/svg";
import Loader from "../loader";

const ExpensesPage = () => {
  const [addModalIsHidden, setAddModalIsHidden] = useState(true);
  const [expenseModalIsHidden, setExpenseModalIsHidden] = useState(true);
  const [selectedExpense, setSelectedExpense] = useState();
  const [selectedPeriod, setSelectedPeriod] = useState();
  const [selectOptions, setSelectOptions] = useState();
  const [userExpenses, setUserExpenses] = useState([]);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [pageSize, setPageSize] = useState();
  const [icons, setIcons] = useState();
  const [incomesExpensesFilterData, setIncomesExpensesFilterData] = useState();
  const [currenciesSelectOptions, setCurrenciesSelectOptions] = useState();

  const {
    allUsersHistory,
    allUsersExpenses,
    signedUser,
    handleOpenItemHistory
  } = useProviderContext();

  useEffect(() => {
    api.icons.fetchIcons().then((data) => {
      setIcons(data);
    });
    api.filterData.fetchPeriods().then((data) => {
      setSelectOptions(data);
    });
    api.filterData.fetchPeriods().then((data) => {
      setSelectedPeriod(data[0]);
    });
    api.filterData.fetchIncomesExpensesFilterData().then((data) => {
      setIncomesExpensesFilterData(data);
    });
    api.usersMoney.fetchCurrencies().then((data) => {
      setCurrenciesSelectOptions(data);
    });
    windowWidthResizeCheck(setWindowWidth);
    windowWidth && setPageSize(windowWidth < 768 ? 5 : 13);
  }, []);

  useEffect(() => {
    selectedPeriod &&
      setUserExpenses(
        incomeExpenseTimeFilter(
          selectedPeriod,
          allUsersHistory[signedUser.id].expenses,
          allUsersExpenses,
          signedUser,
          true
        )
      );
  }, [selectedPeriod, allUsersHistory, signedUser, allUsersExpenses]);

  const prevRef = useRef(userExpenses.length);
  useEffect(() => {
    prevRef.current = userExpenses.length;
  }, [userExpenses.length]);
  const prevLength = prevRef.current;

  const handleModalOpen = (isAdd, expense) => {
    expense && setSelectedExpense(expense);

    isAdd ? setAddModalIsHidden(false) : setExpenseModalIsHidden(false);
  };

  const handleModalClose = () => {
    setAddModalIsHidden(true);
    setExpenseModalIsHidden(true);
  };

  const handleChange = ({ target }) => {
    setSelectedPeriod({ name: target.value });
  };

  const handleIncreasePageSize = () => {
    if (userExpenses.length > pageSize) {
      setPageSize((prevState) => prevState + (windowWidth < 768 ? 6 : 7));
    }
  };

  const handleShowAllExpenses = () => {
    setPageSize(userExpenses.length);
  };

  if (
    pageSize < userExpenses.length &&
    prevLength + 1 === userExpenses.length
  ) {
    handleShowAllExpenses();
  }

  const paginatedUserExpenses = userExpenses.filter(
    (exp, index) => index < pageSize
  );

  if (
    (selectOptions,
    selectedPeriod,
    icons,
    incomesExpensesFilterData,
    currenciesSelectOptions)
  ) {
    return (
      <div className="flex justify-center relative">
        <div className="bg-white md:min-w-[680px] w-[400px] mt-[60px] rounded-2xl shadow-xl">
          <div className="text-center">
            <h1 className="text-center font-medium	text-xl pt-3">Expenses</h1>
            <br />
            <table className="table-auto border-spacing-x-10 border-separate">
              <tbody>
                <tr>
                  <td className="text-left text-lg font-medium  pb-5">
                    Period
                  </td>
                  <td className="text-lg font-medium  pb-5">
                    <div className="inline-block relative w-30 ">
                      <SelectField
                        options={selectOptions}
                        name="period"
                        value={selectedPeriod.name}
                        onChange={handleChange}
                      />
                    </div>
                  </td>
                </tr>
                <tr>
                  <td className="text-left text-lg">Total Spent</td>
                  <td className="text-lg">
                    {userExpenses
                      ? totalCalc(userExpenses).map((arr) => arr.join("") + " ")
                      : 0 + `$`}
                  </td>
                </tr>
              </tbody>
            </table>
            <div className="grid grid-cols-3 md:grid-cols-7 gap-4 justify-items-center m-5">
              {paginatedUserExpenses &&
                paginatedUserExpenses.map((expense) => (
                  <button
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                    title={expense.name}
                    className="flex flex-col items-center cursor-pointer  hover:-translate-y-1 hover:scale-110 transition duration-300 ease-in-out"
                    key={expense.id}
                    onClick={() => {
                      handleModalOpen(false, expense);
                    }}
                  >
                    <h1 className="max-w-[90px] overflow-hidden whitespace-nowrap overflow-ellipsis">
                      {expense.name}
                    </h1>
                    <img
                      src={require(`/src/app/common/icons/${expense.icon}.png`)}
                      alt="icon"
                    />
                    <p>
                      {expense.amount}
                      {expense.currency}
                    </p>
                  </button>
                ))}

              <button
                className="flex flex-col items-center cursor-pointer  hover:-translate-y-1 hover:scale-110 transition duration-300 ease-in-out"
                data-bs-toggle="tooltip"
                data-bs-placement="top"
                title="Add new expense"
                onClick={() => {
                  handleModalOpen(true);
                }}
              >
                <h1 className="opacity-0">add</h1>
                <img
                  src={require(`/src/app/common/icons/${icons.add}.png`)}
                  alt="icon"
                />
                <p className="opacity-0">add</p>
              </button>
            </div>

            <button
              disabled={userExpenses.length < pageSize + 1}
              className={
                "hover:text-stone-400" +
                (userExpenses.length < pageSize + 1 ? " text-stone-400" : "")
              }
              onClick={handleIncreasePageSize}
            >
              {arrowDownIcon()}
            </button>

            <br />

            <button
              disabled={userExpenses.length < pageSize + 1}
              className={
                "hover:text-stone-400" +
                (userExpenses.length < pageSize + 1 ? " text-stone-400" : "")
              }
              onClick={handleShowAllExpenses}
            >
              {doubleArrowDownIcon()}
            </button>

            <div className="m-10 mt-0 font-medium hover:text-stone-400 hover:border-[1px] hover:border-black rounded 2xl w-[135px] h-[32px]">
              <button
                onClick={() => {
                  handleOpenItemHistory({
                    incomesExpenses: incomesExpensesFilterData[1].id
                  });
                }}
              >
                <Link to={`/history/${signedUser.id}`}>
                  <h1 className="p-1">Expenses History</h1>
                </Link>
              </button>
            </div>
          </div>
        </div>
        <AddExpenseModal
          modalIsHidden={addModalIsHidden}
          closeModal={handleModalClose}
          selectOptions={currenciesSelectOptions}
          icons={icons}
        />

        <ExpenseModal
          modalIsHidden={expenseModalIsHidden}
          closeModal={handleModalClose}
          expense={selectedExpense}
          selectOptions={selectOptions}
          icons={icons}
        />
      </div>
    );
  }
  return <Loader />;
};

export default ExpensesPage;
