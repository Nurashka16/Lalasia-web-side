import Search from "../../../common/components/Search/Search";
import ProductsFilter from "./ProductsFilter";
import productsStore from "../../stores/products-store";

const Filter = () => {
  const { search, selectedFilters, addFilter } = productsStore;
  return (
    <>
      <Search onClick={search} />
      <ProductsFilter selectedFilters={selectedFilters} addFilter={addFilter} />
      <ProductsFilter selectedFilters={selectedFilters} addFilter={addFilter} />
      <ProductsFilter selectedFilters={selectedFilters} addFilter={addFilter} />
    </>
  );
};

export default Filter;
