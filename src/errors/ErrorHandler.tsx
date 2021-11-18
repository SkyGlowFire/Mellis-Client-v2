import { FC, useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '~/app/hooks';
import { useLocation } from 'react-router-dom';
import ErrorPage from './ErrorPage';
import { clearError } from '~/common/state/mainSlice';

const ErrorHandler: FC = ({ children }) => {
  const { error } = useAppSelector((state) => state.main);
  const location = useLocation();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(clearError());
  }, [location, dispatch]);

  return error?.status === 'FETCH_ERROR' ? <ErrorPage /> : <>{children}</>;
};

export default ErrorHandler;
