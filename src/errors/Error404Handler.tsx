import { FC, useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '~/app/hooks';
import { useLocation } from 'react-router-dom';
import Page404 from './Page404/Page404';
import { clearError } from '~/common/state/mainSlice';

const Error404Handler: FC = ({ children }) => {
  const { error } = useAppSelector((state) => state.main);
  const location = useLocation();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(clearError());
  }, [location, dispatch]);

  return error?.status === 404 ? <Page404 /> : <>{children}</>;
};

export default Error404Handler;
