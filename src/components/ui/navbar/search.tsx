"use client";

import { useGetAllSearchProductsQuery } from "@/modules/products/hooks/queries";
import { Search } from "lucide-react";
import { useState, useRef } from "react";
import { useDebouncedCallback } from "use-debounce";
import { Card } from "../card";
import { Input } from "../input";
import { useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useSidebar } from "../sidebar";

function NavSearch() {
  const { t } = useTranslation();
  const [inputValue, setInputValue] = useState("");
  const {toggleSidebar} = useSidebar()
  const [query, setQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigate = (searchValue: string) => {
    if (location.pathname === "/products") {
      navigate(location.pathname, {
        replace: false,
        state: { type: null, search: searchValue },
      });
    } else {
      navigate("/products", { state: { type: null, search: searchValue } });
    }
  };

  const debounced = useDebouncedCallback((value: string) => {
    setQuery(value);
    setShowSuggestions(true);
  }, 300);

  const { data, isLoading } = useGetAllSearchProductsQuery(
    query,
    query.length > 2
  );

  const suggestions = data?.product ?? [];

  const handleSelect = (productName: string) => {
    setInputValue(productName); // ✅ Keep input showing the clicked product
    toggleSidebar()
    setQuery(""); // ❌ Stop fetching
    setShowSuggestions(false); // ✅ Hide dropdown
    handleNavigate(productName); // 🚀 Navigate
  };

  return (
    <div className="relative  md:w-[420px]  bg-red-50 dark:bg-background rounded-xl block">
      <Search className="absolute left-3 top-1/2 h-6 w-6 -translate-y-1/2 text-primary" />
      <Input
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            handleNavigate(inputValue);
            setShowSuggestions(false);
            toggleSidebar()
          }
        }}
        ref={inputRef}
        type="search"
        value={inputValue}
        onChange={(e) => {
          const value = e.target.value;
          setInputValue(value);
          debounced(value);
        }}
        onFocus={() => {
          if (inputValue.length > 2) setShowSuggestions(true);
        }}
        placeholder={t("search_bar_placeholder")}
        className="pl-12 py-5"
      />

      {showSuggestions && inputValue.length > 0 && suggestions.length > 0 && (
        <Card className="absolute top-full mt-1 w-full z-10 p-2 max-h-64 overflow-y-auto">
          {suggestions.map((product, index) => (
            <div
              key={index}
              onClick={() => handleSelect(product.name)}
              className="cursor-pointer px-2 py-1 hover:bg-muted rounded"
            >
              {product.name}
            </div>
          ))}
        </Card>
      )}

      {showSuggestions && isLoading && (
        <Card className="absolute top-full w-full z-10 p-2 text-xs text-muted-foreground mt-1">
          {t("loading")}...
        </Card>
      )}

      {showSuggestions &&
        inputValue.length > 0 &&
        !isLoading &&
        suggestions.length === 0 && (
          <Card className="absolute top-full w-full z-10 p-2 text-xs text-muted-foreground mt-1">
            {t("no_products_found")}
          </Card>
        )}
    </div>
  );
}

export default NavSearch;
