import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { DualRangeSlider } from "@/components/ui/dual-range-slider";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
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
import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";
import Pagination from "../components/pagination";
import Skeletons from "../components/skeletons";
import {
  useGetAllCategoriesQuery,
  useGetAllProductsQuery,
  useGetAllTypesQuery,
} from "../hooks/queries";

function ProductListPage() {
  const [values, setValues] = useState<number[]>([2, 4534534]);
  const { t } = useTranslation();
  const location = useLocation();

  const { type, search } = location.state || {};

  const [selectedType, setSelectedType] = useState("");

  const [selectedCategory, setSelectedCategory] = useState("");

  const [filters, setFilters] = useState({
    page: 1,
    limit: 9,
    "price[gt]": values[0],
    "price[lt]": values[1],
    "name[regex]": "",
    type: selectedType,
    category: selectedCategory,
  });

  const { data: productData, isLoading } = useGetAllProductsQuery(filters);

  const { data: categories } = useGetAllCategoriesQuery();

  const filteredCategories = useMemo(() => {
    return categories?.data.filter(
      (category) => category.type === selectedType
    );
  }, [categories, selectedType]);

  const { data: types } = useGetAllTypesQuery();

  useEffect(() => {
    if (type) {
      setSelectedType(type);
    }
  }, [type, setFilters]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const numberOfPage =
    productData?.pagination.totalResult &&
    Math.ceil(productData?.pagination.totalResult / filters.limit);
  // Update filters when slider values change
  useEffect(() => {
    setFilters((prev) => ({
      ...prev,
      "price[gt]": values[0],
      "price[lt]": values[1],
      type: selectedType,
      "name[regex]": search,
      page: 1,
      category: selectedCategory,
    }));
  }, [values, selectedType, search, selectedCategory]);

  const handlePageChange = (newPage: number) => {
    setFilters((prev) => ({
      ...prev,
      page: newPage,
    }));
  };

  return (
    <section className="flex gap-5 min-h-screen my-10">
      <div className="hidden md:block">
        <Card className="flex-1">
          <CardContent className="flex flex-col gap-5">
            <div className="space-y-3">
              <h5 className="text-primary font-semibold">
                {t("filter_by_price")}
              </h5>
              <div className="grid grid-cols-2 gap-2">
                <div className="">
                  <label className="text-sm ">{t("min_price")}</label>
                  <div className="border-2 border-foreground rounded mt-2">
                    <p className="text-center">{values[0]}</p>
                  </div>
                </div>
                <div className="">
                  <label className="text-sm ">{t("max_price")}</label>
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
              <h5 className="text-primary font-semibold">
                {t("filter_by_type")}
              </h5>
              <div>
                <Select
                  value={selectedType}
                  onValueChange={(value) => {
                    setSelectedType(value);
                  }}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder={t("select_type")} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {types?.data.map((type) => (
                        <SelectItem key={type._id} value={type._id}>
                          {type.name}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-3">
              <h5 className="text-primary font-semibold">
                {t("filter_by_category")}
              </h5>
              <div>
                <Select
                  value={selectedCategory}
                  onValueChange={(value) => {
                    setSelectedCategory(value);
                  }}
                >
                  <SelectTrigger disabled={!selectedType} className="w-full">
                    <SelectValue placeholder={t("select_category")} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {filteredCategories?.map((category) => (
                        <SelectItem key={category._id} value={category._id}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-3">
              <h5 className="text-primary font-semibold">
                {t("sorting_order")}
              </h5>
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
                      type: "",
                      "name[regex]": "",
                      category: "",
                    });
                    setSelectedType("");
                    location.state.search = " ";
                    setSelectedType("");
                    setSelectedCategory("");
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
        {/* <FilterModal /> */}

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
