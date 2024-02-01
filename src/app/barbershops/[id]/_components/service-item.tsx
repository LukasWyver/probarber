"use client"

import Image from "next/image";
import { Service } from '@prisma/client'
// import { useRouter } from "next/navigation";
import { ChevronLeftIcon, MapPinIcon, MenuIcon, StarIcon } from 'lucide-react';

import { Button } from '@/_components/ui/button';
import { Card, CardContent } from "@/_components/ui/card";

interface ServiceItemProps {
  service: Service;
}

export default function ServiceItem({service}: ServiceItemProps) {
  // const router = useRouter()

  // function handleBackClick() {
  //   router.replace('/')
  // }

  const formatter = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',    
  });

  return (
    <Card>
      <CardContent className="p-3">
        <div className="flex gap-4 items-center w-full">
          <div className="relative min-h-[110px] min-w-[110px] max-h-[110px] max-w-[110px]">
            <Image src={service.imageUrl} alt={service.name} fill className="object-contain rounded-lg aspect-square" />
          </div>

          <div className="flex flex-col w-full">
            <h2 className="font-bold">{service.name}</h2>
            <p className="text-sm text-muted-foreground line-clamp-2 mt-1">{service.description}</p>

            <div className="flex items-center justify-between mt-2.5">
              <p className="text-primary text-sm font-bold">{formatter.format(Number(service.price))}</p>
              <Button onClick={() => {}} variant="secondary">Reservar</Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
