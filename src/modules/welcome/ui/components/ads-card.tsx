import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";

function AdsCard() {
  return (
    <Card className="flex flex-row items-center bg-gradient-to-r  from-[#8B0000] to-[#1C1C1C] h-[207px]">
      <CardContent className="space-y-4 flex-1">
        <CardTitle className="inline-block py-2 px-4 rounded-lg bg-gray-200/40">
          Asia
        </CardTitle>
        <img className="w-[40px] h-[40px]" src="./vite.svg" alt="" />
        <CardDescription className="text-white text-xl">
          Lion Energy Drink
        </CardDescription>
       
      </CardContent>
      <CardContent className="w-[40%]">
        <img src="./m-logo.png" alt="" />
      </CardContent>
    </Card>
  );
}

export default AdsCard;
