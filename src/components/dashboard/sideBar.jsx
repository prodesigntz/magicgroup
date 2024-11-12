"use client"

import React, { useState } from 'react';
import {
    Command,
    CommandGroup,
    CommandItem,
    CommandList,
    CommandSeparator,
  } from "@/components/ui/command"
  import { menuDashItem } from "@/data/menuDash";
import Link from 'next/link';
import { ChevronDown, ChevronUp } from 'lucide-react';

export default function SideBar() {
  const [openSections, setOpenSections] = useState({});
  
  const toggleSection = (index) => {
    setOpenSections((prevState) => ({
      ...prevState,
      [index]: !prevState[index],
    }));
  };

  return (
    <div className="space-y-5 ">
      {menuDashItem.map((dashitem, index) => (
        <div key={index}>
          <Command>
            <CommandList>
              <CommandGroup >
                <div
                  className="flex justify-between items-center rounded-none cursor-pointer px-3 py-1"
                  onClick={() => toggleSection(index)}
                >
                  <span className="text-lg gilda_display font-semibold text-gray-700">
                    {dashitem.name}
                  </span>
                  {openSections[index] ? <ChevronUp /> : <ChevronDown />}
                </div>
                {openSections[index] && (
                  <div className="ml-4 space-y-2">
                    {dashitem.subMenu.map((dashsub, idash) => (
                      <CommandItem key={idash} asChild>
                        <Link className="cursor-pointer" href={dashsub.path}>
                          {dashsub.name}
                        </Link>
                      </CommandItem>
                    ))}
                  </div>
                )}
              </CommandGroup>
              <CommandSeparator />
            </CommandList>
          </Command>
        </div>
      ))}
    </div>
  );
}