import React from "react";
import { totalCalc } from "../utils";
import PropTypes from "prop-types";

const UserMoneyTable = ({
  userMoney,
  onClick1,
  onClick2,
  icon1,
  icon2,
  page,
  selectedPeriod
}) => {
  return (
    <>
      <tr>
        <td className="text-lg pb-2">Total</td>
        <td className="text-lg pb-2 pr-2">
          {userMoney && userMoney.length
            ? totalCalc(userMoney).map((arr) => arr.join("") + " ")
            : 0 + `$`}
        </td>
      </tr>

      {userMoney
        ? userMoney.map((account, i) => (
            <tr key={i}>
              <td>{account.name}</td>
              <td className="mr-6">
                {Number(account.amount).toFixed(2)}
                {account.currency}
              </td>
              <td>
                <button
                  className={
                    (page ? " ml-[-70px]" : " ml-[-40px]") +
                    (i > 0 ? " my-[-10px] " : " mb-[-10px]")
                  }
                  onClick={() => {
                    onClick1(account.id, account.name, true, account.currency);
                  }}
                >
                  {icon1()}
                </button>

                <button
                  className={i > 0 ? " my-[-10px] " : " mb-[-10px]"}
                  onClick={
                    onClick2
                      ? () => {
                          onClick2(true, account.name, account.id);
                        }
                      : () => {
                          onClick1(account.id, account.name, false);
                        }
                  }
                  disabled={
                    (page && account.amount <= 0) ||
                    (page && selectedPeriod !== "This Month")
                  }
                >
                  {icon2(account.amount, selectedPeriod)}
                </button>
              </td>
            </tr>
          ))
        : ""}
    </>
  );
};

UserMoneyTable.propTypes = {
  userMoney: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  onClick1: PropTypes.func,
  onClick2: PropTypes.func,
  icon1: PropTypes.func,
  icon2: PropTypes.func,
  page: PropTypes.string,
  selectedPeriod: PropTypes.string
};

export default UserMoneyTable;
