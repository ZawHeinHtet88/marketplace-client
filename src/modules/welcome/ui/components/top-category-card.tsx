import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

function TopCategoryCard() {
  return (
    <Card className="border-0 shadow-none">
      <CardContent className="bg-gray-200/80 dark:bg-secondary mx-auto w-[120px] h-[120px] rounded-full hover:border-2 transition-all duration-200 hover:primary flex items-center justify-center">
        <img className="w-[80px] h-[80px]" src="./vite.svg" alt="card" />
      </CardContent>
      <CardHeader>
        <CardTitle className="font-normal text-center">
            Mobile
        </CardTitle>
      </CardHeader>
    </Card>
  );
}

export default TopCategoryCard;
