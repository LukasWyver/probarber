import { Card, CardContent } from "./ui/card";

export default function Footer() {
  return (
    <footer className="mt-[4.5rem]">
      <Card className="rounded-b-none">
          <CardContent className="p-5 flex items-center justify-center">
            <p className="text-xs text-muted-foreground opacity-75">&copy; 2024 • Copyright <strong>PRO Barber</strong></p>  	
          </CardContent>
      </Card>
    </footer>
  );
}
