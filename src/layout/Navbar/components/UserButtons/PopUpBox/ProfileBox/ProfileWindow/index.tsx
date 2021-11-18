import { makeStyles } from '@mui/styles';
import {
  Typography,
  Link,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Theme,
} from '@mui/material';
import { useHistory } from 'react-router-dom';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import PaymentIcon from '@mui/icons-material/Payment';
import { FC, Fragment } from 'react';
import { IUser } from '~/types/user';
import { useLogoutMutation } from '~/app/api';
import { useGoogleLogout } from 'react-google-login';

const useStyles = makeStyles<Theme>((theme) => ({
  root: {
    width: 260,
    [theme.breakpoints.up('md')]: {
      width: 350,
    },
  },
  header: {
    backgroundColor: theme.palette.success.light,
    width: '100%',
    padding: '1rem',
  },
}));

const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID || '';

const links = [
  { icon: <PaymentIcon />, text: 'My orders', to: 'orders' },
  { icon: <AccountBoxIcon />, text: 'Personal info', to: 'info' },
  { icon: <LocalShippingIcon />, text: 'Shipment address', to: 'address' },
];

interface ProfileWindowProps {
  onClose: () => void;
  user: IUser;
}

const ProfileWindow: FC<ProfileWindowProps> = ({ onClose, user }) => {
  const classes = useStyles();
  const history = useHistory();
  const [logout] = useLogoutMutation();

  const googleLogoutSucces = () => {
    console.log('Google logout success');
  };

  const googleLogoutFail = () => {
    console.log('Google logout fail');
  };

  const { signOut: googleLogout } = useGoogleLogout({
    clientId,
    onLogoutSuccess: googleLogoutSucces,
    onFailure: googleLogoutFail,
  });

  const clickHandler = (link: typeof links[number]) => () => {
    history.push(`/profile/${link.to}`);
    onClose();
  };

  const logoutHandler = () => {
    googleLogout();
    logout();
  };

  return (
    <div className={classes.root}>
      <div className={classes.header}>
        <Typography style={{ marginBottom: '1.2rem' }}>
          {user.username}
        </Typography>
        <Link color="textPrimary" onClick={logoutHandler} underline="hover">
          Logout
        </Link>
      </div>
      <List component="nav" disablePadding>
        {links.map((link, idx) => (
          <Fragment key={`linkItem-${idx}`}>
            <ListItem button onClick={clickHandler(link)}>
              <ListItemIcon>{link.icon}</ListItemIcon>
              <ListItemText primary={link.text} />
            </ListItem>
            {idx !== links.length - 1 && <Divider />}
          </Fragment>
        ))}
      </List>
    </div>
  );
};

export default ProfileWindow;
