import React from "react";
import PropTypes from "prop-types";
import { totalCalc } from "../../utils";

const MainPageIncomeAccountIcon = ({ name, isSigned, data }) => {
  return (
    <div
      className={
        "bg-white w-auto min-w-[300px] overflow-y-hidden m-5 rounded-2xl shadow-xl pt-3" +
        (isSigned
          ? " hover:-translate-y-1 hover:scale-110 transition duration-300 ease-in-out"
          : "")
      }
    >
      <h1 className="text-center font-medium	text-xl">{name}</h1>
      <br />
      <table className="table-auto border-spacing-x-10 border-separate pb-5">
        <tbody>
          <tr>
            <td className="text-lg font-medium">Total</td>
            <td className="text-lg font-medium">
              {isSigned && data && data.length
                ? totalCalc(data).map((arr) => arr.join("") + " ")
                : 0 + `$`}
            </td>
          </tr>
          {isSigned && data ? (
            data.map((account, i) => (
              <tr key={i}>
                <td>{account.name}</td>
                <td>
                  {account.amount.toFixed(2)}
                  {account.currency}
                </td>
              </tr>
            ))
          ) : (
            <>
              <tr>
                <td>Cash</td>
                <td>0 {"$"}</td>
              </tr>
              <tr>
                <td>Bank Account</td>
                <td>0 {"$"}</td>
              </tr>
            </>
          )}
        </tbody>
      </table>
    </div>
  );
};

MainPageIncomeAccountIcon.propTypes = {
  name: PropTypes.string,
  isSigned: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  data: PropTypes.array
};

export default MainPageIncomeAccountIcon;
