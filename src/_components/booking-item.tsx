"use client";

import Image from "next/image";
import { toast } from "sonner";
import { useState } from "react";
import { Prisma } from "@prisma/client";
import { format, isPast } from "date-fns";
import { ptBR } from "date-fns/locale/pt-BR";

import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import { Card, CardContent } from "./ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Sheet, SheetClose, SheetContent, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet";

import { cancelBooking } from "@/_actions/cancel-booking";
import { Loader2Icon } from "lucide-react";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "./ui/alert-dialog";

interface BookingItemProps {
  booking: Prisma.BookingGetPayload<{
    include: {
      service: true,
      barbershop: true
    }
  }>
}

export default function BookingItem({ booking }: BookingItemProps) {
  const isBookingFinished = isPast(booking.date)
  const [isDeleteLoading, setIsDeleteLoading] = useState(false);

  const formatter = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',    
  });

  const handleCancelClick = async () => {
    setIsDeleteLoading(true);

    try {
      await cancelBooking(booking.id);

      toast.success("Reserva cancelada com sucesso!");
    } catch (error) {
      console.error(error);
    } finally {
      setIsDeleteLoading(false);
    }
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Card>
          <CardContent className="px-5 py-0 flex flex-row items-center justify-between cursor-pointer">
            <div className="flex flex-col gap-2 py-5 flex-[3] sm:flex-[4]">              
              <Badge 
                variant={isBookingFinished ? "secondary" : "default"}
                className={`${isBookingFinished && "text-muted-foreground"} w-fit`}
              >
                {isBookingFinished ? "Finalizado" : "Confirmado"}
              </Badge>
              <h2 className="font-bold">{booking.service.name}</h2>

              <div className="flex items-center gap-2">
                <Avatar className="h-6 w-6">
                  <AvatarImage src={booking.barbershop.imageUrl}/>
                  <AvatarFallback>{booking.barbershop.name.charAt(0)}</AvatarFallback>
                </Avatar>

                <h3 className="text-sm">{booking.barbershop.name}</h3>
              </div>
            </div>

            <div className="flex flex-col items-center justify-center flex-1 border-l border-solid border-secondary pl-5">
              <p className="text-xs capitalize">{format(booking.date, "MMMM", { locale: ptBR})}</p>
              <p className="text-2xl">{format(booking.date, "dd", { locale: ptBR})}</p>
              <time 
                className="text-xs"
                title={format(booking.date, "dd 'de' MMMM 'ás' HH:mm", { locale: ptBR})} 
                dateTime={booking.date.toISOString()}
              >
                {format(booking.date, "HH:mm")}
              </time>
            </div>
          </CardContent>
        </Card>
      </SheetTrigger>

      <SheetContent className="p-0">
        <SheetHeader className="text-left px-5 py-8">
          <SheetTitle>Informações da Reserva</SheetTitle>
        </SheetHeader>
        <Separator />

        <div className="px-5">
          <div className="relative h-[180px] w-full mt-6">
            <Image src="/barbershop-map.png" alt={booking.barbershop.name} fill className="object-cover rounded-lg"/>

            <div className="w-full absolute bottom-4 left-0 px-5">
              <Card>
                <CardContent className="p-3 flex gap-2">
                  <Avatar>
                    <AvatarImage src={booking.barbershop.imageUrl}/>
                    <AvatarFallback>{booking.barbershop.name.charAt(0)}</AvatarFallback>
                  </Avatar>

                  <div className="">
                    <h2 className="font-bold">{booking.barbershop.name}</h2>
                    <h3 className="text-xs text-muted-foreground overflow-hidden text-ellipsis text-nowrap">{booking.barbershop.address}</h3>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          <Badge variant={isBookingFinished ? "secondary" : "default"} className={`${isBookingFinished && "text-muted-foreground"} w-fit my-3`}>
            {isBookingFinished ? "Finalizado" : "Confirmado"}
          </Badge>

          <Card>
            <CardContent className="flex flex-col gap-1.5 p-3 [&>div:not(:last-child)]:border-b [&>div:not(:last-child)]:pb-1.5">
              <div className="flex justify-between">
                <h2 className="font-bold">{booking.service.name}</h2>
                <h3 className="font-bold text-sm">{formatter.format(Number(booking.service.price))}</h3>
              </div>

              <div className="flex justify-between">
                <h3 className="text-muted-foreground text-sm">Data</h3>
                <h4 className="text-sm">
                  {format(booking.date, "dd 'de' MMMM", {
                    locale: ptBR,
                  })}
                </h4>
              </div>

              <div className="flex justify-between">
                <h3 className="text-muted-foreground text-sm">Horário</h3>
                <time 
                  className="text-sm"
                  title={format(booking.date, "dd 'de' MMMM 'ás' HH:mm", { locale: ptBR})} 
                  dateTime={booking.date.toISOString()}
                >
                  {format(booking.date, "HH:mm")}
                </time>
              </div>        

              <div className="flex justify-between">
                <h3 className="text-muted-foreground text-sm">Barbearia</h3>
                <h3 className="text-sm">{booking.barbershop.name}</h3>
              </div>
            </CardContent>                        
          </Card>

          <SheetFooter className="flex-row gap-3 mt-6">
            <SheetClose asChild>
              <Button className="w-full" variant="secondary">
                Voltar
              </Button>
            </SheetClose>            

            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button className="w-full" variant="destructive" disabled={isBookingFinished || isDeleteLoading}>
                  Cancelar Reserva
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent className="w-[90%]">
                <AlertDialogHeader>
                  <AlertDialogTitle>Deseja mesmo cancelar essa reserva?</AlertDialogTitle>
                  <AlertDialogDescription>
                    Uma vez cancelada, não será possível reverter essa ação.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter className="flex-row gap-3">
                  <AlertDialogCancel className="w-full mt-0">Voltar</AlertDialogCancel>
                  <AlertDialogAction disabled={isDeleteLoading} className="w-full" onClick={handleCancelClick}>
                    {isDeleteLoading && <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />}
                    Confirmar
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>

            
          </SheetFooter>
        </div>

      </SheetContent>
    </Sheet>
  );
}
