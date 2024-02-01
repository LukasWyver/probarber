import { Badge } from "./ui/badge";
import { Card, CardContent } from "./ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Separator } from "./ui/separator";

export default function BookingItem() {
  return (
    <Card>
      <CardContent className="px-5 py-0 flex flex-row items-center justify-between">
        <div className="flex flex-col gap-2 py-5">
          <Badge className="bg-primary-dark text-primary w-fit">Confirmado</Badge>
          <h2 className="font-bold">Corte de Cabelo</h2>

          <div className="flex items-center gap-2">
            <Avatar className="h-6 w-6">
              <AvatarImage src="https://utfs.io/f/c97a2dc9-cf62-468b-a851-bfd2bdde775f-16p.png"/>
              <AvatarFallback>A</AvatarFallback>
            </Avatar>

            <h3 className="text-sm">Vintage Barber</h3>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center border-l border-solid border-secondary pl-5">
          <p className="text-xs">Fevereiro</p>
          <p className="text-2xl">06</p>
          <time className="text-xs" title="25 de Julho ás 19:04" dateTime="2023-06-25 19:04:00z">09:45</time>
        </div>
      </CardContent>
    </Card>
  );
}
