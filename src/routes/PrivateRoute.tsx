import React, { FC, useEffect } from 'react';
import { Route, Redirect, useLocation, RouteProps } from 'react-router-dom';
import { useGetUserQuery, useLazyGetUserQuery } from '~/app/api';
import { useAppSelector, useAppDispatch } from '~/app/hooks';

type Roles = 'admin' | 'customer' | 'editor';

interface PrivateRouteProps extends RouteProps {
  component: React.FunctionComponent<any>;
  roles?: Roles[];
}

const PrivateRoute: FC<PrivateRouteProps> = ({
  component: ChildComponent,
  roles,
  ...rest
}) => {
  const location = useLocation();
  useGetUserQuery();

  const { isAuth, loading, user } = useAppSelector((state) => state.auth);

  return (
    <Route
      {...rest}
      render={(props) =>
        !loading &&
        (!isAuth || (user && roles && !roles.includes(user.role))) ? (
          <Redirect to={`/auth/login?from=${location.pathname}`} />
        ) : (
          <ChildComponent {...props} />
        )
      }
    />
  );
};

export default PrivateRoute;
