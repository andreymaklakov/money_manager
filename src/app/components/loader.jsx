import React from "react";
import PropTypes from "prop-types";

const Loader = ({ size }) => {
  return (
    <div className="grid justify-center">
      <div
        className={
          " border-gray-300 border-t-blue-400 rounded-full animate-spin" +
          (size
            ? " border-[5px] w-[30px] h-[30px] ml-[60px]"
            : " border-[16px] w-[120px] h-[120px] mt-[200px]")
        }
      ></div>
      {size ? "" : <p className="text-4xl">Loading</p>}
    </div>
  );
};

Loader.propTypes = {
  size: PropTypes.string
};

export default Loader;
