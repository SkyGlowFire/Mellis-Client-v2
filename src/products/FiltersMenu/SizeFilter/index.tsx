import Filter from '../Filter';
import FilterHeader from '../FilterHeader';
import {
  allFilterValues,
  SizeFilter,
  useFilters,
} from '~/products/context/FiltersContext';
import FilterListItem from '../FilterListItem';

const SizesFilter = () => {
  const { sizes, setSizes } = useFilters();

  const selectAllHandler = () => {
    setSizes(allFilterValues.sizes);
  };

  const clearHandler = () => {
    setSizes([]);
  };

  const toggleSize = (val: SizeFilter) => {
    setSizes((prev) => {
      if (prev.includes(val)) {
        return prev.filter((size) => size !== val);
      } else {
        return [...prev, val];
      }
    });
  };

  return (
    <Filter name="sizes" showCloseBtn={sizes.length > 0}>
      <FilterHeader
        selectAllHandler={selectAllHandler}
        clearHandler={clearHandler}
        selectedCount={sizes.length}
      />
      <ul style={{ maxHeight: 300 }}>
        {allFilterValues.sizes.map((value) => (
          <FilterListItem
            key={`size-${value}`}
            isActive={sizes.includes(value)}
            value={value}
            onClick={() => toggleSize(value)}
          />
        ))}
      </ul>
    </Filter>
  );
};

export default SizesFilter;
