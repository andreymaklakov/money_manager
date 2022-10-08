import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../api";
import { useProviderContext } from "../context";
import Loader from "../loader";

const NavBar = () => {
  const [logo, setLogo] = useState();

  const { signedUser, handleSignedUser, handleClearFilters } =
    useProviderContext();

  useEffect(() => {
    api.icons.fetchLogo().then((data) => setLogo(data));
  }, []);

  return (
    <nav className="flex items-center justify-between flex-wrap p-1 shadow-md">
      <div className="h-12 w-40 flex items-center flex-shrink-0 mt-[3px] mr-6">
        <button>
          <Link to={`/main/${signedUser?.id}`}>
            {logo ? <img src={logo} alt="logo" /> : <Loader size="small" />}
          </Link>
        </button>
      </div>
      <div className="w-full block flex-grow md:flex md:items-center md:w-auto">
        <div className="md:flex-grow">
          <Link
            to={`/main/${signedUser?.id}`}
            className="block mt-2 text-lg md:inline-block md:mt-0 hover:text-stone-400 md:mr-4 border-b-[1px] border-black md:border-0"
          >
            Main
          </Link>

          <div
            className={
              "block mt-2 text-lg md:inline-block md:mt-0 hover:text-stone-400 md:mr-4 border-b-[1px] border-black md:border-0" +
              (signedUser ? "" : " text-stone-400")
            }
          >
            <button className="cursor-auto" onClick={handleClearFilters}>
              <Link
                to={`/history/${signedUser?.id}`}
                className={signedUser ? "" : " cursor-auto "}
              >
                Payment history
              </Link>
            </button>
          </div>

          <div
            className={
              "block mt-2 text-lg md:inline-block md:mt-0 hover:text-stone-400 md:mr-4 border-b-[1px] border-black md:border-0" +
              (signedUser ? "" : " text-stone-400")
            }
          >
            <button className="cursor-auto" onClick={handleClearFilters}>
              <Link
                to={`/stats/${signedUser?.id}`}
                className={signedUser ? "" : " cursor-auto "}
              >
                Statistics
              </Link>
            </button>
          </div>
        </div>

        {signedUser ? (
          <div>
            <Link
              to={`/settings/${signedUser.id}`}
              className="block mt-2 text-lg md:inline-block md:mt-0 hover:text-stone-400 md:px-4 border-b-[1px] border-black md:border-0"
            >
              {signedUser.name} {signedUser.surname}
            </Link>

            <div
              className="block mt-2 text-lg md:inline-block md:mt-0 hover:text-stone-400 md:px-4 border-b-[1px] border-black md:border-0 cursor-pointer"
              onClick={() => handleSignedUser("")}
            >
              Log Out
            </div>
          </div>
        ) : (
          <div>
            <Link
              className="block mt-2 text-lg md:inline-block md:mt-0 hover:text-stone-400 md:px-4 border-b-[1px] border-black md:border-0"
              to="/login"
            >
              Log In
            </Link>

            <Link
              to="/signup"
              className="block mt-2 text-lg md:inline-block md:mt-0 hover:text-stone-400 md:px-4 border-b-[1px] border-black md:border-0"
            >
              Sign Up
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
