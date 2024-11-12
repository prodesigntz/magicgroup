import React from "react";
import Link from "next/link";
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command"
import { menuDashItem } from "@/data/menuDash";


export const MenuList = () => {
  return (
    <div className="space-y-5">
      
      {/* type two */}
      {menuDashItem.map((dashitem, i) => (
        <div key={i} > 
          <Command > 
           <CommandList>
              <CommandGroup heading={dashitem.name}>
                {dashitem.subMenu.map((dashsub, idash) => (
                  <CommandItem key={idash}  asChild>
                    <Link href={dashsub.path}>{dashsub.name}</Link> 
                  </CommandItem>
                ))}
              </CommandGroup> <CommandSeparator />
            </CommandList>
          </Command>
        </div>
      ))}
    </div>
  );
};