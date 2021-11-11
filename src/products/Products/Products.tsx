import Header from './Header';
import { makeStyles } from '@mui/styles';
import { Container, Theme } from '@mui/material';
import FiltersMenu from '../FiltersMenu';
import { useLazyGetProductsQuery } from '~/app/api';
import { useLocation, useParams } from 'react-router';
import MainContent from './MainContent';
import { useFilters } from '~/app/hooks';
import { useEffect } from 'react';
import { useAppSelector } from '~/app/hooks';

const useStyles = makeStyles<Theme>((theme) => ({
  main: {
    maxWidth: 500,
    marginTop: '2rem',
    [theme.breakpoints.up('sm')]: {
      maxWidth: 860,
    },
    [theme.breakpoints.up('md')]: {
      maxWidth: 1800,
    },
  },
}));

export interface ProductsUrlParams {
  category: string;
  group: string;
  subGroup: string;
}

const Products = () => {
  const classes = useStyles();
  const { category, group, subGroup } = useParams<ProductsUrlParams>();
  const location = useLocation();
  const { searchQuery } = useAppSelector((state) => state.main);
  const {
    filtersSetters: { setmaxPrice, setminPrice },
  } = useFilters();

  const [getProducts, { data }] = useLazyGetProductsQuery();

  useEffect(() => {
    if (searchQuery === '') {
      getProducts({
        category,
        group,
        subGroup,
        filters: location.search,
      });
    }
  }, [category, group, subGroup, searchQuery, location.search, getProducts]);

  useEffect(() => {
    if (searchQuery === '' && data) {
      setminPrice(data.minPrice || 0);
      setmaxPrice(data.maxPrice || 100);
    }
  }, [data, setmaxPrice, setminPrice, searchQuery]);

  return (
    <>
      <Header category={data?.category} />
      <Container maxWidth={false} className={classes.main}>
        <FiltersMenu total={data?.products.length || 0} />
        <MainContent products={data?.products || []} />
      </Container>
    </>
  );
};

export default Products;
