"use client"

import Image from "next/image";
import { Barbershop } from '@prisma/client'
import { useRouter } from "next/navigation";
import { ChevronLeftIcon, MapPinIcon, MenuIcon, StarIcon } from 'lucide-react';

import { Button } from '@/_components/ui/button';

interface BarbershopInfoProps {
  barbershop: Barbershop;
}

export default function BarbershopInfo({barbershop}: BarbershopInfoProps) {
  const router = useRouter()

  function handleBackClick() {
    router.replace('/')
  }

  return (
    <div>
      <div className='h-[258px] w-full relative'>
          <Button onClick={handleBackClick} size="icon" variant="outline" className='z-50 absolute top-4 left-4'>
            <ChevronLeftIcon />
          </Button>

          <Button size="icon" variant="outline" className='z-50 absolute top-4 right-4'>
            <MenuIcon />
          </Button>
          <Image 
            fill
            alt={barbershop.name}
            src={barbershop.imageUrl}
            className='object-cover opacity-75'
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background to-95%" />
        </div>

        <div className='px-5 pt-3 pb-6'>
          <h1 className='text-xl font-bold'>{barbershop.name}</h1>

          <div className="flex item-center gap-1 mt-2">
            <MapPinIcon className='fill-primary stroke-secondary' size={18}/>
            <p className='text-sm'>{barbershop.address}</p>
          </div>

          <div className="flex item-center gap-1 mt-2">
            <StarIcon className='fill-primary stroke-primary' size={14}/>
            <p className='text-sm'>5,0
              <span className='text-muted-foreground ml-1'>(899 avaliações)</span>
            </p>
          </div>
        </div>
    </div>
  );
}
