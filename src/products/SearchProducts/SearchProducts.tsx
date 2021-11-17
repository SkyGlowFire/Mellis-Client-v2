import { FC, useEffect } from 'react';
import { useAppSelector } from '~/app/hooks';
import { makeStyles } from '@mui/styles';
import { Fade, Box, Typography, Theme } from '@mui/material';
import { useLocation } from 'react-router';
import { useLazySearchProductsQuery } from '~/app/api';
import FiltersMenu from '../FiltersMenu';
import { useFilters } from '~/app/hooks';
import MainContent from './MainContent';
import { useAppDispatch } from '~/app/hooks';
import { setSearchValue } from '~/common/state/mainSlice';
import { navHeight, navHeight2, searchbarHeight } from '~/styles/constants';

const useStyles = makeStyles<Theme>((theme) => ({
  searchpage: {
    position: 'fixed',
    top: navHeight + searchbarHeight + 1,
    width: '100%',
    bottom: 0,
    zIndex: 100,
    backgroundColor: '#fff',
    padding: '1rem 2rem',
    overflowY: 'auto',
    [theme.breakpoints.up('md')]: {
      top: navHeight2 + 1,
    },
  },
}));

const SearchProducts: FC = () => {
  const { searchMode } = useAppSelector((state) => state.main);
  const classes = useStyles();
  const location = useLocation();
  const {
    filtersSetters: { setmaxPrice, setminPrice },
    filtersState: { searchText },
  } = useFilters();
  const dispatch = useAppDispatch();

  const [searchProducts, { data }] = useLazySearchProductsQuery();

  useEffect(() => {
    if (searchMode) {
      searchProducts({ filters: location.search });
    }
  }, [searchMode, location.search, searchProducts]);

  useEffect(() => {
    if (searchMode && data) {
      setminPrice(data.minPrice || 0);
      setmaxPrice(data.maxPrice || 100);
    }
  }, [data, setmaxPrice, setminPrice, searchMode]);

  return (
    <Fade in={searchMode}>
      <div className={classes.searchpage}>
        {data && (
          <Box>
            <Box display="flex" justifyContent="space-between" sx={{ mb: 2 }}>
              <Typography variant="h6" color="primary">
                The search "{searchText}" has {data.total} results
              </Typography>
              <div
                onClick={() => dispatch(setSearchValue(''))}
                style={{ cursor: 'pointer' }}
              >
                Close
                <i
                  className="far fa-times-circle"
                  style={{ marginLeft: '6px' }}
                ></i>
              </div>
            </Box>
            <FiltersMenu total={data?.products.length || 0} />
            {data?.products && <MainContent products={data.products} />}
          </Box>
        )}
      </div>
    </Fade>
  );
};

export default SearchProducts;
