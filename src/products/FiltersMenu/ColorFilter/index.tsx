import FilterHeader from '../FilterHeader';
import { useFilters } from '~/app/hooks';
import { colorValues } from '~/products/FiltersContext';
import Filter from '../Filter';
import ColorItem from './ColorItem';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  container: {
    marginTop: '.5rem',
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    overflowY: 'scroll',
    maxHeight: '300px',
  },
});

const ColorFilter = () => {
  const {
    filtersSetters: { setColors },
    filtersState: { colors },
  } = useFilters();

  const selectAllHandler = () => {
    setColors(colorValues);
  };

  const clearHandler = () => {
    setColors([]);
  };

  const classes = useStyles();

  return (
    <Filter name="colors" showCloseBtn={colors.length > 0}>
      <FilterHeader
        selectAllHandler={selectAllHandler}
        clearHandler={clearHandler}
        selectedCount={colors.length}
      />
      <ul className={classes.container}>
        {colorValues.map((value) => (
          <ColorItem value={value} key={`color-${value}`} />
        ))}
      </ul>
    </Filter>
  );
};

export default ColorFilter;
