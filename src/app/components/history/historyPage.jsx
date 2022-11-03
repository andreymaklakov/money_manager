import React, { useEffect, useState } from "react";
import {
  allUsersExpensesIfExpensesAreDeleted,
  allUsersMoneyIfAccountsAreDeleted,
  historyFiltration,
  todayDate,
  toInputFormat
} from "../../utils";
import { useProviderContext } from "../context";
import ChangeExpenseModal from "../expenses/changeExpenseModal";
import IncomeModal from "../income/incomeModal";
import _ from "lodash";
import HistoryTableBody from "./historyTableBody";
import HistoryTableHead from "./historyTableHead";
import { arrowDownIcon } from "../../common/svg";
import api from "../../api";
import FiltrationBar from "../filtrationBar";
import Loader from "../loader";

const HistoryPage = () => {
  const [modalIsHidden, setModalIsHidden] = useState(true);
  const [modalIsPlus, setmodalIsPlus] = useState();
  const [sortBy, setSortBy] = useState({ path: "date", order: "desc" });
  const [expenseChangeModalIsHidden, setExpenseChangeModalIsHidden] =
    useState(true);
  const [accountParams, setAccountParams] = useState({
    name: "",
    accId: "",
    amount: "",
    comment: "",
    date: "",
    id: ""
  });
  const [expenseParams, setExpenseParams] = useState({
    expId: "",
    currency: "",
    name: "",
    amount: "",
    comment: "",
    date: "",
    account: "",
    id: ""
  });
  const [period, setPeriod] = useState("All Time");
  const [incomesExpenses, setIncomesExpenses] = useState();
  const [pageSize, setPageSize] = useState(10);

  const {
    userExpenses,
    userMoney,
    handleDeleteHistory,
    handleAddSpentToUserExpense,
    filterData,
    setFilterData,
    handleClearFilters,
    allUsersHistory,
    signedUser
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
  const [historyFilterData, setHistoryFilterData] = useState();

  useEffect(() => {
    api.filterData.fetchIncomesExpensesFilterData().then((data) => {
      setIncomesExpenses([noFilter, ...data]);
    });
  }, []);

  useEffect(() => {
    setHistoryFilterData(filterData);
  }, [filterData]);

  const handleModalOpen = (item, symbol) => {
    item.item
      ? (setExpenseChangeModalIsHidden(false),
        console.log("item", item),
        setExpenseParams({
          expId: item.item,
          currency: item.currency,
          name: item.name,
          amount: item.amount,
          comment: item.comment,
          date: toInputFormat(item.date),
          account: item.account,
          id: item.id
        }))
      : (setModalIsHidden(false),
        setmodalIsPlus(symbol),
        setAccountParams({
          account: item.accountName,
          accId: item.account,
          amount: item.amount,
          comment: item.comment,
          date: toInputFormat(item.date),
          id: item.id,
          currency: item.currency
        }));
  };

  const handleModalClose = (setData) => {
    setData
      ? (setModalIsHidden(true),
        setData({ amount: "", comment: "", date: todayDate() }))
      : setExpenseChangeModalIsHidden(true);
  };

  const handleSpentChangeExpense = (data, expId, historyId, expName) => {
    handleAddSpentToUserExpense(data, expId, historyId, expName);
  };

  const columns = {
    item: { path: "itemName", name: "Item" },
    amount: { path: "amount", name: "Amount" },
    date: { path: "date", name: "Date" },
    account: { path: "accountName", name: "Account" },
    comment: { path: "comment", name: "Comments" }
  };

  const handleSort = (item) => {
    if (sortBy.path === item) {
      setSortBy({
        ...sortBy,
        order: sortBy.order === "asc" ? "desc" : "asc"
      });
    } else {
      setSortBy({ path: item, order: "asc" });
    }
  };

  const handleChange = ({ target }) => {
    setFilterData((prevState) => ({
      ...prevState,
      [target.name]: target.value
    }));

    if (target.name === "dateTo" || target.name === "dateFrom") {
      setPeriod("");
    }

    setPageSize(10);
  };

  const handleClearHistoryFilters = () => {
    handleClearFilters();

    setPeriod("All Time");
  };

  const handleThisMonthHistory = () => {
    setPeriod("This Month");
    setFilterData((prevState) => ({ ...prevState, dateFrom: "", dateTo: "" }));
  };

  const handleAllTimeHistory = () => {
    setPeriod("All Time");
    setFilterData((prevState) => ({ ...prevState, dateFrom: "", dateTo: "" }));
  };

  const handleDelete = (object, item) => {
    handleDeleteHistory(object, item);
  };

  if (incomesExpenses) {
    let sortedHistory = _.orderBy(
      historyFiltration(
        historyFilterData,
        incomesExpenses,
        period,
        allUsersHistory,
        signedUser,
        userMoney
      ),
      [sortBy.path],
      [sortBy.order]
    );

    const handleIncreasePageSize = () => {
      if (sortedHistory.length > pageSize) {
        setPageSize((prevState) => prevState + 10);
      }
    };

    const paginatedSortedHistory = sortedHistory.filter(
      (h, index) => index < pageSize
    );

    return (
      <div className="flex justify-center relative">
        <div className="bg-white md:min-w-[750px] w-[430px] mt-[60px] rounded-2xl shadow-xl">
          <div className="text-center">
            <h1 className="text-center font-medium	text-xl pt-3">History</h1>
            <br />

            <FiltrationBar
              data={historyFilterData}
              onChange={handleChange}
              incomesExpenses={incomesExpenses}
              accounts={accounts}
              items={items}
              onClear={handleClearHistoryFilters}
              onThisMonth={handleThisMonthHistory}
              onAllTime={handleAllTimeHistory}
              period={period}
            />

            <br />
            {paginatedSortedHistory.length ? (
              <>
                <table className="table-fixed md:border-spacing-x-10 border-spacing-x-2  border-separate text-left mb-5">
                  <HistoryTableHead
                    columns={columns}
                    onSort={handleSort}
                    sortBy={sortBy}
                  />

                  <HistoryTableBody
                    sortedHistory={paginatedSortedHistory}
                    handleModalOpen={handleModalOpen}
                  />
                </table>

                <button
                  disabled={paginatedSortedHistory.length < pageSize}
                  className={
                    "hover:text-stone-400" +
                    (sortedHistory.length <= pageSize ? " text-stone-400" : "")
                  }
                  onClick={handleIncreasePageSize}
                >
                  {arrowDownIcon()}
                </button>
              </>
            ) : (
              <h1 className="text-center pb-4">You do not have history</h1>
            )}
          </div>
        </div>

        <IncomeModal
          modalIsHidden={modalIsHidden}
          modalIsPlus={modalIsPlus}
          closeModal={handleModalClose}
          accountParams={accountParams}
          onClick={handleDelete}
        />

        <ChangeExpenseModal
          modalIsHidden={expenseChangeModalIsHidden}
          closeModal={handleModalClose}
          expense={expenseParams}
          onClick={handleSpentChangeExpense}
          handleDelete={handleDelete}
        />
      </div>
    );
  }
  return <Loader />;
};

export default HistoryPage;
