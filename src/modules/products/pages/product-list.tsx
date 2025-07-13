import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { DualRangeSlider } from "@/components/ui/dual-range-slider";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ProductCard from "@/modules/products/components/ui/product-card";
import {
  Clock,
  DollarSign,
  RefreshCcw,
  Search,
  SortAsc,
  SortDesc,
} from "lucide-react";
import { useEffect, useState } from "react";
import FilterModal from "../components/filter-modal";
import Pagination from "../components/pagination";
import Skeletons from "../components/skeletons";
import { useGetAllProductsQuery, useGetAllTypesQuery } from "../hooks/queries";
import { useLocation } from "react-router-dom";

function ProductListPage() {
  const [values, setValues] = useState<number[]>([2, 4534534]);

  const location = useLocation();

  const { type } = location.state || {}

  const [selectedType, setSelectedType] = useState("")

  const [filters, setFilters] = useState({
    page: 1,
    limit: 9,
    "price[gt]": values[0],
    "price[lt]": values[1],
    type: selectedType
  });

  const { data: productData, isLoading } = useGetAllProductsQuery(filters);

  const { data: types } = useGetAllTypesQuery()

  useEffect(() => {
    if (type) {
      setSelectedType(type)
    }
  }, [type, setFilters])

  const numberOfPage = productData?.total && Math.ceil(productData?.total / filters.limit);
  // Update filters when slider values change
  useEffect(() => {
    setFilters((prev) => ({
      ...prev,
      "price[gt]": values[0],
      "price[lt]": values[1],
      type: selectedType,
      page: 1, // Reset to first page when filters change
    }));
  }, [values, selectedType]);

  const handlePageChange = (newPage: number) => {
    setFilters((prev) => ({
      ...prev,
      page: newPage,
    }));
  };

  return (
    <section className="flex gap-5 my-10">
      <div className="hidden md:block">
        <Card className="flex-1">
          <CardContent className="flex flex-col gap-5">
            <div className="space-y-3">
              <h5 className="text-primary font-semibold">
                Filter By price(MMK)
              </h5>
              <div className="grid grid-cols-2 gap-2">
                <div className="">
                  <label className="text-sm ">Min Price(MMK)</label>
                  <div className="border-2 border-foreground rounded mt-2">
                    <p className="text-center">{values[0]}</p>
                  </div>
                </div>
                <div className="">
                  <label className="text-sm ">Max Price(MMK)</label>
                  <div className="">
                    <div className="border-2 border-foreground rounded mt-2">
                      <p className="text-center">{values[1]}</p>
                    </div>
                  </div>
                </div>
              </div>
              <DualRangeSlider
                className="text-primary"
                value={values}
                onValueChange={setValues}
                min={2}
                max={4534534}
                step={1}
              />{" "}
            </div>
            <div className="space-y-3">
              <h5 className="text-primary font-semibold">Filter By Types</h5>
              <div>
                <Select value={selectedType} onValueChange={(value) => {
                  setSelectedType(value)
                }}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {
                        types?.data.map((type) => (
                          <SelectItem key={type._id} value={type._id}>
                            {type.name}
                          </SelectItem>
                        ))
                      }

                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-3">
              <h5 className="text-primary font-semibold">Filter By Category</h5>
              <div>
                <Select>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a fruit" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Fruits</SelectLabel>
                      <SelectItem value="apple">Apple</SelectItem>
                      <SelectItem value="banana">Banana</SelectItem>
                      <SelectItem value="blueberry">Blueberry</SelectItem>
                      <SelectItem value="grapes">Grapes</SelectItem>
                      <SelectItem value="pineapple">Pineapple</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-3">
              <h5 className="text-primary font-semibold">Sorting by Order</h5>
              <div className="flex justify-between">
                <Button size={"icon"}>
                  <SortAsc />
                </Button>
                <Button size={"icon"}>
                  <SortDesc />
                </Button>
                <Button size={"icon"}>
                  <Clock />
                </Button>
                <Button size={"icon"}>
                  <DollarSign />
                </Button>
                <Button
                  onClick={() => {
                    setValues([2, 9999999999]);
                    setFilters({
                      page: 1,
                      limit: 9,
                      "price[gt]": 2,
                      "price[lt]": 9999999999,
                      type: ""
                    });
                    setSelectedType("")
                  }}
                  size={"icon"}
                >
                  <RefreshCcw />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      <div className="w-full md:w-[75%] space-y-5">
        <FilterModal />

        {isLoading ? (
          <Skeletons />
        ) : (
          <>
            {productData?.data.length ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 md:grid-rows-3 lg:grid-cols-3 gap-5 ">
                  {productData?.data.map((product, i) => (
                    <ProductCard product={product} key={i} />
                  ))}
                </div>

                <Pagination
                  page={filters.page}
                  totalPages={numberOfPage || 1}
                  onPageChange={handlePageChange}
                />
              </>
            ) : (
              <Card className="border-card">
                <CardContent className="h-[500px] gap-5 flex flex-col items-center justify-center">
                  <div className="w-[70px] h-[70px] flex rounded-full items-center justify-center bg-accent">
                    <Search className="w-7 h-7 text-primary" />
                  </div>
                  <p className="text-lg text-foreground/80 capitalize font-bold">
                    There is no items found
                  </p>
                </CardContent>
              </Card>
            )}
          </>
        )}
      </div>
    </section>
  );
}

export default ProductListPage;
