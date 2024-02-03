"use client"

import Image from "next/image";
import { toast } from "sonner";
import { useMemo, useState } from "react";
import { Loader2Icon } from "lucide-react";
import { useRouter } from "next/navigation";
import { ptBR } from "date-fns/locale/pt-BR";
import { Barbershop, Service } from '@prisma/client'
import { signIn, useSession } from "next-auth/react";
import { format, setHours, setMinutes } from "date-fns";

import { Button } from '@/_components/ui/button';
import { Calendar } from "@/_components/ui/calendar";
import { Separator } from "@/_components/ui/separator";
import { saveBooking } from "../_actions/save-booking";
import { generateDayTimeList } from "../_helpers/hours";
import { Card, CardContent } from "@/_components/ui/card";
import { Sheet, SheetContent, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "@/_components/ui/sheet";


interface ServiceItemProps {
  service: Service
  barbershop: Barbershop
  isAuthenticated?: boolean
}

export default function ServiceItem({service, barbershop ,isAuthenticated}: ServiceItemProps) {
  const router = useRouter();
  const { data } = useSession()
  const [sheetIsOpen, setSheetIsOpen] = useState(false)
  const [date, setDate] = useState<Date | undefined>(undefined)
  const [hour, setHour] = useState<String | undefined>(undefined)
  const [submitIsLoading, setSubmitIsLoading] = useState(false)

  function handleBookingClick() {
    if(!isAuthenticated){
      return signIn('google')
    }
  }  

  const isBookingDisabled = !hour || !date

  async function handleBookingSubmit() {
    setSubmitIsLoading(true)
    try {
      if(isBookingDisabled || !data?.user){
        return
      }

      const dateHour = Number(hour.split(':')[0])
      const dateMinutes = Number(hour.split(':')[1])
      const newDate = setMinutes(setHours(date, dateHour), dateMinutes)

      await saveBooking({
        serviceId: service.id,
        barbershopId: barbershop.id,
        date: newDate,
        userId: (data.user as any).id,
      })
      setSheetIsOpen(false)
      setHour(undefined)
      setDate(undefined)
      toast("Reserva realizada com sucesso!", {
        description: format(newDate, "'Para' dd 'de' MMMM 'às' HH':'mm'.'", {
          locale: ptBR,
        }),
        action: {
          label: "Visualizar",
          onClick: () => router.push("/bookings"),
        },
      })
    } catch (error) {
      console.log(error)
    } finally {
      setSubmitIsLoading(false)
    }
  }

  function handleDateClick(date: Date | undefined) {
    setDate(date)
    setHour(undefined)
  }

  function handleHourClick(time: string) {
    setHour(time)
  }

  const formatter = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',    
  });

  const timeList = useMemo(() => {
    return date ? generateDayTimeList(date) : []
  }, [date])

  return (
    <Card>
      <CardContent className="p-3">
        <div className="flex gap-4 items-center w-full">
          <div className="relative min-h-[110px] min-w-[110px] max-h-[110px] max-w-[110px]">
            <Image src={service.imageUrl} alt={service.name} fill className="object-contain rounded-lg aspect-square" />
          </div>

          <div className="flex flex-col w-full">
            <h2 className="font-bold">{service.name}</h2>
            <p className="text-sm text-muted-foreground line-clamp-2 mt-1">{service.description}</p>

            <div className="flex items-center justify-between mt-2.5">
              <p className="text-primary text-sm font-bold">{formatter.format(Number(service.price))}</p>
              
              <Sheet open={sheetIsOpen} onOpenChange={setSheetIsOpen}>
                <SheetTrigger asChild>
                  <Button onClick={handleBookingClick} variant="secondary">Reservar</Button>
                </SheetTrigger>

                <SheetContent className="p-0">                
                  <SheetHeader className="text-left px-5 py-8">
                    <SheetTitle>Fazer Reserva</SheetTitle>
                  </SheetHeader>

                  <Separator />

                  <Calendar 
                    mode="single"
                    locale={ptBR}
                    selected={date}
                    className="my-6 "
                    fromDate={new Date()}
                    onSelect={handleDateClick} 
                    styles={{
                      head_cell: {
                        width: '100%',
                        textTransform: 'capitalize'
                      },
                      cell: {
                        width: '100%'
                      },
                      button: {
                        width: '100%'
                      },
                      nav_button_previous: {
                        width: '32px',
                        height: '32px'
                      },
                      nav_button_next: {
                        width: '32px',
                        height: '32px'
                      },
                      caption: {
                        textTransform: 'capitalize'
                      }
                    }}
                  />
                  {/* TODO: mostrar lista de horários apenas se alguma data estiver selecionada */}
                  
                  <Separator />
                  {date && ( 
                    <div className="py-6 px-5 flex gap-3 overflow-x-auto [&::-webkit-scrollbar]:hidden">
                      {timeList.map((time) => (
                        <Button 
                          key={time}
                          onClick={() => handleHourClick(time)}
                          variant={hour === time ? "default" : "outline"}
                          className={`rounded-full ${hour === time && 'text-secondary'}`}
                        >
                          {time}
                        </Button>
                      ))}
                    </div>
                  )}
                  <Separator />
                  
                  <div className="px-5 py-6">
                    <Card>
                        <CardContent className="flex flex-col gap-1.5 p-3 [&>div:not(:last-child)]:border-b [&>div:not(:last-child)]:pb-1.5">
                          <div className="flex justify-between">
                            <h2 className="font-bold">{service.name}</h2>
                            <h3 className="font-bold text-sm">{formatter.format(Number(service.price))}</h3>
                          </div>

                          {date && (                          
                            <div className="flex justify-between">
                              <h3 className="text-muted-foreground text-sm">Data</h3>
                              <h4 className="text-sm">
                                {format(date, "dd 'de' MMMM", {
                                  locale: ptBR,
                                })}
                              </h4>
                            </div>
                          )}

                          {hour && (                          
                            <div className="flex justify-between">
                              <h3 className="text-muted-foreground text-sm">Horário</h3>
                              <h4 className="text-sm">
                                {hour}
                              </h4>
                            </div>
                          )}

                          <div className="flex justify-between">
                            <h3 className="text-muted-foreground text-sm">Barbearia</h3>
                            <h3 className="text-sm">{barbershop.name}</h3>
                          </div>
                        </CardContent>                        
                    </Card>
                  </div>
                  
                  {date && (
                    <SheetFooter className="px-5">
                      <Button 
                        className="w-full font-bold flex items-start"
                        onClick={handleBookingSubmit}
                        disabled={isBookingDisabled || submitIsLoading}
                      >
                        {submitIsLoading ? (
                         <>
                            <Loader2Icon className="mr-2 h-4 w-4 animate-spin"/>
                            Confirmando
                          </>
                        ) : 'Confirmar Reserva'}
                      </Button>
                    </SheetFooter>
                  )}

                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
