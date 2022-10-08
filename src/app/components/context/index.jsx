import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";

import api from "../../api";

const Context = React.createContext();

export const useProviderContext = () => {
  return useContext(Context);
};

const Provider = ({ children }) => {
  const [allUsers, setAllUsers] = useState();
  const [signedUser, setSignedUser] = useState("");
  const [allUsersMoney, setAllUsersMoney] = useState();
  const [userMoney, setUserMoney] = useState([]);
  const [allUsersExpenses, setAllUsersExpenses] = useState();
  const [userExpenses, setUserExpenses] = useState();
  const [allUsersHistory, setAllUsersHistory] = useState("");
  const [allUsersIncomes, setAllUsersIncomes] = useState();
  const [filterData, setFilterData] = useState({
    incomesExpenses: "",
    accounts: "",
    items: "",
    dateFrom: "",
    dateTo: ""
  });

  useEffect(() => {
    api.users.fetchUsers().then((data) => {
      setAllUsers(data);
    });
    api.usersMoney.fetchUsersMoney().then((data) => {
      setAllUsersMoney(data);
    });
    api.usersMoney.fetchUsersExpenses().then((data) => {
      setAllUsersExpenses(data);
    });
    api.usersMoney.fetchUsersIncomes().then((data) => {
      setAllUsersIncomes(data);
    });
    api.usersHistory.fetchUsersHistory().then((data) => {
      setAllUsersHistory(data);
    });
  }, []);

  useEffect(() => {
    signedUser &&
      allUsersMoney[signedUser.id] &&
      setAllUsersIncomes((prevState) => ({
        ...prevState,
        [signedUser.id]: allUsersMoney[signedUser.id]?.map((account) => ({
          ...account,
          amount: allUsersHistory[signedUser?.id].incomes
            .filter((income) => income.account === account.id)
            .reduce((accum, income) => accum + income.amount, 0)
        }))
      }));

    signedUser &&
      allUsersMoney[signedUser.id] &&
      setAllUsersMoney((prevState) => ({
        ...prevState,
        [signedUser.id]: allUsersMoney[signedUser.id]?.map((account) => ({
          ...account,
          amount: allUsersHistory[signedUser?.id].incomes
            .filter((income) => income.account === account.id)
            .reduce((accum, income) => accum + income.amount, 0)
        }))
      }));

    signedUser &&
      allUsersMoney[signedUser.id] &&
      setUserMoney(
        allUsersMoney[signedUser.id]?.map((account) => ({
          ...account,
          amount: allUsersHistory[signedUser?.id].incomes
            .filter((income) => income.account === account.id)
            .reduce((accum, income) => accum + income.amount, 0)
        }))
      );
  }, [signedUser, allUsersHistory[signedUser?.id]?.incomes]);

  useEffect(() => {
    signedUser &&
      allUsersExpenses[signedUser?.id] &&
      setAllUsersExpenses((prevState) => ({
        ...prevState,
        [signedUser.id]: allUsersExpenses[signedUser?.id]?.map((exp) => ({
          ...exp,
          amount: allUsersHistory[signedUser?.id].expenses
            .filter((expense) => expense.item === exp.id)
            .reduce((accum, expense) => accum + expense.amount, 0)
        }))
      }));

    signedUser &&
      allUsersExpenses[signedUser?.id] &&
      setUserExpenses(
        allUsersExpenses[signedUser?.id]?.map((exp) => ({
          ...exp,
          amount: allUsersHistory[signedUser?.id].expenses
            .filter((expense) => expense.item === exp.id)
            .reduce((accum, expense) => accum + expense.amount, 0)
        }))
      );
  }, [signedUser, allUsersHistory[signedUser?.id]?.expenses]);

  const handleAddUser = (email, password, name, surname, currency) => {
    setAllUsers((prevState) => {
      return [
        ...prevState,
        {
          id: Date.now(),
          email: email,
          password: surname,
          name: name,
          surname: password,
          currency: currency
        }
      ];
    });

    setSignedUser({
      id: Date.now(),
      email: email,
      password: surname,
      name: name,
      surname: password,
      currency: currency
    });
  };

  const handleSignedUser = (user) => {
    setSignedUser(user);
  };

  const handleDeleteUserAccounts = (id) => {
    setUserMoney((prevState) =>
      prevState.filter((account) => account.id !== id)
    );

    setAllUsersMoney((prevState) => ({
      ...prevState,
      [signedUser.id]: prevState[signedUser.id].filter(
        (account) => account.id !== id
      )
    }));
  };

  const handleAddUserAccounts = (data) => {
    setUserMoney((prevState) => [...prevState, data]);

    setAllUsersMoney((prevState) => ({
      ...prevState,
      [signedUser.id]: [...prevState[signedUser.id], data]
    }));
  };

  const handleAddNewUserAccounts = (data) => {
    setAllUsersMoney((prevState) => ({ ...prevState, [signedUser.id]: data }));
    setUserMoney(data);
  };

  const handleRenameUserAccount = (id, name) => {
    setUserMoney((prevState) =>
      prevState.map((account) =>
        account.id === id ? { ...account, name: name } : { ...account }
      )
    );

    setAllUsersMoney((prevState) => ({
      ...prevState,
      [signedUser.id]: prevState[signedUser.id].map((acc) =>
        acc.id === id ? { ...acc, name: name } : { ...acc }
      )
    }));
  };

  const handleUserIncomes = (historyId, accId, data, accName, accCurrency) => {
    setAllUsersHistory((prevState) => ({
      ...prevState,
      [signedUser.id]: {
        ...prevState[signedUser.id],
        incomes: [
          ...prevState[signedUser.id].incomes,
          {
            ...data,
            account: accId,
            id: historyId,
            name:
              userMoney.filter((acc) => acc.id === accId)[0]?.name || accName,
            currency:
              userMoney.filter((acc) => acc.id === accId)[0]?.currency ||
              accCurrency
          }
        ]
      }
    }));
  };

  const handleAddUserExpenses = (data) => {
    setUserExpenses((prevState) => [...prevState, data]);

    setAllUsersExpenses((prevState) => ({
      ...prevState,
      [signedUser.id]: [...prevState[signedUser.id], data]
    }));
  };

  const handleAddNewUserExpenses = (defExpenses) => {
    defExpenses = defExpenses.map((expense) => ({
      ...expense,
      currency: signedUser.currency
    }));

    setUserExpenses(defExpenses);

    setAllUsersExpenses((prevState) => ({
      ...prevState,
      [signedUser.id]: defExpenses
    }));
  };

  const handleDeleteUserExpense = (data) => {
    setUserExpenses((prevState) =>
      prevState.filter((exp) => exp.id !== data.id)
    );

    setAllUsersExpenses((prevState) => ({
      ...prevState,
      [signedUser.id]: prevState[signedUser.id].filter(
        (exp) => exp.id !== data.id
      )
    }));
  };

  const handleIconChangeUserExpense = (data) => {
    setUserExpenses((prevState) =>
      prevState.map((expense) => (expense.id === data.id ? data : expense))
    );

    setAllUsersExpenses((prevState) => ({
      ...prevState,
      [signedUser.id]: prevState[signedUser.id].map((expense) =>
        expense.id === data.id ? data : expense
      )
    }));
  };

  const handleRenameUserExpense = (id, name) => {
    setUserExpenses((prevState) =>
      prevState.map((expense) =>
        expense.id === id ? { ...expense, name: name } : { ...expense }
      )
    );

    setAllUsersExpenses((prevState) => ({
      ...prevState,
      [signedUser.id]: prevState[signedUser.id].map((expense) =>
        expense.id === id ? { ...expense, name: name } : { ...expense }
      )
    }));
  };

  const handleAddSpentToUserExpense = (
    data,
    expId,
    historyId,
    expName,
    expCurrency
  ) => {
    setUserMoney((prevState) =>
      prevState.map((account) =>
        account.id === data.account
          ? { ...account, amount: account.amount - data.amount }
          : account
      )
    );

    setAllUsersMoney((prevState) => ({
      ...prevState,
      [signedUser.id]: allUsersMoney[signedUser.id].map((account) =>
        account.id === data.account
          ? { ...account, amount: account.amount - data.amount }
          : account
      )
    }));

    setAllUsersHistory((prevState) => ({
      ...prevState,
      [signedUser.id]: {
        ...prevState[signedUser.id],
        expenses: [
          ...prevState[signedUser.id].expenses,
          {
            ...data,
            item: expId,
            id: historyId,
            name:
              userExpenses.filter((exp) => exp.id === expId)[0]?.name ||
              expName,
            currency:
              userMoney.filter((acc) => acc.id === data.account)[0]?.currency ||
              expCurrency
          }
        ]
      }
    }));
  };

  const handleChangeUserParams = (name, surname, email, password) => {
    setSignedUser({
      ...signedUser,
      name: name ? name : signedUser.name,
      surname: surname ? surname : signedUser.surname,
      email: email ? email : signedUser.email,
      password: password ? password : signedUser.password
    });

    setAllUsers((prevState) => {
      prevState.map((user) => {
        if (user.id === signedUser.id) {
          (user.name = name ? name : signedUser.name),
            (user.surname = surname ? surname : signedUser.surname),
            (user.email = email ? email : signedUser.email),
            (user.password = password ? password : signedUser.password);
        }
      });
      return prevState;
    });
  };

  const handleAddNewUserHistory = () => {
    setAllUsersHistory((prevState) => ({
      ...prevState,
      [signedUser.id]: {
        expenses: [],
        incomes: []
      }
    }));
  };

  const handleDeleteHistory = (item, itemName) => {
    setAllUsersHistory((prevState) => ({
      ...prevState,
      [signedUser.id]: {
        ...prevState[signedUser.id],
        [itemName]: prevState[signedUser.id][itemName].filter(
          (it) => it.id !== item.id
        )
      }
    }));

    itemName === "expenses"
      ? (setUserMoney((prevState) =>
          prevState.map((account) =>
            account.id === item.account
              ? { ...account, amount: account.amount + item.amount }
              : account
          )
        ),
        setAllUsersMoney((prevState) => ({
          ...prevState,
          [signedUser.id]: allUsersMoney[signedUser.id].map((account) =>
            account.id === item.account
              ? { ...account, amount: account.amount + item.amount }
              : account
          )
        })))
      : setAllUsersIncomes((prevState) => ({
          ...prevState,
          [signedUser.id]: allUsersMoney[signedUser.id].map((account) =>
            account.id === item.account
              ? { ...account, amount: account.amount - item.amount }
              : account
          )
        }));
  };

  const handleClearFilters = () => {
    setFilterData({
      incomesExpenses: "",
      accounts: "",
      items: "",
      dateFrom: "",
      dateTo: ""
    });
  };

  const handleOpenItemHistory = (data) => {
    handleClearFilters();
    setFilterData((prevState) => ({ ...prevState, ...data }));
  };

  return (
    <Context.Provider
      value={{
        allUsers,
        handleAddUser,
        signedUser,
        handleSignedUser,
        userMoney,
        allUsersMoney,
        allUsersIncomes,
        allUsersHistory,
        handleDeleteUserAccounts,
        handleAddUserAccounts,
        handleAddNewUserAccounts,
        handleRenameUserAccount,
        handleUserIncomes,
        allUsersExpenses,
        userExpenses,
        handleAddUserExpenses,
        handleAddNewUserExpenses,
        handleDeleteUserExpense,
        handleIconChangeUserExpense,
        handleRenameUserExpense,
        handleAddSpentToUserExpense,
        handleChangeUserParams,
        handleDeleteHistory,
        handleAddNewUserHistory,
        filterData,
        setFilterData,
        handleOpenItemHistory,
        handleClearFilters
      }}
    >
      {children}
    </Context.Provider>
  );
};

Provider.propTypes = {
  children: PropTypes.array
};

export default Provider;
