import { FC } from 'react';
import Navbar from '../Navbar';
import { makeStyles } from '@mui/styles';
import { Theme } from '@mui/material';
import { navHeight, navHeight2, searchbarHeight } from '~/styles/constants';
import Spinner from '~/common/components/Spinner/Spinner';
import { useAppSelector } from '~/app/hooks';
import Footer from '../Footer';
import LookModal from '~/common/components/modals/LookModal';
import ImageModal from '~/common/components/modals/ImageModal';
import AddressModal from '~/common/components/modals/AddressModal';
import CartItemModal from '~/common/components/modals/CartItemModal';
import Alerts from '~/alerts/Alerts';
import SearchProducts from '~/products/SearchProducts/SearchProducts';

const useStyles = makeStyles<Theme>((theme) => ({
  main: {
    marginTop: navHeight + searchbarHeight,
    minHeight: '400px',
    position: 'relative',
    width: '100%',
    [theme.breakpoints.up('md')]: {
      marginTop: navHeight2,
    },
  },
}));

const MainLayout: FC = ({ children }) => {
  const classes = useStyles();
  const { isLoading } = useAppSelector((state) => state.main.loading);
  return (
    <>
      <Alerts />
      <CartItemModal />
      <LookModal />
      <ImageModal />
      <AddressModal />
      <Navbar />
      <SearchProducts />
      <main className={classes.main}>
        {isLoading && <Spinner />}
        {children}
      </main>
      <Footer />
    </>
  );
};

export default MainLayout;
