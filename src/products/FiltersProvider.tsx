import { FC, useState, useEffect } from 'react';
import {
  FiltersContext,
  SortBy,
  PriceFilter,
  FilterName,
} from './FiltersContext';

import { Size, Color } from '~/types/products';

export const FiltersProvider: FC = ({ children }) => {
  const [sizes, setSizes] = useState<Size[]>([]);
  const [colors, setColors] = useState<Color[]>([]);
  const [sortBy, setSortBy] = useState<SortBy>('recommended');
  const [price, setPrice] = useState<PriceFilter>([Infinity, -Infinity]);
  const [sale, setSale] = useState<boolean>(false);
  const [filterQuery, setFilterQuery] = useState<string>('');
  const [activeFilter, setActiveFilter] = useState<FilterName | null>(null);
  const [minPrice, setminPrice] = useState(Infinity);
  const [maxPrice, setmaxPrice] = useState(-Infinity);
  const [searchText, setSearchText] = useState<string>('');

  useEffect(() => {
    setPrice((prev) => [
      Math.min(minPrice, prev[0]),
      Math.max(maxPrice, prev[1]),
    ]);
  }, [minPrice, maxPrice]);

  return (
    <FiltersContext.Provider
      value={{
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
        activeFilter,
        setActiveFilter,
        minPrice,
        maxPrice,
        setmaxPrice,
        setminPrice,
        searchText,
        setSearchText,
      }}
    >
      {children}
    </FiltersContext.Provider>
  );
};
