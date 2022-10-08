import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import IncomeModal from "./incomeModal";
import { useProviderContext } from "../context";
import { minusIcon, plusIcon } from "../../common/svg";
import SelectField from "../forms/selectField";
import UserMoneyTable from "../userMoneyTable";
import api from "../../api";
import { incomeExpenseTimeFilter, todayDate } from "../../utils";
import Loader from "../loader";

const IncomePage = () => {
  const [modalIsHidden, setModalIsHidden] = useState(true);
  const [modalIsPlus, setmodalIsPlus] = useState();
  const [accountParams, setAccountParams] = useState({
    account: "",
    accId: "",
    currency: ""
  });
  const [selectedPeriod, setSelectedPeriod] = useState();
  const [selectOptions, setSelectOptions] = useState();
  const [userMoney, setUserMoney] = useState([]);
  const [incomesExpensesFilterData, setIncomesExpensesFilterData] = useState();

  const { allUsersHistory, allUsersMoney, signedUser, handleOpenItemHistory } =
    useProviderContext();

  useEffect(() => {
    api.filterData.fetchPeriods().then((data) => {
      setSelectOptions(data);
    });
    api.filterData.fetchPeriods().then((data) => {
      setSelectedPeriod(data[0]);
    });
    api.filterData.fetchIncomesExpensesFilterData().then((data) => {
      setIncomesExpensesFilterData(data);
    });
  }, []);

  useEffect(() => {
    selectedPeriod &&
      setUserMoney(
        incomeExpenseTimeFilter(
          selectedPeriod,
          allUsersHistory[signedUser.id].incomes,
          allUsersMoney,
          signedUser
        )
      );
  }, [selectedPeriod, allUsersHistory, signedUser, allUsersMoney]);

  const handleModalOpen = (id, name, symbol, currency) => {
    setModalIsHidden(false);
    setmodalIsPlus(symbol);
    setAccountParams({ account: name, accId: id, accCurrency: currency });
  };

  const handleModalClose = (setData) => {
    setModalIsHidden(true);
    setData({ amount: "", comment: "", date: todayDate() });
  };

  const handleChange = ({ target }) => {
    setSelectedPeriod({ name: target.value });
  };

  if (selectedPeriod && selectOptions && incomesExpensesFilterData) {
    return (
      <div className="flex justify-center">
        <div className="bg-white w-auto m-5 rounded-2xl shadow-xl min-w-[360px] mt-[60px] relative">
          <h1 className="text-center font-medium	text-xl mt-4">Income</h1>
          <br />

          <table className="table-auto border-spacing-x-10 border-separate">
            <tbody>
              <tr>
                <td className="text-lg font-medium pb-5">Period</td>
                <td className="text-lg font-medium pb-5">
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
              <UserMoneyTable
                userMoney={userMoney}
                onClick1={handleModalOpen}
                icon1={plusIcon}
                icon2={minusIcon}
                page="income"
                selectedPeriod={selectedPeriod.name}
              />
            </tbody>
          </table>

          <button
            onClick={() => {
              handleOpenItemHistory({
                incomesExpenses: incomesExpensesFilterData[0].id
              });
            }}
            className="m-[34px] mt-2 font-medium hover:text-stone-400 hover:border-[1px] hover:border-black rounded 2xl w-[125px] h-[32px]"
          >
            <Link to={`/history/${signedUser.id}`}>
              <h1 className="p-1">Income History</h1>
            </Link>
          </button>
        </div>

        <IncomeModal
          modalIsHidden={modalIsHidden}
          modalIsPlus={modalIsPlus}
          closeModal={handleModalClose}
          accountParams={accountParams}
        />
      </div>
    );
  }
  return <Loader />;
};

export default IncomePage;
