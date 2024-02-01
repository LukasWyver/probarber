import Image from "next/image";
import { format } from 'date-fns'
import { ptBR } from "date-fns/locale/pt-BR";


import Header from "@/_components/header";

export default function Home() {
  return (
    <div>      
      <Header />

      <div id="greetings" className="px-5 pt-5">
        <h2 className="text-xl font-bold">Olá, Lucas!</h2>
        <p className="capitalize text-sm">
          {format(new Date(), "EEEE',' dd 'de' MMMM",{
            locale: ptBR,
          })}
        </p>
      </div>
    </div>
  );
}
