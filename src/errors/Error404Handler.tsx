import { FC } from 'react';
import { useAppSelector } from '~/app/hooks';
import { useLocation } from 'react-router-dom';
import Page404 from './Page404/Page404';

const Error404Handler: FC = ({ children }) => {
  const { error } = useAppSelector((state) => state.main);
  return error?.status === 404 ? <Page404 /> : <>{children}</>;
};

export default Error404Handler;
