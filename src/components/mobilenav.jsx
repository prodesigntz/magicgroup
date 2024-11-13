import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";

import Link from "next/link";
import { HiBars3 } from "react-icons/hi2";
import { menuData } from "@/data/menuData";

export function MobileNav() {
  return (
    <div className="md:hidden">
      <Sheet>
        <SheetTrigger asChild>
          <Button
            className="bg-pamojaprimary hover:bg-pamojadark text-white"
            variant="outline"
          >
            <HiBars3 className="text-xl" />
          </Button>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Magic Group</SheetTitle>
          </SheetHeader>
          <div className="pt-5">
            <ul className="flex flex-col space-y-3 gilda_display">
              {menuData.map((menus, i) => (
                <Link
                  key={i}
                  href={menus.link}
                  className="font-medium hover:bg-irisonp/10 "
                >
                  <li className="py-2"> {menus.name}</li>
                </Link>
              ))}
            </ul>
          </div>

          <Separator className="my-5" />

          <SheetFooter>
            <SheetClose asChild>
              <div className="flex items-center justify-start gilda_display space-x-5">
                {/* Logins/Signup  */}
                <Link href="/login">Login</Link>

                <Button
                  asChild
                  className="rounded-none text-center text-lg px-5 py-1.5  bg-pamojaprimary hover:bg-pamojadark "
                >
                  <Link href="/register">Register</Link>
                </Button>
              </div>
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  );
}
