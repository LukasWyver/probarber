import { db } from '@/_lib/prisma';

import { Separator } from '@/_components/ui/separator';
import BarbershopInfo from './_components/barbershop-info';

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
      </div>
    );
  }
}
