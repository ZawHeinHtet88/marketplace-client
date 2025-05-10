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
import { Clock, DollarSign, RefreshCcw, SortAsc, SortDesc } from "lucide-react";
import { useState } from "react";

function FilterNavigator() {
  const [values, setValues] = useState<number[]>([2, 4534534]);

  return (
    <Card className="flex-1">
      <CardContent className="flex flex-col gap-5">
        <div className="space-y-3">
          <h5 className="text-primary font-semibold">Filter By price(MMK)</h5>
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
            <Button size={"icon"}>
              <RefreshCcw />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default FilterNavigator;
