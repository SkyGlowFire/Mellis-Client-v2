import { useContext } from 'react';
import { makeStyles } from '@mui/styles';
import { Theme } from '@mui/material';
import { searchbarHeight, navHeight } from '~/styles/constants';
import HomeList from './HomeList';
import GroupList from './GroupList';
import SubGroupList from './SubGroupList';
import { MobileNavContext } from '../../context/MobileNavContext';

const useStyles = makeStyles<Theme, { open: boolean }>((theme) => ({
  root: ({ open }) => ({
    position: 'absolute',
    top: searchbarHeight + navHeight,
    width: '100%',
    maxHeight: open ? '100vh' : 0,
    height: '100vh',
    transition: 'max-height .5s ease',
    overflowX: 'hidden',
    overflowY: 'hidden',
    zIndex: 100,
    backgroundColor: theme.palette.primary.contrastText,
  }),
  underlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    overflowY: 'hidden',
    backgroundColor: theme.palette.primary.contrastText,
  },
}));

const MobileNavLinks = () => {
  const { open } = useContext(MobileNavContext);
  const classes = useStyles({ open });

  return (
    <div className={classes.root}>
      <div className={classes.underlay}>
        <HomeList key="1001" />
        <GroupList key="1002" />
        <SubGroupList key="1003" />
      </div>
    </div>
  );
};

export default MobileNavLinks;
