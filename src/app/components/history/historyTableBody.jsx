import React from "react";
import { deleteIcon, penIcon } from "../../common/svg";
import PropTypes from "prop-types";
import { useProviderContext } from "../context";

const HistoryTableBody = ({ sortedHistory, handleModalOpen }) => {
  const { handleDeleteHistory, userMoney, userExpenses } = useProviderContext();

  return (
    <tbody>
      {sortedHistory &&
        sortedHistory.map((item) => (
          <tr key={item.id}>
            <td
              data-bs-toggle="tooltip"
              data-bs-placement="top"
              title={item.itemName || "Income"}
              className="md:text-base text-sm pb-2 md:max-w-[80px] max-w-[70px] overflow-hidden whitespace-nowrap overflow-ellipsis"
            >
              {item.itemName || <h1 className="font-medium">Income</h1>}
            </td>
            <td
              data-bs-toggle="tooltip"
              data-bs-placement="top"
              title={item.amount + item.currency}
              className="md:text-base text-sm pb-2 md:max-w-[70px] max-w-[50px] overflow-hidden whitespace-nowrap overflow-ellipsis"
            >
              {item.amount}
              {item.currency}
            </td>
            <td className="md:text-base text-sm pb-2">
              {item.date.split(",").reverse().join(".")}
            </td>
            <td
              data-bs-toggle="tooltip"
              data-bs-placement="top"
              title={item.accountName}
              className="md:text-base text-sm pb-2 md:max-w-[80px] max-w-[50px] overflow-hidden whitespace-nowrap overflow-ellipsis"
            >
              {item.accountName}
            </td>
            <td
              data-bs-toggle="tooltip"
              data-bs-placement="top"
              title={item.comment}
              className="md:text-base text-sm pb-2 block md:w-[150px] w-[50px] overflow-hidden whitespace-nowrap overflow-ellipsis"
            >
              {item.comment}
            </td>

            <td>
              <button
                className="ml-[-10px]"
                onClick={() =>
                  handleDeleteHistory(item, item.item ? "expenses" : "incomes")
                }
              >
                {deleteIcon("history")}
              </button>
            </td>
            <td>
              <button
                className={
                  "md:ml-[-45px] ml-[-15px]" +
                  ((
                    item.item
                      ? !userExpenses?.filter((exp) => exp.id === item.item)
                          .length ||
                        !userMoney?.filter((acc) => acc.id === item.account)
                          .length
                      : !userMoney?.filter((acc) => acc.id === item.account)
                          .length
                  )
                    ? " text-stone-400"
                    : "")
                }
                disabled={
                  item.item
                    ? !userExpenses?.filter((exp) => exp.id === item.item)
                        .length
                    : !userMoney?.filter((acc) => acc.id === item.account)
                        .length
                }
                onClick={() => {
                  handleModalOpen(item, item.amount > 0 ? true : false);
                }}
              >
                {penIcon("history")}
              </button>
            </td>
          </tr>
        ))}
    </tbody>
  );
};

HistoryTableBody.propTypes = {
  sortedHistory: PropTypes.array,
  handleModalOpen: PropTypes.func
};

export default HistoryTableBody;
