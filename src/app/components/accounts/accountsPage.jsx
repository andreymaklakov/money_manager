import React, { useEffect, useState } from "react";
import { deleteIcon, penIcon } from "../../common/svg";
import AccountModal from "./accountModal";
import { useProviderContext } from "../context";
import UserMoneyTable from "../userMoneyTable";
import AccountRenameModal from "./accountRenameModal";
import api from "../../api";
import Loader from "../loader";

const AccountsPage = () => {
  const [accountModalIsHidden, setAccountModalIsHidden] = useState(true);
  const [renameModalIsHidden, setRenameModalIsHidden] = useState(true);
  const [account, setAccount] = useState({ name: "", id: "" });
  const [selectOptions, setSelectOptions] = useState();

  const { userMoney, handleDeleteUserAccounts } = useProviderContext();

  useEffect(() => {
    api.usersMoney.fetchCurrencies().then((data) => {
      setSelectOptions(data);
    });
  }, []);

  const handleModalOpen = (isRenameModal, name, id) => {
    isRenameModal
      ? setRenameModalIsHidden(false)
      : setAccountModalIsHidden(false);

    isRenameModal && setAccount({ name: name, id: id });
  };

  const handleModalClose = () => {
    setAccountModalIsHidden(true);
    setRenameModalIsHidden(true);
  };

  if (selectOptions) {
    return (
      <div className="flex justify-center">
        <div className="bg-white w-auto m-5 rounded-2xl shadow-xl min-w-[320px] mt-[60px] ">
          <h1 className="text-center font-medium text-xl mt-4">Accounts</h1>
          <br />

          <table className="table-auto border-spacing-x-10 border-separate">
            <tbody>
              <UserMoneyTable
                userMoney={userMoney}
                onClick1={handleDeleteUserAccounts}
                onClick2={handleModalOpen}
                icon1={deleteIcon}
                icon2={penIcon}
              />
            </tbody>
          </table>

          <div>
            <h1
              className="m-10 mt-2 font-medium hover:text-stone-400 hover:border-[1px] hover:border-black rounded 2xl w-[125px] h-[32px] p-1 cursor-pointer"
              onClick={() => {
                handleModalOpen(false);
              }}
            >
              New Account
            </h1>
          </div>
        </div>

        <AccountModal
          modalIsHidden={accountModalIsHidden}
          closeModal={handleModalClose}
          selectOptions={selectOptions}
        />

        <AccountRenameModal
          modalIsHidden={renameModalIsHidden}
          closeModal={handleModalClose}
          item={account}
        />
      </div>
    );
  }
  return <Loader />;
};

export default AccountsPage;
