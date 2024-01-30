import Image from "next/image";

export default function Home() {
  return (
    <main className="flex gap-4 items-center justify-center h-screen w-screen">      
      <Image src="/ProBarber.svg" alt="" width={152} height={96} />
      <button className="bg-primary py-0.5 px-1.5 text-muted rounded">Click me!</button>
    </main>
  );
}
