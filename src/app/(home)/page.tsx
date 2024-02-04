import { db } from '@/_lib/prisma';
import { getServerSession } from 'next-auth';
import { format, isFuture } from 'date-fns'
import { ptBR } from "date-fns/locale/pt-BR";
import { authOptions } from '../api/auth/[...nextauth]/route';

import Header from "@/_components/header";
import Search from './_components/search';
import BookingItem from '@/_components/booking-item';
import BarbershopItem from './_components/barbershop-item';

export default async function Home() {
  const session = await getServerSession(authOptions)

  const [barbershops, recommendedBarbershops, confirmedBookings] = await Promise.all([
    db.barbershop.findMany({}),
    db.barbershop.findMany({
      orderBy: {
        id: "asc",
      },
    }),
    session?.user
      ? db.booking.findMany({
          where: {
            userId: (session.user as any).id,
            date: {
              gte: new Date(),
            },
          },
          include: {
            service: true,
            barbershop: true,
          },
        })
      : Promise.resolve([]),
  ]);

  return (
    <div>      
      <Header />

      <div id="greetings" className="px-5 pt-5 space-y-1">
        <h2 className="text-xl font-bold">
          {session?.user ? `Olá, ${session.user.name?.split(" ")[0]}!` : "Olá! Vamos agendar um corte hoje?"}
        </h2>
        <p className="capitalize text-sm">
          {format(new Date(), "EEEE',' dd 'de' MMMM",{
            locale: ptBR,
          })}
        </p>
      </div>
      
      <div className="px-5 mt-6">
        <Search />
      </div>
        
      {confirmedBookings.length > 0  && (
        <div className="px-5 mt-6">
          <h2 className="text-xs uppercase text-muted-foreground font-bold mb-3">Agendamentos</h2>
          <div className="flex flex-col gap-4 min-h-32 max-h-64 overflow-y-auto [&::-webkit-scrollbar]:hidden">
            {confirmedBookings.map((booking) => (
              <BookingItem key={booking.id} booking={booking}/>
            ))}
          </div>
        </div>
      )}

      <div className="mt-6">
        <h2 className="px-5 text-xs uppercase text-muted-foreground font-bold mb-3">Recomendados</h2>
       
        <div className="px-5 flex gap-4 overflow-x-auto [&::-webkit-scrollbar]:hidden">
          {recommendedBarbershops.map((barbershop) => (
            <BarbershopItem key={barbershop.id} barbershop={barbershop}/>            
          ))}
        </div>
      </div>

      <div className="mt-6">
        <h2 className="px-5 text-xs uppercase text-muted-foreground font-bold mb-3">Populares</h2>
       
        <div className="px-5 flex gap-4 overflow-x-auto [&::-webkit-scrollbar]:hidden">
          {barbershops.map((barbershop) => (
            <BarbershopItem key={barbershop.id} barbershop={barbershop}/>            
          ))}
        </div>
      </div>
    </div>
  );
}
