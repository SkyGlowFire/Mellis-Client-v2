import { useContext } from 'react';
import NavSearch from '../components/NavSearch';
import NavBtn from '~/layout/Navbar/components/NavBtn';
import Logo from '../components/Logo';
import UserButtons from '../components/UserButtons';
import { makeStyles } from '@mui/styles';
import { Theme } from '@mui/material';
import { navHeight2, navHeight } from '~/styles/constants';
import { MobileNavContext } from '../context/MobileNavContext';
import MobileNavLinks from './MobileNavLinks';

const useStyles = makeStyles<Theme>((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    position: 'fixed',

    top: 0,
    width: '100vw',
    zIndex: 1000,
    [theme.breakpoints.up('md')]: {
      marginBottom: 0,
      borderBottom: `1px solid ${theme.palette.primary.main}`,
    },
  },
  navContent: {
    position: 'relative',
    maxWidth: '100%',
  },
  mainMenu: {
    height: navHeight,
    display: 'flex',
    alignItems: 'stretch',
    [theme.breakpoints.up('md')]: {
      height: navHeight2,
    },
  },
}));

const MobileNav = () => {
  const classes = useStyles();
  const { open, setOpen } = useContext(MobileNavContext);
  return (
    <nav className={classes.root}>
      <div className={classes.navContent}>
        <div className={classes.mainMenu}>
          <NavBtn toggled={open} onToggle={() => setOpen((prev) => !prev)} />
          <Logo />
          <UserButtons />
          <NavSearch />
        </div>
        <MobileNavLinks />
      </div>
    </nav>
  );
};

export default MobileNav;
