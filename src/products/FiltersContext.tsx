import { createContext, Dispatch, SetStateAction, useContext } from 'react';
import { Color, Size } from '~/types/products';

export const sizeValues: Size[] = ['xs', 's', 'm', 'l', 'xl', 'xxl'];
export const colorValues: Color[] = [
  'red',
  'blue',
  'orange',
  'white',
  'black',
  'brown',
  'yellow',
  'green',
  'grey',
];
export const sortByValues: SortBy[] = [
  'recommended',
  'popular',
  'new',
  'price-up',
  'price-down',
];

export type SortBy =
  | 'recommended'
  | 'popular'
  | 'new'
  | 'price-up'
  | 'price-down';
export type PriceFilter = [min: number, max: number];
export type FilterName = 'sizes' | 'colors' | 'sortBy' | 'price' | 'sale';

interface IFiltersContext {
  sizes: Size[];
  setSizes: Dispatch<SetStateAction<Size[]>>;
  colors: Color[];
  setColors: Dispatch<SetStateAction<Color[]>>;
  sortBy: SortBy;
  setSortBy: Dispatch<SetStateAction<SortBy>>;
  price: PriceFilter;
  setPrice: Dispatch<SetStateAction<PriceFilter>>;
  sale: boolean;
  setSale: Dispatch<SetStateAction<boolean>>;
  filterQuery: string;
  setFilterQuery: Dispatch<SetStateAction<string>>;
  activeFilter: FilterName | null;
  setActiveFilter: Dispatch<SetStateAction<FilterName | null>>;
  minPrice: number;
  setminPrice: Dispatch<SetStateAction<number>>;
  maxPrice: number;
  setmaxPrice: Dispatch<SetStateAction<number>>;
}

const initialState: IFiltersContext = {
  sizes: [],
  setSizes: () => {},
  colors: [],
  setColors: () => {},
  sortBy: 'recommended',
  setSortBy: () => {},
  price: [Infinity, -Infinity],
  setPrice: () => {},
  sale: false,
  setSale: () => {},
  filterQuery: '',
  setFilterQuery: () => {},
  activeFilter: null,
  setActiveFilter: () => {},
  minPrice: Infinity,
  setminPrice: () => {},
  maxPrice: -Infinity,
  setmaxPrice: () => {},
};

export const FiltersContext = createContext<IFiltersContext>(initialState);
export const useFiltersContext = () => useContext(FiltersContext);

export function validateSizes(values: string[]): Size[] {
  const res: Size[] = [];
  values.forEach((val) => {
    if (sizeValues.find((x) => x === val.toLowerCase())) {
      res.push(val as Size);
    }
  });
  return res;
}

export function validateColors(values: string[]): Color[] {
  const res: Color[] = [];
  values.forEach((val) => {
    if (colorValues.find((x) => x === val.toLowerCase())) {
      res.push(val as Color);
    }
  });
  return res;
}

export function validateSortBy(value: SortBy): boolean {
  return sortByValues.includes(value);
}
