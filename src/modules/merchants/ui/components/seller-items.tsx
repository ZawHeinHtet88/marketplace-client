import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@radix-ui/react-separator";
import { Search, SidebarClose, SidebarOpen } from "lucide-react";
import { useNewFeedSidebarStore } from "../../store/index.store";
import { cn } from "@/lib/utils";
import SellerItemPagination from "./seller-items-pagination";
import ProductCard from "@/components/ui/product/product-card";

function SellerItems() {
  const { isNewFeedOpen, setIsNewFeedOpen } = useNewFeedSidebarStore();
  return (
    <Card
      className={cn(
        "border shadow rounded-2xl ",
        isNewFeedOpen ? "lg:w-[70%]" : "lg:w-full"
      )}
    >
      <CardHeader className="flex flex-col md:flex-row md:items-center md:justify-between">
        <CardTitle className="font-semibold text-lg">
          Products <span className="text-gray-500">(34)</span>
        </CardTitle>
        <div className="flex items-center gap-5">
          <Select onValueChange={(value) => console.log(value)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select a fruit" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="apple">Apple</SelectItem>
              <SelectItem value="banana">Banana</SelectItem>
              <SelectItem value="orange">Orange</SelectItem>
            </SelectContent>
          </Select>

          <div className="relative max-w-sm rounded-xl ">
            <Search className="absolute left-3 top-1/2 h-6 w-6 -translate-y-1/2 text-gray-600" />
            <Input
              type="search"
              placeholder="Type to search products..."
              className="pl-15"
            />
          </div>
          <Button
            className="hidden lg:inline-flex"
            onClick={() => setIsNewFeedOpen()}
            variant={"outline"}
            size={"icon"}
          >
            {!isNewFeedOpen ? <SidebarClose /> : <SidebarOpen />}
          </Button>
        </div>
      </CardHeader>
      <Separator />
      <CardContent className="grid grid-cols-1 md:grid-cols-2  lg:grid-rows-2 lg:grid-cols-3 gap-5">
        <ProductCard />
      </CardContent>
      <Separator />
      <CardFooter className="">
        <SellerItemPagination />
      </CardFooter>
    </Card>
  );
}

export default SellerItems;
