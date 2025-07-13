import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PopularType } from "../../types";
import { useNavigate } from "react-router-dom";

function TopCategoryCard({type}:{type:PopularType}) {
  const navigate = useNavigate()
  const passingState = {
    search : null,
    type : type._id,
  }
  return (
    <Card className="border-card hover:shadow-2xl cursor-pointer" onClick={()=>navigate("/products",{state : passingState})}>
      <CardContent className=" bg-gray-200/80 dark:bg-secondary mx-auto w-[120px] h-[120px] rounded-full hover:border-2 transition-all duration-200 hover:primary flex items-center justify-center">
        <img className="w-[80px] h-[80px]" src={type.image} alt="card" />
      </CardContent>
      <CardHeader>
        <CardTitle className="font-normal text-center">
            {type.name}
        </CardTitle>
      </CardHeader>
    </Card>
  );
}

export default TopCategoryCard;
