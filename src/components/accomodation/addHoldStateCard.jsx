import React from "react";
import { FaPlus, FaMinus } from "react-icons/fa";

export const AddHoldStateCard = ({
  title,
  name,
  valueState,
  onChangeState,
  formData,
  setFormData,
  field,
  type = "text",
}) => {
  const handleAddData = () => {
    if (valueState.trim()) {
      // Adding the value to the correct field in formData
      setFormData((prevState) => ({
        ...prevState,
        [field]: [...prevState[field], valueState], // Add new value to existing array
      }));
      onChangeState(""); // Reset the input value after adding
    }
  };

  const handleRemoveField = (index) => {
    // Remove the specific item by index
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

      {/* Input & Add Button */}
      <div className="flex bg-slate-50 items-center space-x-1 shadow appearance-none border rounded py-1 px-1 text-slate-700 leading-tight focus:outline-none focus:shadow-outline">
        <input
          className="w-full bg-slate-200 py-2 px-3 text-slate-700 leading-tight focus:outline-none rounded"
          id={name}
          type={type}
          placeholder={`Enter ${title}`}
          name={name}
          value={valueState}
          onChange={(e) => onChangeState(e.target.value)} // Update the parent state
          
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
              <span className="w-full bg-slate-200 py-2 px-3 text-slate-700 rounded">
                {data}
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
