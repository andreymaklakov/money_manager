import React from "react";
import PropTypes from "prop-types";

const ChartsChooseBar = ({
  handleShowColumnChart,
  showColumnChart,
  handleShowLineChart,
  showLineChart,
  lineChartIsDisabled,
  handleShowDonutChart,
  showDonutChart,
  donutChartIsDisabled
}) => {
  return (
    <div className="block mx-[25px] md:mx-[0px] md:justify-center flex flex-wrap">
      <div className="block md:inline-block md:mt-6 mr-2 md:w-auto w-[120px]">
        <button
          onClick={handleShowColumnChart}
          className={
            "inline-block appearance-none px-4 pr-8 rounded-lg shadow leading-tight focus:outline-none focus:shadow-outline cursor-pointer border py-2" +
            (showColumnChart
              ? " border-red-600 bg-red-300"
              : " border-gray-400 bg-gray-300 hover:border-red-600 hover:bg-red-200")
          }
        >
          Column Chart
        </button>
      </div>

      <div className="block md:inline-block md:mt-6 mr-2 md:w-auto w-[120px]">
        <button
          onClick={handleShowLineChart}
          className={
            "inline-block appearance-none px-4 pr-8 rounded-lg shadow leading-tight focus:outline-none focus:shadow-outline cursor-pointer border py-2" +
            (showLineChart
              ? " border-red-600 bg-red-300"
              : " border-gray-400 bg-gray-300 hover:border-red-600 hover:bg-red-200") +
            (lineChartIsDisabled
              ? " cursor-auto border-gray-300 bg-gray-200 hover:border-gray-300 hover:bg-gray-200"
              : "")
          }
          disabled={lineChartIsDisabled}
        >
          Line Chart
        </button>
      </div>

      <div className="block md:inline-block md:mt-6 md:w-auto w-[120px]">
        <button
          onClick={handleShowDonutChart}
          className={
            "inline-block appearance-none px-4 pr-8 rounded-lg shadow leading-tight focus:outline-none focus:shadow-outline cursor-pointer border py-2" +
            (showDonutChart
              ? " border-red-600 bg-red-300"
              : " border-gray-400 bg-gray-300 hover:border-red-600 hover:bg-red-200") +
            (donutChartIsDisabled
              ? " cursor-auto border-gray-300 bg-gray-200 hover:border-gray-300 hover:bg-gray-200"
              : "")
          }
          disabled={donutChartIsDisabled}
        >
          Donut Chart
        </button>
      </div>
    </div>
  );
};

ChartsChooseBar.propTypes = {
  handleShowColumnChart: PropTypes.func,
  showColumnChart: PropTypes.bool,
  handleShowLineChart: PropTypes.func,
  showLineChart: PropTypes.bool,
  lineChartIsDisabled: PropTypes.bool,
  handleShowDonutChart: PropTypes.func,
  showDonutChart: PropTypes.bool,
  donutChartIsDisabled: PropTypes.bool
};

export default ChartsChooseBar;
