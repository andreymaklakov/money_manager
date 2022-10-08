import React from "react";
import { totalCalc } from "../../utils";
import { useProviderContext } from "../context";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const MainPageExpenses = ({ userExpenses, icons, defExpenses }) => {
  const { signedUser } = useProviderContext();

  return (
    <div
      className={
        "md:col-start-1 md:col-end-3 justify-self-center bg-white md:w-[680px] w-[300px] max-h-[310px] overflow-y-hidden rounded-2xl shadow-xl py-3 m-5 my-4 md:my-0" +
        (signedUser
          ? " hover:-translate-y-1 hover:scale-110 transition duration-300 ease-in-out"
          : "")
      }
    >
      <Link
        to={signedUser ? `/expenses/${signedUser.id}` : ""}
        className={signedUser ? "" : "cursor-auto"}
      >
        <div>
          <h1 className="text-center font-medium	text-xl">Expenses</h1>
          <br />
          <table className="table-auto border-spacing-x-10 border-separate ">
            <tbody>
              <tr>
                <td className="text-lg font-medium">Total Spent</td>
                <td className="text-lg font-medium">
                  {userExpenses
                    ? totalCalc(userExpenses).map((arr) => arr.join("") + " ")
                    : 0 + `$`}
                </td>
              </tr>
            </tbody>
          </table>
          <div className="grid grid-cols-3 md:grid-cols-7 gap-4 justify-items-center m-5">
            {(signedUser
              ? userExpenses
                ? userExpenses
                : "...loading"
              : defExpenses
            )?.map((expense) => (
              <div className="flex flex-col items-center" key={expense.id}>
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
              </div>
            ))}
            <div className="flex flex-col items-center">
              <h1 className="opacity-0">add</h1>
              <img
                src={require(`/src/app/common/icons/${icons.add}.png`)}
                alt="icon"
              />
              <p className="opacity-0">add</p>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

MainPageExpenses.propTypes = {
  userExpenses: PropTypes.array,
  icons: PropTypes.object,
  defExpenses: PropTypes.array
};

export default MainPageExpenses;
