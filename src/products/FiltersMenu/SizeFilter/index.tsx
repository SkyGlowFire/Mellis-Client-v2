import Filter from '../Filter';
import FilterHeader from '../FilterHeader';
import { useFilters } from '~/app/hooks';
import FilterListItem from '../FilterListItem';
import { sizeValues } from '~/products/FiltersContext';
import { Size } from '~/types/products';

const SizesFilter = () => {
  const {
    filtersSetters: { setSizes },
    filtersState: { sizes },
  } = useFilters();

  const selectAllHandler = () => {
    setSizes(sizeValues);
  };

  const clearHandler = () => {
    setSizes([]);
  };

  const toggleSize = (val: Size) => {
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
        {sizeValues.map((value) => (
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
