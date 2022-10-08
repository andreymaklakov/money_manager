import React, { useState, useEffect, useRef, useCallback } from "react";
import PropTypes from "prop-types";
import TextField from "../forms/textField";
import { useProviderContext } from "../context";
import { validator, isValid, toDateFormat, todayDate } from "../../utils";
import { closeIcon } from "../../common/svg";
import TextareaField from "../forms/textareaField";
import SelectField from "../forms/selectField";

const ChangeExpenseModal = ({
  modalIsHidden,
  closeModal,
  expense,
  onClick,
  handleDelete
}) => {
  const [data, setData] = useState({
    amount: "",
    comment: "",
    account: "",
    date: todayDate()
  });
  const [haveAccount, setHaveAccount] = useState(true);
  const [errors, setErrors] = useState({});

  const modalRef = useRef();

  const { userMoney, userExpenses } = useProviderContext();

  const noAcc = [{ name: "No account with such currency", id: "noAcc" }];

  expense &&
    (expense?.expId
      ? expense
      : ((expense = { ...expense, expId: expense?.id }), delete expense?.id));

  useEffect(() => {
    setHaveAccount(true);
  }, [expense]);

  useEffect(() => {
    expense?.expId &&
      setHaveAccount(
        expense.currency
          ? true
          : userMoney.filter(
              (account) =>
                account.currency ===
                userExpenses.filter((exp) => exp.id === expense.expId)[0]
                  ?.currency
            ).length
          ? true
          : false
      );
  }, [expense?.expId, modalIsHidden]);

  useEffect(() => {
    expense?.expId &&
      (expense.id
        ? setData({
            amount: String(expense.amount),
            comment: expense.comment,
            account: expense.account,
            date: expense.date
          })
        : setData((prevState) => ({
            ...prevState,
            account: userMoney.filter(
              (account) =>
                account.currency ===
                userExpenses.filter((exp) => exp.id === expense.expId)[0]
                  .currency
            )[0]?.id
          })));
  }, [expense?.expId, modalIsHidden]);

  const validatorConfig = {
    amount: {
      isRequired: { message: "Amount is required" }
    },
    account: {
      noAccount: { message: "Please first add account with such currency" }
    }
  };

  useEffect(() => {
    validate(data, setErrors, validatorConfig);
  }, [data]);

  const validate = useCallback((data, setErrors, validatorConfig) => {
    const errors = validator(data, validatorConfig);

    setErrors(errors);

    return Object.keys(errors).length === 0;
  }, []);

  const handleChange = ({ target }) => {
    setData((prevState) => ({ ...prevState, [target.name]: target.value }));
  };

  const handleClose = () => {
    closeModal();

    setData({
      amount: "",
      comment: "",
      account:
        expense.account ||
        userMoney.filter(
          (account) =>
            account.currency ===
            userExpenses.filter((exp) => exp.id === expense.expId)[0].currency
        )[0]?.id,
      date: todayDate()
    });

    setHaveAccount(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const isValid = validate(data, setErrors, validatorConfig);

    if (!isValid) return;

    if (
      userMoney.filter((account) => account.id === Number(data.account))[0]
        ?.amount -
        data.amount <
      0
    ) {
      alert("You do not have such amount on this account");
      return;
    }

    onClick(
      {
        ...data,
        date: toDateFormat(data.date),
        account: Number(data.account),
        amount: Number(data.amount)
      },
      expense.expId,
      Date.now(),
      expense.name,
      expense.currency
    );

    expense.id && handleDelete(expense, "expenses");

    handleClose();
  };

  isValid(errors);

  return (
    <div
      ref={modalRef}
      className={
        "flex flex-col justify-center items-center absolute bg-black bg-opacity-50 w-[100vw] h-[110vh]" +
        (modalIsHidden ? " hidden" : "")
      }
      onClick={(event) => {
        event.target === modalRef.current && handleClose();
      }}
    >
      <div className="bg-white h-auto absolute top-[100px] w-auto min-w-[300px] m-5 rounded-2xl shadow-xl ">
        <h1 className="text-center font-medium	text-xl mt-4">{expense?.name}</h1>

        <button
          className="cursor-pointer absolute top-4 right-4 text-stone-800 hover:text-stone-400"
          onClick={() => handleClose()}
        >
          {closeIcon()}
        </button>

        <form
          action=""
          method="post"
          className="px-8 pt-6 pb-8 mb-4 w-[416px]"
          onSubmit={handleSubmit}
        >
          <TextField
            label="Amount:"
            type="number"
            name="amount"
            value={data.amount}
            onChange={handleChange}
            placeholder="Enter amount..."
            error={errors.amount}
          />

          <div className="block relative">
            <h1 className="block text-gray-700 text-sm font-bold  m-2 ml-0">
              Choose Account:
            </h1>

            <SelectField
              options={haveAccount ? userMoney : noAcc}
              name="account"
              value={haveAccount ? data.account : noAcc[0].id}
              onChange={handleChange}
              disabledCheck={expense?.currency}
              error={errors.account}
            />
          </div>

          <TextareaField
            name="comment"
            value={data.comment}
            onChange={handleChange}
            placeholder="Enter your comment..."
          />

          <TextField
            type="date"
            name="date"
            value={data.date}
            onChange={handleChange}
            error={errors.date}
          />

          <div className="flex justify-center mt-8">
            <button
              className={
                "m-10 mt-0 font-medium rounded 2xl w-[130px] h-[32px] p-1" +
                (!isValid(errors)
                  ? " text-stone-400"
                  : " hover:text-stone-400 hover:border-[1px] hover:border-black")
              }
              type="submit"
              disabled={!isValid(errors)}
            >
              Add Expense
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

ChangeExpenseModal.propTypes = {
  modalIsHidden: PropTypes.bool,
  closeModal: PropTypes.func,
  expense: PropTypes.object,
  onClick: PropTypes.func,
  handleDelete: PropTypes.func
};

export default ChangeExpenseModal;
