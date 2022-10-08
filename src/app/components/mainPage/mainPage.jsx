import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import MainPageIncomeAccountIcon from "./mainPageIncomeAccountIcon";
import { useProviderContext } from "../context";
import { getStartOfMonth } from "../../utils";
import MainPageExpenses from "./mainPageExpenses";
import api from "../../api";
import Loader from "../loader";

const MainPage = () => {
  const [userIncomes, setUserIncomes] = useState([]);
  const [userExpenses, setUserExpenses] = useState([]);
  const [icons, setIcons] = useState();
  const [defExpenses, setDefExpenses] = useState();

  const {
    signedUser,
    userMoney,
    allUsersMoney,
    allUsersHistory,
    allUsersExpenses
  } = useProviderContext();

  useEffect(() => {
    api.icons.fetchIcons().then((data) => {
      setIcons(data);
    });
    api.defExpenses.fetchDefExpenses().then((data) => {
      setDefExpenses(data);
    });
  }, []);

  useEffect(() => {
    signedUser &&
      setUserIncomes(
        allUsersMoney[signedUser.id]?.map((account) => ({
          ...account,
          amount: allUsersHistory[signedUser.id].incomes
            .filter((income) => income.account === account.id)
            .filter(
              (income) =>
                Date.now() - new Date(income.date) <= getStartOfMonth()
            )
            .reduce((accum, income) => accum + income.amount, 0)
        }))
      );
  }, [allUsersMoney, allUsersHistory, signedUser]);

  useEffect(() => {
    signedUser &&
      setUserExpenses(
        allUsersExpenses[signedUser.id]?.map((expense) => ({
          ...expense,
          amount: allUsersHistory[signedUser.id].expenses
            .filter((expenses) => expenses.item === expense.id)
            .filter(
              (expenses) =>
                Date.now() - new Date(expenses.date) <= getStartOfMonth()
            )
            .reduce((accum, expenses) => accum + expenses.amount, 0)
        }))
      );
  }, [allUsersHistory, signedUser, allUsersExpenses]);

  if ((icons, defExpenses)) {
    return (
      <>
        <div className="grid md:grid-cols-2 sm:grid-cols-1 md:gap-[50px] gap-3 pt-10">
          <Link
            to={signedUser ? `/income/${signedUser.id}` : ""}
            className={
              "justify-self-center md:justify-self-end" +
              (signedUser ? "" : " cursor-auto")
            }
          >
            <MainPageIncomeAccountIcon
              name="Income"
              isSigned={signedUser}
              data={userIncomes}
            />
          </Link>

          <Link
            to={signedUser ? `/accounts/${signedUser.id}` : ""}
            className={
              "justify-self-center md:justify-self-start" +
              (signedUser ? "" : " cursor-auto")
            }
          >
            <MainPageIncomeAccountIcon
              name="Accounts"
              isSigned={signedUser}
              data={userMoney}
            />
          </Link>

          <MainPageExpenses
            userExpenses={userExpenses}
            icons={icons}
            defExpenses={defExpenses}
          />
        </div>
      </>
    );
  }
  return <Loader />;
};

export default MainPage;
