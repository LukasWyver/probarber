import { Card, CardContent } from "./ui/card";

export default function Footer() {
  return (
    <Card className="rounded-b-none">
      <CardContent className="p-5 flex items-center justify-center">
        <p className="text-xs text-muted-foreground opacity-75">&copy; 2023 • Copyright <strong>PRO Barber</strong></p>  	
      </CardContent>
    </Card>
  );
}
