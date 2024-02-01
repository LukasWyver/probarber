import "./globals.css";
import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import Footer from "@/_components/footer";

const nunito = Nunito({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    template: '%s | PRO Barber',
    default: 'PRO Barber',
  },
  description: "Sua plataforma de agendamentos em barbearias",
  metadataBase: new URL('http://localhost:3000'),
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${nunito.className} dark`}>
        {children}
        <Footer />
      </body>
    </html>
  );
}
