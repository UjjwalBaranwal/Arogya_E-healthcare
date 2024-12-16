import { useSearchParams } from "react-router-dom";
import Select from "./Select";
function Filter({ filterField, options }) {
  const [searchParmas, setSearchParams] = useSearchParams();
  const currentFilter = searchParmas.get(filterField) || null;
  function onChange(e) {
    const value = e.target.value;
    searchParmas.set(filterField, value);
    setSearchParams(searchParmas);
  }
  return (
    <Select
      handleChange={onChange}
      value={currentFilter}
      options={options}
    ></Select>
  );
}

export default Filter;
