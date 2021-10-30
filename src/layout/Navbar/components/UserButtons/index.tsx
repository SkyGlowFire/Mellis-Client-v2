import { Link, useHistory } from 'react-router-dom';
import CartIcon from '~/common/components/icons/CartIcon';
import FavIcon from '~/common/components/icons/FavIcon';
import { makeStyles } from '@mui/styles';
import { Theme } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useState } from 'react';
import PopUpBox from './PopUpBox';
import { FC, MouseEvent, TouchEvent } from 'react';
import { isMobile } from 'react-device-detect';

const useStyles = makeStyles<Theme>((theme) => ({
  root: {
    fontSize: '1.2rem',
    [theme.breakpoints.up('md')]: {
      marginRight: 10,
      fontSize: '.8rem',
    },
    display: 'flex',
  },
  item: {
    display: 'flex',
    alignItems: 'center',
    padding: '0 8px',
    cursor: 'pointer',

    '&:hover': {
      '& $icon': { transform: 'scale(1.2)', transition: 'all .4s ease' },
    },
  },

  icon: {
    transition: 'all .4s ease',
  },
}));

const links = [
  { to: '/profile/info', icon: AccountCircleIcon, title: 'profile' },
  { to: '/favorites', icon: FavIcon, title: 'favorites' },
  { to: '/cart', icon: CartIcon, title: 'cart' },
];

const UserButtons: FC = () => {
  const classes = useStyles();
  const [itemIdx, setItemIdx] = useState<number | null>(null);
  const [anchorEl, setAnchorEl] = useState<null | HTMLAnchorElement>(null);
  const [open, setOpen] = useState<boolean>(false);
  const history = useHistory();

  const onMouseEnter = (idx: number) => (e: MouseEvent<HTMLAnchorElement>) => {
    if (isMobile) return;
    setAnchorEl(e.currentTarget);
    setOpen(true);
    setItemIdx(idx);
  };

  const onMouseLeave = () => {
    setOpen(false);
    setItemIdx(null);
  };

  const onTouch = (idx: number) => (e: TouchEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (!open || itemIdx !== idx) {
      setAnchorEl(e.currentTarget);
      setOpen(true);
      setItemIdx(idx);
    } else {
      setAnchorEl(null);
      setOpen(false);
    }
  };

  const onClick = (to: string) => (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (!isMobile) {
      history.push(to);
    }
  };

  return (
    <div className={classes.root} onMouseLeave={onMouseLeave}>
      {links.map((link, idx) => (
        <Link
          className={classes.item}
          key={`${link.title}-iconLink`}
          onMouseEnter={onMouseEnter(idx)}
          to={link.to}
          onClick={onClick(link.to)}
          title={link.title}
          onTouchStart={onTouch(idx)}
        >
          <link.icon
            color="primary"
            fontSize="medium"
            className={classes.icon}
          />
        </Link>
      ))}
      <PopUpBox
        open={open}
        anchorEl={anchorEl}
        onClose={() => setOpen(false)}
        itemIdx={itemIdx}
      />
    </div>
  );
};

export default UserButtons;
