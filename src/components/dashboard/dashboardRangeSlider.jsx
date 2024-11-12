import React, { useState } from "react";

const DashboardRangeSlider = ({
  title,
  min,
  max,
  handleChangeValue,
  profit,
}) => {
  const [pickedValue, setPickedValue] = useState(0);

  const handleChange = (event) => {
    setPickedValue(event.target.value);
    handleChangeValue(event.target.value);
  };

  return (
    <div>
      <label
        htmlFor="default-range"
        className="block mb-2 text-lg font-medium text-gray-900 dark:text-white"
      >
        {title}
      </label>
      <p className="aos mb-3">
        Current set value:{" "}
        <span className="text-proprimary font-bold text-lg">
          {pickedValue}% = ({profit})
        </span>
      </p>
      <div className="flex items-center gap-3">
        <p>0</p>
        <input
          id="default-range"
          type="range"
          onChange={handleChange}
          value={pickedValue}
          min={min}
          max={max}
          className="w-full h-2 rounded-lg appearance-none bg-gray-200   cursor-pointer dark:bg-gray-700"
        />
        <p>100</p>
      </div>
    </div>
  );
};

export default DashboardRangeSlider;
