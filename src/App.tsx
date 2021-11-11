import { useEffect, useRef } from 'react';
import { Route, Switch, useLocation, useHistory } from 'react-router-dom';
import PrivateRoute from './routes/PrivateRoute';
import Login from './auth/Login/Login';
import MainLayout from '~/layout/MainLayout/MainLayout';
import Page404 from '~/errors/Page404/Page404';
import Home from '~/home/Home';
import Products from '~/products/Products/Products';
import Product from '~/product/Product';
import Cart from '~/cart';
import Favorites from '~/favorites';
import Checkout from '~/checkout';
import Profile from '~/profile/Profile';
import { getUser } from '~/auth/state/authSlice';
import { useAppDispatch, useAppSelector } from './app/hooks';
import Register from '~/auth/Register';
import { useFilters } from '~/app/hooks';
import { setCartItems } from '~/cart/cartSlice';
import { setFavItems } from '~/favorites/favoritesSlice';
import ForgotPassword from '~/auth/ForgotPassword/ForgotPassword';
import ResetPassword from '~/auth/ResetPassword';
import EmailSent from '~/auth/EmailSent';

const sessionKeys = {
  CART_ITEMS: 'CART_ITEMS',
  FAV_ITEMS: 'FAV_ITEMS',
};

function App() {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const firstRender = useRef(true);
  const { push } = useHistory();
  const { searchQuery } = useAppSelector((state) => state.main);
  const { items: cartItems } = useAppSelector((state) => state.cart);
  const { items: favItems } = useAppSelector((state) => state.favorites);

  const {
    setDefaultFilters,
    filtersState: { filterQuery },
  } = useFilters();

  useEffect(() => {
    if (firstRender.current) {
      setDefaultFilters(location.search);
    }
  }, [location, setDefaultFilters, firstRender]);

  useEffect(() => {
    if (firstRender.current) return;
    let url = `${location.pathname}?`;
    url += `${filterQuery}`;
    if (filterQuery !== '' && searchQuery) url += `&`;
    if (searchQuery) url += `search=${searchQuery}`;
    push(url);
  }, [filterQuery, push, location.pathname, searchQuery]);

  useEffect(() => {
    if (!firstRender.current) {
      sessionStorage.setItem(sessionKeys.CART_ITEMS, JSON.stringify(cartItems));
    }
  }, [cartItems, firstRender]);

  useEffect(() => {
    if (!firstRender.current) {
      sessionStorage.setItem(sessionKeys.FAV_ITEMS, JSON.stringify(favItems));
    }
  }, [favItems, firstRender]);

  useEffect(() => {
    const { CART_ITEMS, FAV_ITEMS } = sessionKeys;
    const exCartItems = sessionStorage.getItem(CART_ITEMS);
    if (exCartItems) {
      dispatch(setCartItems(JSON.parse(exCartItems)));
    }
    const exFavItems = sessionStorage.getItem(FAV_ITEMS);
    if (exFavItems) {
      dispatch(setFavItems(JSON.parse(exFavItems)));
    }
    firstRender.current = false;
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  return (
    <MainLayout>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/auth/login" component={Login} />
        <Route path="/auth/signup" component={Register} />
        <Route
          path="/category/:category/:group?/:subGroup?"
          component={Products}
        />
        <Route path="/auth/reset-password/:token" component={ResetPassword} />
        <Route path="/cart" component={Cart} />
        <PrivateRoute path="/checkout" component={Checkout} />
        <Route path="/favorites" component={Favorites} />
        <Route exact path="/product/:id" component={Product} />
        <PrivateRoute path="/profile" component={Profile} />
        <Route path="/auth/forgot-password" component={ForgotPassword} />
        <Route path="/auth/email-sent" component={EmailSent} />
        <Route component={Page404} />
      </Switch>
    </MainLayout>
  );
}

export default App;
