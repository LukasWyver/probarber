import { db } from '@/_lib/prisma';

import { Separator } from '@/_components/ui/separator';
import BarbershopInfo from './_components/barbershop-info';
import ServiceItem from './_components/service-item';

interface BarbershopsDetailsPageProps {
  params: {
    id?: string 
  }
}

export default async function BarbershopsDetailsPage({ params }: BarbershopsDetailsPageProps) {
  if(!params.id) {
    // TODO: redirecionar para home page
    return null
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
    // TODO: redirecionar para home page
    return null
  } else {
    return (
      <div>
        <BarbershopInfo barbershop={barbershop}/>
        <Separator />

        <div className="flex flex-col gap-4 px-5 py-6">
          {barbershop.services.map((service) => (
              <ServiceItem service={service} key={service.id}/>
          ))}
        </div>
      </div>
    );
  }
}
