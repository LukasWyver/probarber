import { db } from '@/_lib/prisma';

import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

import Header from '@/_components/header';
import BookingItem from '@/_components/booking-item';

export default async function BookingsPage() {
  const session = await getServerSession(authOptions)

  if (!session?.user) {
    return redirect("/");
  }

  const [confirmedBookings, finishedBookings] = await Promise.all([
    db.booking.findMany({
      where: {
        userId: (session.user as any).id,
        date: {
          gte: new Date()
        }
      },
      include: {
        service: true,
        barbershop: true,
      }
    }),
    db.booking.findMany({
      where: {
        userId: (session.user as any).id,
        date: {
          lt: new Date()
        }
      },
      include: {
        service: true,
        barbershop: true,
      }
    })
  ])

  // const confirmedBookings = bookings.filter(booking => isFuture(booking.date))
  // const finishedBookings = bookings.filter(booking => isPast(booking.date))

  return (
    <div className='h-screen max-h-[calc(100vh-130px)]'>
      <Header />

      <div className="px-5 py-6">
        <h1 className="text-xl font-bold mb-6">Agendamentos</h1>

        {confirmedBookings.length === 0 && finishedBookings.length === 0 && (
          <p className='text-sm text-muted-foreground'>Você <strong>ainda</strong> não tem nenhuma reserva cadastrada.</p>
        )}     
        
        {confirmedBookings.length > 0 && (
          <>
            <h2 className="text-sm text-muted-foreground uppercase font-bold mb-3">Confirmados</h2>
            <div className="flex flex-col gap-4 min-h-32 max-h-64 overflow-y-auto [&::-webkit-scrollbar]:hidden">
              {confirmedBookings.map((booking) => (
              <BookingItem key={booking.id} booking={booking}/>
              ))}
            </div>
          </>
        )}
    
        {finishedBookings.length > 0 && (
          <>
            <h2 className="text-sm text-muted-foreground uppercase font-bold mt-6 mb-3">Finalizados</h2>
            <div className="flex flex-col gap-4 min-h-32 max-h-64 overflow-y-auto [&::-webkit-scrollbar]:hidden">
              {finishedBookings.map((booking) => (
              <BookingItem key={booking.id} booking={booking}/>
              ))}
            </div>
          </>
         )}
      </div>
    </div>
  );
}