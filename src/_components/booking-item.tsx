import { format, isPast } from "date-fns";
import { Badge } from "./ui/badge";
import { Prisma } from "@prisma/client";
import { ptBR } from "date-fns/locale/pt-BR";
import { Card, CardContent } from "./ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

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

  return (
    <Card>
      <CardContent className="px-5 py-0 flex flex-row items-center justify-between">
        <div className="flex flex-col gap-2 py-5 flex-[3] sm:flex-[4]">
          
            <Badge 
            variant={isBookingFinished ? "secondary" : "default"}
            className={`${isBookingFinished && "text-muted-foreground"} w-fit`}>
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
  );
}
