import React from "react";
import { Title } from "../texties";
import { Button } from "../ui/button";
import { FaPlus } from "react-icons/fa6";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export const SharedPopDashHeader = ({
  pgtitle,
  poptitle,
  content,
  description,
  btnTitle,
}) => {
  return (
    <div className="flex items-center justify-between">
      <Title place="start" first={pgtitle} />

      <div className=" flex items-center space-x-5">
        <Dialog>
          <DialogTrigger asChild>
            <Button className="rounded-full text-lg space-x-2 p-6 bg-proprimary hover:border hover:border-proprimary hover:text-proprimary">
              <FaPlus /> <span>{btnTitle}</span>{" "}
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{poptitle}</DialogTitle>
              <DialogDescription>{description}</DialogDescription>
            </DialogHeader>
            <div className="overflow-y-auto">{content}</div>
            {/* <DialogFooter className="sm:justify-start">
              <DialogClose asChild className=''>
                <Button type="button" variant="secondary">
                  Save Draft
                </Button>
              </DialogClose>
            </DialogFooter> */}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};
