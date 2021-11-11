import { TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
import {useEffect} from 'react'
import type { RootState, AppDispatch } from './store';
import {
    useFiltersContext,
    SortBy, 
    validateColors, 
    validateSizes, 
    validateSortBy, 
    FilterName
} from '~/products/FiltersContext'
import {useCallback} from 'react'

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useFilters = () => {
    const {
        sizes,
        setSizes,
        colors,
        setColors,
        sortBy,
        setSortBy,
        price,
        setPrice,
        sale,
        setSale,
        filterQuery,
        setFilterQuery,
        minPrice,
        maxPrice,
        setmaxPrice, 
        setminPrice,
        activeFilter,
        setActiveFilter
    } = useFiltersContext()

    const setDefaultFilters = useCallback(
        (queryString: string) => {
            const queryFilters = new URLSearchParams(queryString);

            const sizeQuery = queryFilters.get('sizes');
            if (sizeQuery) {
                const values = sizeQuery.slice(1, -1).split(' ');
                setSizes(validateSizes(values));
            } else {
                setSizes([])
            }

            const colorQuery = queryFilters.get('colors');
            if (colorQuery) {
                const values = colorQuery.slice(1, -1).split(' ');
                setColors(validateColors(values));
            } else {
                setColors([])
            }

            const priceQuery = queryFilters.get('price');
            if (priceQuery) {
                let values = priceQuery.slice(1, -1).split(' ');
                if (values.length === 2) {
                const min = Number(values[0]);
                const max = Number(values[1]);
                if (min >= minPrice && min < max && max <= maxPrice) {
                    setPrice([min, max]);
                }
                }
            } else {
                setPrice([minPrice, maxPrice])
            }

            const saleQuery = queryFilters.get('sale');

            setSale(Boolean(saleQuery));

            const sortQuery = queryFilters.get('sort');
            if (sortQuery) {
                let sort = sortQuery.slice(1, -1) as SortBy;
                if(validateSortBy(sort)) setSortBy(sort as SortBy)
            } else {
                setSortBy('recommended')
            }
        },
    [setSortBy, setSizes, setColors, setPrice, setSale, minPrice, maxPrice]
  );

  const applyFilters = useCallback((clearFilter?: FilterName) => {
    let query = '';
    if (sizes.length > 0 && clearFilter !== 'sizes') {
      const sizeString = sizes.join('+');
      query += `sizes=[${sizeString}]&`;
    }
    if (colors.length > 0 && clearFilter !== 'colors') {
      const colorString = colors.join('+');
      query += `colors=[${colorString}]&`;
    }
    if (sortBy !== 'recommended' && clearFilter !== 'sortBy') {
      query += `sort=[${sortBy}]&`;
    }
    if (sale && clearFilter !== 'sale') {
      query += `sale=1&`;
    }
    if ((price[0] !== minPrice || price[1] !== maxPrice) && clearFilter !== 'price') {
      query += `price=[${price.join('+')}]&`;
    }
    if (query !== '') query = query.slice(0, -1);
    setFilterQuery(query);
  }, [sizes, colors, sortBy, sale, price, setFilterQuery, minPrice, maxPrice]);

  const clearFilter = useCallback((name: FilterName) => {
    if (name === 'sizes') {
        setSizes([])
    } else if (name === 'colors') {
        setColors([])
    } else if (name === 'price') {
        setPrice([minPrice, maxPrice])
    } else if (name === 'sortBy') {
        setSortBy('recommended')
    } else if (name === 'sale') {
        setSale(false)
    }
    applyFilters(name)
  }, [applyFilters, setSale, setSizes, setSortBy, setColors])

  const filtersSetters = {setSortBy, setColors, setSizes, setPrice, setFilterQuery, setSale, setmaxPrice, setminPrice, setActiveFilter}
  const filtersState = {sortBy, colors, sizes, price, filterQuery, activeFilter, sale, maxPrice, minPrice}

  return {
      applyFilters, setDefaultFilters, clearFilter, filtersSetters, filtersState
  }
}
