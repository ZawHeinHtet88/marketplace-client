import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardTitle,
} from "@/components/ui/card";
import { ShoppingCart } from "lucide-react";

function LocalItemCard() {
  return (
    <Card className="pt-0 pb-5 hover:shadow-xl transition-all duration-700">
      <div className="bg-gray-100 flex items-center justify-center">
        <img className="h-[200px]" src="./m-logo.png" alt="logo" />
      </div>
      <CardContent className="space-y-2">
        <CardTitle className="text-lg font-bold">Carpet 34 gm</CardTitle>
        <CardTitle className="flex items-center gap-2">
          <img className="w-4 h-4" src="./vite.svg" alt="" />
          <p className="text-gray-900/70">Zaw Gyi Online</p>
        </CardTitle>
      </CardContent>
      <CardFooter className="justify-between">
        <CardDescription className="text-lg font-extrabold text-gray-900/80">
          5000 kyats
        </CardDescription>
        <Button className="bg-red-600">
          <ShoppingCart />
        </Button>
      </CardFooter>
    </Card>
  );
}

export default LocalItemCard;
