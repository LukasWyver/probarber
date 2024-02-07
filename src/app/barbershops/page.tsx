import { Metadata } from "next";
import { db } from "@/_lib/prisma";
import { format } from "date-fns";
import { authOptions } from "@/_lib/auth";
import { redirect } from "next/navigation";
import { ptBR } from "date-fns/locale/pt-BR";
import { getServerSession } from "next-auth";

import Header from "@/_components/header";
import Search from "@/_components/search";
import BarbershopItem from "@/_components/barbershop-item";

interface BarbershopsPageProps {
  searchParams: {
    search?: string 
  }
}

export const metadata: Metadata = {
  title: 'Barbearias',
}

export default async function BarbershopsPage({ searchParams }: BarbershopsPageProps) {
  const session = await getServerSession(authOptions)

  if (!searchParams.search) {
    return redirect("/");
  }

  const barbershops = await db.barbershop.findMany({
    where: {
      name: {
        contains: searchParams.search,
        mode: "insensitive",
      },
    },
  });


  return (
    <>
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
      <Search
        defaultValues={{
          search: searchParams.search,
        }}
      />
    </div>

    <div className="mt-6">
      <h1 className="px-5 text-xs uppercase text-muted-foreground font-bold mb-3">Resultados para &quot;{searchParams.search}&quot;</h1>

      <div className="px-5 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {barbershops.map((barbershop) => (
          <div key={barbershop.id} className="w-full">
            <BarbershopItem barbershop={barbershop} />
          </div>
        ))}
      </div>
    </div>
  </>
    );
  }