import React, { useState } from "react";

const ControlledSwitch = ({ isChecked, onChange, title }) => {
  return (
    <label className="inline-flex items-center cursor-pointer">
      <input
        type="checkbox"
        checked={isChecked}
        onChange={onChange}
        className="sr-only peer"
      />
      <div
        className={`relative w-11 h-6 rounded-full transition-all
        ${
          isChecked
            ? "bg-blue-600 peer-checked:after:translate-x-full"
            : "bg-gray-200 dark:bg-gray-700"
        }
        peer-focus:outline-none peer-focus:ring-4 
        peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800`}
      >
        <div
          className={`absolute top-[2px] left-[2px] bg-white border border-gray-300 
          rounded-full h-5 w-5 transition-all 
          ${
            isChecked ? "translate-x-full border-white" : "dark:border-gray-600"
          }`}
        ></div>
      </div>
      <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">
        {title}
      </span>
    </label>
  );
};

export default ControlledSwitch;