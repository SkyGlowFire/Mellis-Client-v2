import { useFilters } from '~/app/hooks';
import { SortBy, sortByValues } from '~/products/FiltersContext';
import Filter from '../Filter';
import FilterListItem from '../FilterListItem';

const SortbyFilter = () => {
  const {
    filtersSetters: { setSortBy },
    filtersState: { sortBy },
  } = useFilters();

  function selectSort(val: SortBy) {
    if (val !== sortBy) setSortBy(val);
  }

  return (
    <Filter name="sortBy" showCloseBtn={sortBy !== 'recommended'}>
      <ul style={{ maxHeight: 300 }}>
        {sortByValues.map((sortType) => (
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
