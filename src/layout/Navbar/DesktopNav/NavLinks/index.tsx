import { FC } from 'react';
import { useGetCategoriesQuery } from '~/app/api';
import NavLink from './NavLink';

const NavLinks: FC = () => {
  const { data: categories } = useGetCategoriesQuery();

  return (
    <div style={{ display: 'flex', height: '100%' }}>
      {categories &&
        categories.map((category) => (
          <NavLink key={category._id} category={category} />
        ))}
    </div>
  );
};

export default NavLinks;
