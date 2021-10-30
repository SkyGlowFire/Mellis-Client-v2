import { FC, useState, createContext, Dispatch, SetStateAction } from 'react';
import { ICategory } from '~/types/categories';

interface INavContext {
  sectionOpen: boolean;
  secondaryNavOpen: boolean;
  activeCategory: null | ICategory;
  setSectionOpen: Dispatch<SetStateAction<boolean>>;
  setSecondaryNavOpen: Dispatch<SetStateAction<boolean>>;
  setActiveCategory: Dispatch<SetStateAction<null | ICategory>>;
  activeSubCategory: null | ICategory;
  setActiveSubCategory: Dispatch<SetStateAction<null | ICategory>>;
}

const initialState = {
  sectionOpen: false,
  secondaryNavOpen: false,
  activeCategory: null,
  activeSubCategory: null,
  setSectionOpen: () => {},
  setSecondaryNavOpen: () => {},
  setActiveCategory: () => {},
  setActiveSubCategory: () => {},
};

export const DesktopNavContext = createContext<INavContext>(initialState);

export const DesktopNavProvider: FC = ({ children }) => {
  const [sectionOpen, setSectionOpen] = useState<boolean>(false);
  const [secondaryNavOpen, setSecondaryNavOpen] = useState<boolean>(false);
  const [activeCategory, setActiveCategory] = useState<null | ICategory>(null);
  const [activeSubCategory, setActiveSubCategory] = useState<null | ICategory>(
    null
  );
  return (
    <DesktopNavContext.Provider
      value={{
        sectionOpen,
        setSectionOpen,
        secondaryNavOpen,
        setSecondaryNavOpen,
        activeCategory,
        setActiveCategory,
        activeSubCategory,
        setActiveSubCategory,
      }}
    >
      {children}
    </DesktopNavContext.Provider>
  );
};
