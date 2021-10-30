import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
} from '@mui/material';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import PaymentIcon from '@mui/icons-material/Payment';
import { useLocation, useHistory } from 'react-router-dom';
import { makeStyles } from '@mui/styles';
import { Fragment } from 'react';

const links = [
  { icon: <PaymentIcon />, text: 'My orders', to: '/profile/orders' },
  { icon: <AccountBoxIcon />, text: 'Personal info', to: '/profile/info' },
  {
    icon: <LocalShippingIcon />,
    text: 'Shipment address',
    to: '/profile/address',
  },
];

const useStyles = makeStyles({
  root: {
    border: '1px solid black',
    marginBottom: '1rem',
    maxWidth: 400,
  },
});

const SideNav = () => {
  const location = useLocation();
  const history = useHistory();
  const classes = useStyles();

  return (
    <List component="nav" className={classes.root} disablePadding>
      {links.map((link, idx) => (
        <Fragment key={`link-${link.to}`}>
          <ListItem
            button
            selected={location.pathname === link.to}
            key={`link-${idx}`}
            onClick={() => history.push(link.to)}
          >
            <ListItemIcon>{link.icon}</ListItemIcon>
            <ListItemText primary={link.text} />
          </ListItem>
          {idx !== links.length - 1 && <Divider />}
        </Fragment>
      ))}
    </List>
  );
};

export default SideNav;
