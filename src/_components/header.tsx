import Image from "next/image";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";

import { MenuIcon } from 'lucide-react'

export default function Header() {
  return (
    <Card className="rounded-t-none">
      <CardContent className="p-5 flex items-center justify-between">
        <Image src="/ProBarber.svg" alt="PRO Barber" height={22} width={120}/>

        <Button variant="outline" size="icon" className="h-8 w-8">
          <MenuIcon size={18}/>
        </Button>
      </CardContent>
    </Card>
  );
}
