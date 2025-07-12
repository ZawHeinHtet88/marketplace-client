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
import { useDebouncedState } from "@/hooks/use-debounce";
import { cn } from "@/lib/utils";
import Pagination from "@/modules/products/components/pagination";
import ProductCard from "@/modules/products/components/ui/product-card";
import { useGetAllProductsQuery } from "@/modules/products/hooks/queries";
import { Separator } from "@radix-ui/react-separator";
import { Search, SidebarClose, SidebarOpen } from "lucide-react";
import { useCallback, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { useNewFeedSidebarStore } from "../../store/index.store";

function SellerItems() {
  const { id } = useParams();
  const { isNewFeedOpen, setIsNewFeedOpen } = useNewFeedSidebarStore();

  const [search, setSearch] = useState("");
  const debouncedSearch = useDebouncedState(search, 200);
  const [page, setPage] = useState(1);

  const filters = useMemo(
    () => ({
      "name[regex]": debouncedSearch,
      merchant: id,
      page,
      limit: 9,
    }),
    [debouncedSearch, id, page]
  );

  const { data: productData } = useGetAllProductsQuery(filters);
  const numberOfPages = useMemo(
    () =>
      productData?.total ? Math.ceil(productData.total / filters.limit) : 0,
    [productData, filters.limit]
  );

  const handlePageChange = useCallback((newPage: number) => {
    setPage(newPage);
  }, []);

  const handleSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearch(e.target.value);
      setPage(1); // reset page on search
    },
    []
  );

  const handleToggleSidebar = useCallback(() => {
    setIsNewFeedOpen();
  }, [setIsNewFeedOpen]);

  

  return (
    <Card
      className={cn(
        "border shadow rounded-2xl",
        isNewFeedOpen ? "lg:w-[70%]" : "lg:w-full"
      )}
    >
      <CardHeader className="flex flex-col md:flex-row md:items-center md:justify-between">
        <CardTitle className="font-semibold text-lg">
          Products{" "}
          <span className="text-gray-500">
            ({productData?.total ?? 0})
          </span>
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

          <div className="relative max-w-sm rounded-xl">
            <Search className="absolute left-3 top-1/2 h-6 w-6 -translate-y-1/2 text-gray-600" />
            <Input
              value={search}
              onChange={handleSearchChange}
              type="search"
              placeholder="Type to search products..."
              className="pl-15"
            />
          </div>
          <Button
            className="hidden lg:inline-flex"
            onClick={handleToggleSidebar}
            variant={"outline"}
            size={"icon"}
          >
            {!isNewFeedOpen ? <SidebarClose /> : <SidebarOpen />}
          </Button>
        </div>
      </CardHeader>

      <Separator />

      <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-rows-2 lg:grid-cols-3 gap-5">
        {productData?.data.map((product, index) => (
          <ProductCard product={product} key={index} />
        ))}
      </CardContent>

      <Separator />

      <CardFooter className="flex justify-center">
        <Pagination
          page={page}
          totalPages={numberOfPages}
          onPageChange={handlePageChange}
        />
      </CardFooter>
    </Card>
  );
}

export default SellerItems;
