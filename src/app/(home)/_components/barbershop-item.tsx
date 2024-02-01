"use client"

import Image from "next/image";
import { Barbershop } from '@prisma/client'
import { StarIcon } from "lucide-react";
import { useRouter } from "next/navigation";

import { Badge } from "@/_components/ui/badge";
import { Button } from "@/_components/ui/button";
import { Card, CardContent } from "@/_components/ui/card";

interface BarbershopItemProps {
  barbershop: Barbershop;
}

export default function BarbershopItem({barbershop}: BarbershopItemProps) {
  const router = useRouter()

  function handleBookingClick() {
    router.push(`/barbershops/${barbershop.id}`)
  }

  return (
    <Card className="min-w-[167px] max-w-[167px] rounded-2xl">
      <CardContent className="p-1">
        <div className="w-full h-[159px] relative">
          <div className="absolute top-2 left-2 z-50">
            <Badge variant="secondary" className="opacity-80 backdrop-blur flex items-center gap-1 rounded-2xl">
              <StarIcon size={12} className="fill-primary stroke-primary"/>
              <span className="text-xs">5,0</span>
            </Badge>
          </div>
          <Image 
            fill
            alt={barbershop.name}
            src={barbershop.imageUrl}
            className="rounded-2xl object-cover"
          />          
        </div>

        <div className="px-2 pb-2">
          <h2 className="font-bold mt-2 overflow-hidden text-ellipsis text-nowrap">{barbershop.name}</h2>
          <p className="text-sm text-muted-foreground overflow-hidden text-ellipsis text-nowrap">{barbershop.address}</p>
          <Button onClick={handleBookingClick} variant="secondary" className="w-full mt-3">Reservar</Button>
        </div>
      </CardContent>
    </Card>
  );
}
