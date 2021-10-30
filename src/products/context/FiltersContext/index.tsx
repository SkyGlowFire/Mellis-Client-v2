import {
  FC,
  useState,
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useCallback,
} from 'react';

interface IFiltersContext {
  sizes: SizeFilter[];
  setSizes: Dispatch<SetStateAction<SizeFilter[]>>;
  colors: ColorFilter[];
  setColors: Dispatch<SetStateAction<ColorFilter[]>>;
  sortBy: SortBy;
  setSortBy: Dispatch<SetStateAction<SortBy>>;
  price: PriceFilter;
  setPrice: Dispatch<SetStateAction<PriceFilter>>;
  sale: boolean;
  setSale: Dispatch<SetStateAction<boolean>>;
  filterQuery: string | null;
  setFilterQuery: Dispatch<SetStateAction<string | null>>;
  setDefaultFilters: (queryString: string) => void;
  applyFilters: () => void;
  activeFilter: FilterName | null;
  setActiveFilter: Dispatch<SetStateAction<FilterName | null>>;
  clearFilter: (name: FilterName) => void;
  minPrice: number;
  setminPrice: Dispatch<SetStateAction<number>>;
  maxPrice: number;
  setmaxPrice: Dispatch<SetStateAction<number>>;
}

export const allFilterValues = {
  sizes: ['xs', 's', 'm', 'l', 'xl', 'xxl'] as SizeFilter[],
  colors: [
    'red',
    'blue',
    'orange',
    'white',
    'black',
    'brown',
    'yellow',
    'green',
    'grey',
  ] as ColorFilter[],
  sortBy: [
    'recommended',
    'popular',
    'new',
    'price-up',
    'price-down',
  ] as SortBy[],
};

interface FilterValues {
  sizes: SizeFilter[];
  colors: ColorFilter[];
  sortBy: SortBy;
  price: PriceFilter;
  sale: boolean;
}

const initialState: IFiltersContext = {
  sizes: [],
  setSizes: () => {},
  colors: [],
  setColors: () => {},
  sortBy: 'recommended',
  setSortBy: () => {},
  price: [0, 1000],
  setPrice: () => {},
  sale: false,
  setSale: () => {},
  filterQuery: '',
  setFilterQuery: () => {},
  setDefaultFilters: () => {},
  applyFilters: () => {},
  activeFilter: null,
  setActiveFilter: () => {},
  clearFilter: () => {},
  minPrice: 0,
  setminPrice: () => {},
  maxPrice: 1000,
  setmaxPrice: () => {},
};

export const FiltersContext = createContext<IFiltersContext>(initialState);

export type SizeFilter = 'xs' | 's' | 'm' | 'l' | 'xl' | 'xxl';
export type ColorFilter =
  | 'red'
  | 'blue'
  | 'orange'
  | 'white'
  | 'black'
  | 'brown'
  | 'yellow'
  | 'green'
  | 'grey';
export type SortBy =
  | 'recommended'
  | 'popular'
  | 'new'
  | 'price-up'
  | 'price-down';
export type PriceFilter = [min: number, max: number];
export type FilterName = keyof FilterValues;

export const FiltersProvider: FC = ({ children }) => {
  const [sizes, setSizes] = useState<SizeFilter[]>([]);
  const [colors, setColors] = useState<ColorFilter[]>([]);
  const [sortBy, setSortBy] = useState<SortBy>('recommended');
  const [price, setPrice] = useState<PriceFilter>([0, 1000]);
  const [sale, setSale] = useState<boolean>(false);
  const [filterQuery, setFilterQuery] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState<FilterName | null>(null);
  const [minPrice, setminPrice] = useState(0);
  const [maxPrice, setmaxPrice] = useState(1000);
  const [applyTrigger, setApplyTrigger] = useState<boolean | null>(null);

  const setDefaultFilters = useCallback(
    (queryString: string) => {
      const queryFilters = new URLSearchParams(queryString);

      const sizeQuery = queryFilters.get('sizes');
      if (sizeQuery) {
        const values = sizeQuery.slice(1, -1).split(' ');
        setSizes(validateSizes(values));
      }

      const colorQuery = queryFilters.get('colors');
      if (colorQuery) {
        const values = colorQuery.slice(1, -1).split(' ');
        setColors(validateColors(values));
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
      }

      const saleQuery = queryFilters.get('sale');

      setSale(Boolean(saleQuery));

      const sortQuery = queryFilters.get('sort');
      if (sortQuery) {
        let sort = sortQuery.slice(1, -1);
        if (allFilterValues.sortBy.find((x) => x === sort)) {
          setSortBy(sort as SortBy);
        }
      }
    },
    [setSortBy, setSizes, setColors, setPrice, setSale, minPrice, maxPrice]
  );

  const applyFilters = useCallback(() => {
    let query = '';
    if (sizes.length > 0) {
      const sizeString = sizes.join('+');
      query += `sizes=[${sizeString}]&`;
    }
    if (colors.length > 0) {
      const colorString = colors.join('+');
      query += `colors=[${colorString}]&`;
    }
    if (sortBy !== 'recommended') {
      query += `sort=[${sortBy}]&`;
    }
    if (sale) {
      query += `sale=1&`;
    }
    if (price[0] !== minPrice || price[1] !== maxPrice) {
      query += `price=[${price.join('+')}]&`;
    }
    if (query !== '') query = query.slice(0, -1);
    setFilterQuery(query);
    setApplyTrigger(false);
  }, [sizes, colors, sortBy, sale, price, setFilterQuery, minPrice, maxPrice]);

  useEffect(() => {
    setPrice((prev) => [
      Math.min(minPrice, prev[0]),
      Math.max(maxPrice, prev[1]),
    ]);
  }, [minPrice, maxPrice]);

  useEffect(() => {
    if (applyTrigger) {
      applyFilters();
    }
  }, [applyTrigger, applyFilters]);

  function clearFilter(name: FilterName) {
    if (name === 'sizes') {
      setSizes([]);
    } else if (name === 'colors') {
      setColors([]);
    } else if (name === 'price') {
      setPrice([minPrice, maxPrice]);
    } else if (name === 'sortBy') {
      setSortBy('recommended');
    } else if (name === 'sale') {
      setSale(false);
    }
    setTimeout(() => setApplyTrigger(true), 200);
  }

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
        setDefaultFilters,
        applyFilters,
        activeFilter,
        setActiveFilter,
        clearFilter,
        minPrice,
        maxPrice,
        setmaxPrice,
        setminPrice,
      }}
    >
      {children}
    </FiltersContext.Provider>
  );
};

export const useFilters = () => useContext(FiltersContext);

function validateSizes(values: string[]): SizeFilter[] {
  const res: SizeFilter[] = [];
  values.forEach((val) => {
    if (allFilterValues.sizes.find((x) => x === val.toLowerCase())) {
      res.push(val as SizeFilter);
    }
  });
  return res;
}

function validateColors(values: string[]): ColorFilter[] {
  const res: ColorFilter[] = [];
  values.forEach((val) => {
    if (allFilterValues.colors.find((x) => x === val.toLowerCase())) {
      res.push(val as ColorFilter);
    }
  });
  return res;
}
