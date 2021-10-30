import { Link } from 'react-router-dom';
import { makeStyles } from '@mui/styles';
import { navHeight, searchbarHeight, navHeight2 } from '~/styles/constants';
import { Grid, Typography, Theme } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useContext } from 'react';
import { DesktopNavContext } from '../../context/DesktopNavContext';
import StarIcon from '@mui/icons-material/Star';

const useStyles = makeStyles<Theme, { open: boolean }>((theme) => ({
  root: {
    position: 'absolute',
    zIndex: 10,
    top: navHeight + searchbarHeight + 1,
    overflow: 'hidden',
    maxHeight: ({ open }) => (!open ? 0 : 200),
    transition: 'all .3s ease-in-out',
    [theme.breakpoints.up('md')]: {
      top: navHeight2 + 1,
    },
  },
  list: {
    borderRight: `1px solid ${theme.palette.primary.main}`,
  },
  linkItem: {
    borderBottom: `1px solid ${theme.palette.primary.main}`,
    margin: 0,
    padding: '.6rem 1.1rem',
    backgroundColor: `#fff`,
    color: theme.palette.primary.main,
    '&:hover': {
      color: `#fff`,
      backgroundColor: theme.palette.primary.main,
    },
  },
}));

const links = [
  { title: 'Profile', to: '/profile/info', icon: PersonIcon },
  { title: 'Favorites', to: '/favorites', icon: StarIcon },
  { title: 'Cart', to: '/cart', icon: ShoppingCartIcon },
];

const SecondaryNav = () => {
  const { secondaryNavOpen, setSecondaryNavOpen } =
    useContext(DesktopNavContext);
  const classes = useStyles({ open: secondaryNavOpen });

  return (
    <div className={classes.root}>
      <div className={classes.list}>
        {links.map((link) => (
          <Link
            to={link.to}
            onClick={() => setSecondaryNavOpen(false)}
            key={`link-${link.to}`}
          >
            <Grid container className={classes.linkItem} alignItems="center">
              <Grid item style={{ marginRight: '.5rem' }}>
                {<link.icon fontSize="medium" />}
              </Grid>
              <Grid item>
                <Typography variant="subtitle1">{link.title}</Typography>
              </Grid>
            </Grid>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SecondaryNav;
