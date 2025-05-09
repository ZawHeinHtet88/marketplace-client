import { HouseIcon } from "lucide-react";

function SellerStat() {
  return (
    <div className="border-r-2 lg:last:border-r-0 px-5 flex-1 space-y-1">
      <h6>Seller Since</h6>
      <div className="flex items-center gap-2">
        <HouseIcon /> <span className="font-bold">2012</span>
      </div>
    </div>
  );
}

export default SellerStat;
