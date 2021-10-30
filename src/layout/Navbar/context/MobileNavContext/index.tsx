import { FC, useState, createContext, Dispatch, SetStateAction } from 'react';
import { ICategory } from '~/types/categories';

interface INavContext {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  level: number;
  setLevel: Dispatch<SetStateAction<number>>;
  activeCategory: null | ICategory;
  setActiveCategory: Dispatch<SetStateAction<null | ICategory>>;
  activeSubCategory: null | ICategory;
  setActiveSubCategory: Dispatch<SetStateAction<null | ICategory>>;
}

const initialState = {
  open: false,
  setOpen: () => {},
  level: 0,
  setLevel: () => {},
  activeCategory: null,
  setActiveCategory: () => {},
  activeSubCategory: null,
  setActiveSubCategory: () => {},
};

export const MobileNavContext = createContext<INavContext>(initialState);

export const MobileNavProvider: FC = ({ children }) => {
  const [open, setOpen] = useState<boolean>(false);
  const [level, setLevel] = useState<number>(0);
  const [activeCategory, setActiveCategory] = useState<null | ICategory>(null);
  const [activeSubCategory, setActiveSubCategory] = useState<null | ICategory>(
    null
  );
  return (
    <MobileNavContext.Provider
      value={{
        open,
        setOpen,
        level,
        setLevel,
        activeCategory,
        setActiveCategory,
        activeSubCategory,
        setActiveSubCategory,
      }}
    >
      {children}
    </MobileNavContext.Provider>
  );
};
