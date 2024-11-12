"use client";
import React, { useRef, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FaPlus } from "react-icons/fa6";

const CustomCostFieldDialog = ({ onAddField }) => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [amount, setAmount] = useState(0);

  const handleSubmit = () => {
    if (title == "" || desc == "" || amount < 1) {
      window.alert("COMPLETE THE FORM PERFECTLY BEFORE SUBMITTING.");
      return;
    }

    onAddField(title, desc, amount);
    setTitle("");
    setDesc("");
    setAmount(0);
  };

  return (
    <div>
      <Dialog>
        <DialogTrigger className="bg-[#a0c0a7] text-procolor hover:text-white p-2 rounded-lg ">
          {" "}
          <FaPlus className="text-xs" />
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              <span className=""> Add a custom cost field</span>
            </DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-2 mt-2">
            <div>
              <label className="block text-sm font-medium mb-3">Title</label>
              <input
                type="text"
                value={title}
                onChange={(event) => {
                  setTitle(() => event.target.value);
                }}
                className="inputClass"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-3">Amount</label>
              <input
                type="number"
                placeholder="enter amount"
                value={amount}
                onChange={(event) => {
                  setAmount(() => event.target.value);
                }}
                className="inputClass"
              />
            </div>
          </div>
          <label className="block text-sm font-medium ">Description</label>
          <textarea
            className="textAreaClass"
            name="wildlife"
            rows="4"
            value={desc}
            onChange={(event) => {
              setDesc(() => event.target.value);
            }}
          ></textarea>
          <DialogFooter>
            <button
              onClick={handleSubmit}
              className="rounded-full  py-2 px-4 bg-proprimary text-white border hover:bg-white hover:border-proprimary hover:text-proprimary"
              type="button"
            >
              {" "}
              submit
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CustomCostFieldDialog;
