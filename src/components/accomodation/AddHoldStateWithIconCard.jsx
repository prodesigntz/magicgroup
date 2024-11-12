import { renderIcon } from "@/data/iconOptions";
import React, { useState } from "react";
import { FaPlus, FaMinus } from "react-icons/fa";

export const AddHoldStateWithIconCard = ({
  title,
  name,
  valueState,
  onChangeState,
  formData,
  setFormData,
  field,
  type = "text",
  iconOptions = [], // Expecting icon options with 'label', 'value', and 'icon' properties
}) => {
  const [selectedIcon, setSelectedIcon] = useState(iconOptions[0]?.value || "");

  const handleAddData = () => {
    if (valueState.trim() && selectedIcon) {
      setFormData((prevState) => ({
        ...prevState,
        [field]: [
          ...prevState[field],
          { icon: selectedIcon, value: valueState }, // Store both the icon and the value
        ],
      }));
      onChangeState(""); // Reset the input
    }
  };

  const handleRemoveField = (index) => {
    const updatedArray = formData[field].filter((_, i) => i !== index);
    setFormData((prevState) => ({
      ...prevState,
      [field]: updatedArray,
    }));
  };


  return (
    <div className="mb-4">
      {/* Title */}
      <label
        className="block text-slate-700 text-sm font-bold mb-2"
        htmlFor={name}
      >
        {title}
      </label>

      {/* Select, Input, and Add Button */}
      <div className="flex items-center bg-slate-50 space-x-1 shadow appearance-none border rounded py-1 px-1 text-slate-700 leading-tight focus:outline-none focus:shadow-outline">
        <select
          name="icons"
          id="icons"
          value={selectedIcon}
          onChange={(e) => setSelectedIcon(e.target.value)} // Handle icon selection
          className="bg-slate-200 py-2 px-3 rounded"
        >
          {iconOptions.map((option, index) => (
            <option key={index} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        <input
          className="w-full appearance-none bg-slate-200 py-2 px-3 text-slate-700 leading-tight focus:outline-none focus:shadow-outline rounded"
          id={name}
          type={type}
          placeholder={`Enter ${title}`}
          name={name}
          value={valueState}
          onChange={(e) => onChangeState(e.target.value)} // Update the input value
          
        />

        <button
          type="button"
          onClick={handleAddData}
          className="bg-pamojaprimary hover:bg-pamojaaccent hover:text-pamojadark text-white font-bold py-2 px-4 rounded"
        >
          <FaPlus />
        </button>
      </div>

      {/* Display Added Items */}
      <div className="w-full mt-2">
        {formData[field] &&
          formData[field].length > 0 &&
          formData[field].map((data, index) => (
            <div key={index} className="flex items-center space-x-1 mb-1">
              <span className="w-full bg-slate-200 py-2 px-3 text-slate-700 rounded flex items-center">
                {renderIcon(data.icon)} {/* Render selected icon */}
                <span className="ml-2">{data.value}</span>
              </span>
              <button
                type="button"
                onClick={() => handleRemoveField(index)}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-2 rounded-full"
              >
                <FaMinus className="h-4 w-4" />
              </button>
            </div>
          ))}
      </div>
    </div>
  );
};
