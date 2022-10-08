import React, { useState, useEffect, useRef, useCallback } from "react";
import PropTypes from "prop-types";
import { closeIcon } from "../../common/svg";
import TextField from "../forms/textField";
import { validator, isValid } from "../../utils";

const ExpenseRenameModal = ({
  modalIsHidden,
  closeModal,
  name,
  id,
  onChange
}) => {
  const [data, setData] = useState({ name: "", id: "" });
  const [errors, setErrors] = useState({});

  const modalRef = useRef();

  useEffect(() => {
    setData((prevState) => ({ ...prevState, name: name, id: id }));
  }, [modalIsHidden]);

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

  const handleSubmit = (e) => {
    e.preventDefault();

    const isValid = validate(data, setErrors);

    if (!isValid) return;

    onChange(data.id, data.name);

    closeModal();
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
        event.target === modalRef.current && closeModal();
      }}
    >
      <div className="bg-white h-auto absolute top-[100px] w-auto min-w-[300px] m-5 rounded-2xl shadow-xl ">
        <button
          className="cursor-pointer absolute top-4 right-4 text-stone-800 hover:text-stone-400"
          onClick={() => {
            closeModal();
          }}
        >
          {closeIcon()}
        </button>

        <form
          method="post"
          className="px-8 pt-6 pb-8 mb-4"
          onSubmit={handleSubmit}
        >
          <TextField
            label="Expense Name:"
            name="name"
            value={data.name}
            onChange={handleChange}
            placeholder="Enter Expense Name..."
            error={errors.name}
          />

          <div className="flex justify-center mt-8">
            <button
              className={
                "m-10 mt-0 font-medium rounded 2xl w-[125px] p-1 h-[32px]" +
                (isValid(errors)
                  ? " hover:text-stone-400 hover:border-[1px] hover:border-black"
                  : " text-stone-400")
              }
              type="submit"
              disabled={!isValid(errors)}
            >
              Change Name
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

ExpenseRenameModal.propTypes = {
  modalIsHidden: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
  name: PropTypes.string,
  id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  onChange: PropTypes.func
};

export default ExpenseRenameModal;
