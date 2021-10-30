import React, { useEffect, useState } from 'react';
import { Route, Switch, useLocation, useHistory } from 'react-router-dom';
import PrivateRoute from './routes/PrivateRoute';
import Login from './auth/Login/Login';
import MainLayout from '~/layout/MainLayout/MainLayout';
import Page404 from '~/errors/Page404/Page404';
import Home from '~/home/Home';
import Products from '~/products/Products/Products';
import Product from '~/product/Product';
import Cart from './cart';
import Favorites from './favorites';
import Checkout from './checkout';
import Profile from './profile/Profile';
import { getUser } from '~/auth/state/authSlice';
import { useAppDispatch, useAppSelector } from './app/hooks';
import Register from './auth/Register';
import { useFilters } from './products/context/FiltersContext';

function App() {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const [filtersMounted, setFiltersMounted] = useState<boolean>(false);
  const { push } = useHistory();
  const { searchQuery } = useAppSelector((state) => state.main);

  const { setDefaultFilters, filterQuery } = useFilters();

  useEffect(() => {
    if (!filtersMounted) {
      setDefaultFilters(location.search);
      setFiltersMounted(true);
    }
  }, [location, setDefaultFilters, filtersMounted, setFiltersMounted]);

  useEffect(() => {
    let url = `${location.pathname}?`;
    if (filterQuery) url += `${filterQuery}&`;
    if (searchQuery) url += `search=${searchQuery}`;
    push(url);
  }, [filterQuery, push, location.pathname, searchQuery]);

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
        <Route path="/cart" component={Cart} />
        <PrivateRoute path="/checkout" component={Checkout} />
        <Route path="/favorites" component={Favorites} />
        <Route exact path="/product/:id" component={Product} />
        <PrivateRoute path="/profile" component={Profile} />
        <Route component={Page404} />
      </Switch>
    </MainLayout>
  );
}

export default App;
