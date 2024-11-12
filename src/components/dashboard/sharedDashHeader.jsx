import React from "react";
import { Title } from "../texties";
import { Button } from "../ui/button";
import { FaPlus } from "react-icons/fa6";

export const SharedDashHeader = ({ title, onClick, btnTitle }) => {
  return (
    <div className="flex items-center justify-between">
      <Title className="text-start" first={title} />

      <Button
        onClick={onClick}
        className="rounded-none text-lg space-x-2 p-6 bg-pamojaprimary hover:border hover:border-pamojaprimary hover:text-pamojaprimary"
      >
        <FaPlus /> <span>{btnTitle}</span>{" "}
      </Button>
    </div>
  );
};
