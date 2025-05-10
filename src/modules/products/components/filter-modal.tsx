import { FilterIcon, X } from "lucide-react";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import FilterNavigator from "./filter-navigator";
import { Button } from "@/components/ui/button";

function FilterModal() {
  return (
    <Dialog>
      <DialogTrigger className="md:hidden" asChild>
        <Button className="text-primary" variant={"outline"}>
          <FilterIcon />
          Filters{" "}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-4xl ">
        <DialogTitle className="text-foreground">Filters</DialogTitle>
        {/* Customize the close button color (keeps original positioning) */}
        <DialogClose
          className={
            "text-red-500 hover:text-red-600 " + // Your color changes
            "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground" // Default classes
          }
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </DialogClose>
        <FilterNavigator />
        <DialogDescription>Save your time by using filter</DialogDescription>
      </DialogContent>
    </Dialog>
  );
}

export default FilterModal;
