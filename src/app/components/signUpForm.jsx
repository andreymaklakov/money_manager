import React, { useState, useEffect, useCallback } from "react";
import { useHistory } from "react-router-dom";
import TextField from "./forms/textField";
import { validator, isValid } from "../utils";
import { useProviderContext } from "./context";
import SelectField from "./forms/selectField";
import api from "../api";
import Loader from "./loader";

const SingUpForm = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
    name: "",
    surname: "",
    passwordConfirm: "",
    currency: "$"
  });
  const [errors, setErrors] = useState({});
  const [haveUser, setHaveUser] = useState(false);
  const [selectOptions, setSelectOptions] = useState();
  const [defExpenses, setDefExpenses] = useState();

  useEffect(() => {
    api.usersMoney.fetchCurrencies().then((data) => {
      setSelectOptions(data);
    });
    api.defExpenses.fetchDefExpenses().then((data) => {
      setDefExpenses(data);
    });
  }, []);

  useEffect(() => {
    setHaveUser(
      allUsers.filter((user) => user.email === data.email).length ? true : false
    );
  }, [data.email]);

  const history = useHistory();

  const {
    allUsers,
    handleAddUser,
    signedUser,
    handleAddNewUserAccounts,
    handleAddNewUserExpenses,
    handleAddNewUserHistory
  } = useProviderContext();

  const handleChange = ({ target }) => {
    setData((prevState) => ({ ...prevState, [target.name]: target.value }));
  };

  useEffect(() => {
    validate(data, setErrors);
  }, [data]);

  const validate = useCallback((data, setErrors) => {
    const errors = validator(data);

    setErrors(errors);

    return Object.keys(errors).length === 0;
  }, []);

  const handleLogIn = (id) => {
    history.replace(`/main/${id}`);
  };

  useEffect(() => {
    signedUser && handleLogIn(signedUser.id);
    signedUser &&
      handleAddNewUserAccounts([
        {
          id: Date.now() + 1,
          name: "Cash",
          amount: 0,
          currency:
            data.currency === "$"
              ? data.currency
              : selectOptions.filter(
                  (cur) => cur.id === Number(data.currency)
                )[0].name
        },
        {
          id: Date.now() + 2,
          name: "Bank Account",
          amount: 0,
          currency:
            data.currency === "$"
              ? data.currency
              : selectOptions.filter(
                  (cur) => cur.id === Number(data.currency)
                )[0].name
        }
      ]);

    signedUser && handleAddNewUserExpenses(defExpenses);
    signedUser && handleAddNewUserHistory();
  }, [signedUser]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const isValid = validate(data, setErrors);

    if (!isValid) return;

    if (haveUser) {
      alert(
        "User with this Email already exist, please Log In, or choose another Email."
      );
      return;
    }

    handleAddUser(
      data.email,
      data.surname,
      data.name,
      data.password,
      data.currency === "$"
        ? data.currency
        : selectOptions.filter((cur) => cur.id === Number(data.currency))[0]
            .name
    );
  };

  isValid(errors);

  if (selectOptions) {
    return (
      <div className="flex flex-col justify-center items-center pt-10">
        <h1 className="text-center font-medium	text-xl">Sign Up</h1>
        <div className="bg-white h-auto w-auto min-w-[300px] m-5 rounded-2xl shadow-xl">
          <form
            action=""
            method="post"
            className="px-8 pt-6 pb-8 mb-4"
            onSubmit={handleSubmit}
          >
            <TextField
              label="Name:"
              name="name"
              value={data.name}
              onChange={handleChange}
              placeholder="Enter your Name..."
              error={errors.name}
            />

            <TextField
              label="Surname:"
              name="surname"
              value={data.surname}
              onChange={handleChange}
              placeholder="Enter your Surname..."
              error={errors.surname}
            />

            <div>
              <h1 className="inline-block text-gray-700 text-sm font-bold mr-5 ">
                Select Default Currency:
              </h1>

              <SelectField
                options={selectOptions}
                name="currency"
                value={data.currency}
                onChange={handleChange}
              />
            </div>

            <TextField
              label="Email:"
              type="email"
              name="email"
              value={data.email}
              onChange={handleChange}
              placeholder="Enter your Email..."
              error={errors.email}
            />

            <TextField
              label="Password:"
              type="password"
              name="password"
              value={data.password}
              onChange={handleChange}
              placeholder="Enter your password..."
              error={errors.password}
            />

            <TextField
              label="Confirm your Password:"
              type="password"
              name="passwordConfirm"
              value={data.passwordConfirm}
              onChange={handleChange}
              placeholder="Enter your password..."
              error={errors.passwordConfirm}
            />

            <div className="flex justify-end mt-8">
              <button
                className={
                  "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" +
                  (!isValid(errors) ? " hover:bg-blue-500" : "")
                }
                type="submit"
                disabled={!isValid(errors)}
              >
                Sign Up
              </button>
            </div>
          </form>
        </div>
        <p className="text-center text-gray-500 text-xs">
          &copy;2022 Money Manager. All rights reserved.
        </p>
      </div>
    );
  }
  return <Loader />;
};

export default SingUpForm;
