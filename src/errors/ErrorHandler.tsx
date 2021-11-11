import { FC, useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '~/app/hooks';
import { useLocation } from 'react-router-dom';
import Page404 from './Page404/Page404';
import ErrorPage from './ErrorPage';
import { clearError } from '~/common/state/mainSlice';
import { clearUser } from '~/auth/state/authSlice';

const ErrorHandler: FC = ({ children }) => {
  const { error } = useAppSelector((state) => state.main);
  const location = useLocation();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(clearError());
  }, [location, dispatch]);

  useEffect(() => {
    if (error?.status === 401) {
      dispatch(clearUser());
    }
  }, [error, dispatch]);

  // return error?.status === 404 ? (
  //   <Page404 />
  // ) : error?.status === 'FETCH_ERROR' ? (
  //   <ErrorPage />
  // ) : (
  //   <>{children}</>
  // );
  return error?.status === 'FETCH_ERROR' ? <ErrorPage /> : <>{children}</>;
};

export default ErrorHandler;
