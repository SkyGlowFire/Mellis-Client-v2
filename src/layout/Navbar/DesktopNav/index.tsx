import { useEffect, MouseEvent, useContext } from 'react';
import Logo from '~/layout/Navbar/components/Logo';
import UserButtons from '~/layout/Navbar/components/UserButtons';
import { makeStyles } from '@mui/styles';
import { Theme, Typography, Box } from '@mui/material';
import { navHeight2, navHeight } from '~/styles/constants';
import { DesktopNavContext } from '../context/DesktopNavContext';
import NavLinks from './NavLinks';
import NavBtn from '~/layout/Navbar/components/NavBtn';
import SecondaryNav from './SecondaryNav';
import SectionNav from './SectionNav';
import NavSearch from '../components/NavSearch';
import { useGetCategoriesQuery } from '~/app/api';

const useStyles = makeStyles<Theme>((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    position: 'fixed',
    top: 0,
    width: '100%',
    zIndex: 100,
    [theme.breakpoints.up('md')]: {
      marginBottom: 0,
      borderBottom: `1px solid ${theme.palette.primary.main}`,
    },
  },
  navContent: {
    position: 'relative',
    width: '100%',
  },
  mainMenu: {
    height: navHeight,
    width: '100%',
    display: 'flex',
    position: 'relative',
    alignItems: 'stretch',
    [theme.breakpoints.up('md')]: {
      height: navHeight2,
    },
  },
}));

const DesktopNav = () => {
  const { sectionOpen, setSecondaryNavOpen, setSectionOpen, secondaryNavOpen } =
    useContext(DesktopNavContext);
  const classes = useStyles();
  const { data, isFetching } = useGetCategoriesQuery();

  useEffect(() => {
    sectionOpen && setSecondaryNavOpen(false);
  }, [sectionOpen, setSecondaryNavOpen]);

  useEffect(() => {
    secondaryNavOpen && setSectionOpen(false);
  }, [secondaryNavOpen, setSectionOpen]);

  return (
    <nav
      className={classes.root}
      onMouseLeave={() => {
        setSectionOpen(false);
        setSecondaryNavOpen(false);
      }}
      onMouseOver={(e: MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();
        const hide = e.currentTarget.getAttribute('data-hide');
        if (hide) setSectionOpen(false);
      }}
    >
      <div className={classes.mainMenu}>
        {data && (
          <NavBtn
            toggled={secondaryNavOpen}
            onToggle={() => setSecondaryNavOpen((prev) => !prev)}
          />
        )}
        <SecondaryNav />
        {data && !isFetching && <NavLinks />}
        {isFetching && (
          <Box display="flex" alignItems="center" ml={3}>
            <Typography>Loading...</Typography>
          </Box>
        )}
        <Logo onMouseOver={() => setSectionOpen(false)} />
        <UserButtons />
        <NavSearch />
      </div>
      <SectionNav />
    </nav>
  );
};

export default DesktopNav;
