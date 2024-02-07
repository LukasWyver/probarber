import { Metadata } from 'next';
import { db } from '@/_lib/prisma';
import { authOptions } from '@/_lib/auth';
import { redirect } from 'next/navigation';

import { getServerSession } from 'next-auth';
import ServiceItem from './_components/service-item';
import { Separator } from '@/_components/ui/separator';
import BarbershopInfo from './_components/barbershop-info';


interface BarbershopsDetailsPageProps {
  params: {
    id?: string 
  }
}

export async function generateMetadata({ params }: BarbershopsDetailsPageProps): Promise<Metadata> {
  const barbershop = await db.barbershop.findUnique({
    where: {
      id: params.id
    }
  })

  return {
    title: barbershop?.name,
  }
}

export default async function BarbershopsDetailsPage({ params }: BarbershopsDetailsPageProps) {
  const session = await getServerSession(authOptions)

  if(!params.id) {
    return redirect("/");
  }

  const barbershop = await db.barbershop.findUnique({
    where: {
      id: params.id
    },
    include: {
      services: true
    }
  })


  if(!barbershop){
    return redirect("/");
  } else {
    return (
      <div>
        <BarbershopInfo barbershop={barbershop}/>
        <Separator />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 px-5 py-6">
          {barbershop.services.map((service) => (
            <ServiceItem 
              key={service.id}
              service={service}
              barbershop={barbershop}
              isAuthenticated={!!session?.user}
            />
          ))}            
        </div>
      </div>
    );
  }
}
