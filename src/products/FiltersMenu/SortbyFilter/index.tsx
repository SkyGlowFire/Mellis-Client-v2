import {
  useFilters,
  allFilterValues,
  SortBy,
} from '~/products/context/FiltersContext';
import Filter from '../Filter';
import FilterListItem from '../FilterListItem';

const SortbyFilter = () => {
  const { sortBy, setSortBy } = useFilters();

  function selectSort(val: SortBy) {
    if (val !== sortBy) setSortBy(val);
  }

  return (
    <Filter name="sortBy" showCloseBtn={sortBy !== 'recommended'}>
      <ul style={{ maxHeight: 300 }}>
        {allFilterValues.sortBy.map((sortType) => (
          <FilterListItem
            key={`sortby-${sortType}`}
            isActive={sortBy === sortType}
            value={sortType}
            onClick={() => selectSort(sortType)}
          />
        ))}
      </ul>
    </Filter>
  );
};

export default SortbyFilter;
