import { useFilters } from '~/app/hooks';
import Filter from '../Filter';
import FilterListItem from '../FilterListItem';

const SalesFilter = () => {
  const {
    filtersState: { sale },
    filtersSetters: { setSale },
  } = useFilters();
  return (
    <Filter name="sale" showCloseBtn={sale === true}>
      <ul style={{ maxHeight: 300 }}>
        <FilterListItem
          key={`sale-false`}
          isActive={sale === false}
          value={'See all'}
          onClick={() => setSale(false)}
        />
        <FilterListItem
          key={`sale-true`}
          isActive={sale === true}
          value={'Sale'}
          onClick={() => setSale(true)}
        />
      </ul>
    </Filter>
  );
};

export default SalesFilter;
