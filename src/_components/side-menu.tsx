"use client"

import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import { CalendarDaysIcon, CircleUserIcon, HomeIcon, LogInIcon, LogOutIcon } from "lucide-react";

import { Button } from "./ui/button";
import { Skeleton } from "./ui/skeleton";
import { Separator } from "./ui/separator";
import { SheetHeader, SheetTitle } from "./ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

export default function SideMenu() {
  const { data, status } = useSession()

  function handleLogInClick(){
    signIn('google')
  }

  function handleLogOutClick(){
    signOut()
  }

  return (
    <>
      <SheetHeader className="text-left px-5 py-8">
        <SheetTitle>Menu</SheetTitle>
      </SheetHeader>

      <Separator />
            
      {status === 'unauthenticated' && (
        <div className="flex flex-col gap-3 px-5 py-6">
          <div className="flex items-center gap-3">
            <CircleUserIcon className="stroke-muted-foreground" size={40} strokeWidth={1.25}/>
            <h2 className="font-bold">Olá. Faça seu login!</h2>
          </div>

          <Button onClick={handleLogInClick} variant="secondary" className="gap-2 justify-start">
            <LogInIcon size={16}/>
            Fazer Login
          </Button>
        </div>
      )}

      {status === 'loading' && (
        <div className="flex items-center justify-between px-5 py-6"> 
          <div className="flex items-center gap-3">
            <Skeleton className="h-10 w-10 rounded-full" />                  
            <Skeleton className="h-4 w-[160px]" />
          </div>               
            
            <Skeleton className="h-10 w-10" />                
        </div>
      )}

      {data?.user && status === 'authenticated' && (
        <div className="flex items-center justify-between px-5 py-6">              
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarImage src={data.user.image!} alt={data.user.name!}/>
              <AvatarFallback>{data.user.name?.charAt(0)}</AvatarFallback>
            </Avatar>
            
            <h2 className="font-bold">{data.user.name}</h2>
          </div>

          <Button onClick={handleLogOutClick} size="icon" variant="secondary" className="h-10 w-10">
            <LogOutIcon size={20} />
          </Button>
        </div>
      )}

      <div className="flex flex-col gap-3 px-5">
        <Button variant="outline" className="gap-2 justify-start" asChild>
          <Link href="/">
            <HomeIcon size={16}/>
            Início
          </Link>
        </Button>

        {status === 'authenticated' && (
          <Button variant="outline" className="gap-2 justify-start" asChild>
            <Link href="/bookings">
              <CalendarDaysIcon size={16}/>
              Agendamentos
            </Link>
          </Button>
        )}
      </div>
    </>
  );
}
