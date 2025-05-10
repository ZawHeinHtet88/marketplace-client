import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { Link } from "react-router-dom";
function MerchantCard() {
  return (
    <Link to={"/merchants/34"}>
      <Card className="border-primary shadow p-0 pb-5 overflow-hidden">
        <img
          className="rounded hover:scale-110 transition-all duration-100 ease-in-out"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTffXp7NevzYT7o1-2_Ww6rMZQsoQVfu2W1PA&s"
          alt=""
        />

        <CardContent>
          <CardTitle className="mb-2 font-semibold text-primary">
            Myo Ma Quatility Clothing
          </CardTitle>
          <CardDescription>Yone Pote,Hmawbi, Yangon</CardDescription>
        </CardContent>
      </Card>
    </Link>
  );
}

export default MerchantCard;
