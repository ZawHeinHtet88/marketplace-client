import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

function SellerCard() {
  return (
    <Card className="border-card">
      <CardContent className="mx-auto p-1  overflow-hidden w-[150px] h-[150px] rounded-full border-4 transition-all duration-200 border-primary">
        <img className="rounded-full w-full h-full" src="https://c02.purpledshub.com/uploads/sites/40/2023/08/JI230816Cosmos220-6d9254f-edited-scaled.jpg?w=1213&webp=1" alt="card" />
      </CardContent>
      <CardHeader>
        <CardTitle className="font-normal text-center text-lg">May Romatic</CardTitle>
        <CardDescription className="text-center text-green-600 font-bold">Barkery</CardDescription>
      </CardHeader>
    </Card>
  );
}

export default SellerCard;
