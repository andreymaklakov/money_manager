import React, { useState, useEffect, useRef, useCallback } from "react";
import PropTypes from "prop-types";
import TextField from "../forms/textField";
import { useProviderContext } from "../context";
import { validator, isValid, toDateFormat, todayDate } from "../../utils";
import { closeIcon } from "../../common/svg";
import TextareaField from "../forms/textareaField";

const IncomeModal = ({
  modalIsHidden,
  modalIsPlus,
  closeModal,
  accountParams,
  onClick
}) => {
  const [data, setData] = useState({
    amount: "",
    comment: "",
    date: todayDate()
  });
  const [errors, setErrors] = useState({});

  const modalRef = useRef();

  useEffect(() => {
    let res;

    accountParams.id &&
      setData({
        amount: accountParams.amount
          ? accountParams.amount > 0
            ? String(accountParams.amount)
            : (((res = String(accountParams.amount).split("")), res.shift()),
              res.join(""))
          : "",
        comment: accountParams.comment,
        date: accountParams.date
      });
  }, [accountParams]);

  useEffect(() => {
    validate(data, setErrors);
  }, [data]);

  const validate = useCallback((data, setErrors) => {
    const errors = validator(data);

    setErrors(errors);

    return Object.keys(errors).length === 0;
  }, []);

  const { handleUserIncomes, userMoney } = useProviderContext();

  const handleChange = ({ target }) => {
    setData((prevState) => ({ ...prevState, [target.name]: target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const isValid = validate(data, setErrors);

    if (!isValid) return;

    if (
      !modalIsPlus &&
      userMoney.filter((account) => account.id === accountParams.accId)[0]
        .amount -
        data.amount <
        0
    ) {
      alert("You can not remove more than you have");
      return;
    }

    handleUserIncomes(
      Date.now(),
      accountParams.accId,
      {
        ...data,
        date: toDateFormat(data.date),
        amount: modalIsPlus ? Number(data.amount) : Number(-data.amount)
      },
      accountParams.account,
      accountParams.accCurrency
    );

    accountParams.id && onClick(accountParams, "incomes");

    closeModal(setData);
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
        event.target === modalRef.current && closeModal(setData);
      }}
    >
      <div className="bg-white h-auto w-auto absolute top-[100px] min-w-[300px] m-5 rounded-2xl shadow-xl">
        <h1 className="text-center font-medium	text-xl mt-4">
          {accountParams.account}
        </h1>

        <button
          className="cursor-pointer absolute top-4 right-4 text-stone-800 hover:text-stone-400"
          onClick={() => closeModal(setData)}
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
              {modalIsPlus ? "Add Income" : "Remove Income"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

IncomeModal.propTypes = {
  modalIsHidden: PropTypes.bool,
  modalIsPlus: PropTypes.bool,
  closeModal: PropTypes.func,
  accountParams: PropTypes.object,
  onClick: PropTypes.func
};

export default IncomeModal;
