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
import { useAppDispatch } from '~/app/hooks';
import { logOut } from '~/auth/state/authSlice';

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
  const dispatch = useAppDispatch();
  const clickHandler = (link: typeof links[number]) => () => {
    history.push(`/profile/${link.to}`);
    onClose();
  };
  return (
    <div className={classes.root}>
      <div className={classes.header}>
        <Typography style={{ marginBottom: '1.2rem' }}>
          {user.username}
        </Typography>
        <Link
          color="textPrimary"
          onClick={() => dispatch(logOut())}
          underline="hover"
        >
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
