import { Grid, Container, Typography, Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';
import SideNav from './SideNav';
import OrdersTable from './OrdersTable';
import Addresses from './Addresses';
import UserForm from './UserForm';
import { Route, Switch } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';

const useStyles = makeStyles<Theme>((theme) => ({
  root: {
    maxWidth: 800,
    paddingTop: '2rem',
    [theme.breakpoints.up('md')]: {
      maxWidth: 1600,
    },
  },
}));

const Profile = () => {
  const classes = useStyles();
  const [title, setTitle] = useState('Profile Info');
  const location = useLocation();
  useEffect(() => {
    switch (location.pathname) {
      case '/profile/orders':
        setTitle('My orders');
        break;
      case '/profile/info':
        setTitle('Profile info');
        break;
      case '/profile/address':
        setTitle('Shipment address');
        break;
      default:
        break;
    }
  }, [location]);

  return (
    <Container maxWidth={false} className={classes.root}>
      <Typography variant="h5" style={{ marginBottom: '2rem' }}>
        {title}
      </Typography>
      <Grid container spacing={4}>
        <Grid item xs={12} md={3}>
          <SideNav />
        </Grid>
        <Grid item xs={12} md={9}>
          <Switch>
            <Route path="/profile/orders" component={OrdersTable} />
            <Route path="/profile/info" component={UserForm} />
            <Route path="/profile/address" component={Addresses} />
          </Switch>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Profile;
