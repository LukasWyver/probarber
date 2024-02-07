import Image from "next/image";
import { MenuIcon } from 'lucide-react'

import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";

import SideMenu from "./side-menu";
import Link from "next/link";

export default function Header() {
  return (
    <header>
      <Card className="rounded-t-none">
        <CardContent className="p-5 flex items-center justify-between">
          <Link href="/">
            <Image src="/ProBarber.svg" alt="PRO Barber" height={24} width={120}/>
          </Link>

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon">
                <MenuIcon size={20}/>
              </Button>
            </SheetTrigger>

            <SheetContent className="p-0">
              <SideMenu />          
            </SheetContent>
          </Sheet>
        </CardContent>
      </Card>
    </header>
  );
}
