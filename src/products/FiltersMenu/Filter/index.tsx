import { makeStyles } from '@mui/styles';
import { Typography, Button, Theme } from '@mui/material';
import { fromUrlString } from '~/utils/textFormatters';
import { FC } from 'react';
import { FilterName, useFilters } from '~/products/context/FiltersContext';
import CloseIcon from '@mui/icons-material/Close';

interface StyleProps {
  open: boolean;
  showCloseBtn: boolean;
}

const useStyles = makeStyles<Theme, StyleProps>((theme) => ({
  root: {
    position: 'relative',
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.primary.main,
  },
  header: {
    display: 'flex',
    borderStyle: 'solid',
    borderWidth: '1px 0 1px 0',
    borderColor: theme.palette.primary.main,
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '.2rem',
    fontSize: '.8rem',
    fontWeight: 'bold',
    cursor: 'pointer',
    color: theme.palette.primary.main,
    '& i': {
      transition: 'transform .3s ease',
      transform: ({ open }) => (!open ? 'rotate(0deg)' : 'rotate(90deg)'),
    },
  },
  closeBtn: {
    display: ({ showCloseBtn }) => (!showCloseBtn ? 'none' : 'flex'),
    position: 'absolute',
    top: '-14px',
    right: '0',
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    borderRadius: '50%',
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '.7rem',
    cursor: 'pointer',
    zIndex: 2,
    transition: 'all .3s ease',
    '&:hover': {
      transform: 'rotate(90deg) scale(1.05)',
    },
  },
  dropDown: {
    position: 'relative',
    top: -1,
    zIndex: 2,
  },
  dropdownBox: {
    maxHeight: ({ open }) => (!open ? 0 : 400),
    overflow: 'hidden',
    width: '100%',
    position: 'absolute',
    top: 0,
    transition: 'all .3s ease',
  },
  dropdownContent: {
    width: '100%',
    display: 'flex',
    border: `1px solid ${theme.palette.primary.main}`,
    flexDirection: 'column',
    backgroundColor: theme.palette.background.paper,
  },

  list: {
    maxHeight: 300,
  },
  btn: {
    borderRadius: 0,
  },
}));

interface FilterProps {
  name: FilterName;
  showCloseBtn: boolean;
}

//Wrapper Component for other filters. Includes filter popper header and apply button
const Filter: FC<FilterProps> = ({ name, children, showCloseBtn }) => {
  const { activeFilter, setActiveFilter, clearFilter, applyFilters } =
    useFilters();

  const classes = useStyles({
    open: activeFilter === name,
    showCloseBtn,
  });

  const toggleOpen = () => {
    if (activeFilter === name) {
      setActiveFilter(null);
      applyFilters();
    } else {
      setActiveFilter(name);
    }
  };

  const closeButtonHandler = () => {
    clearFilter(name);
  };

  return (
    <div className={classes.root}>
      <div className={classes.header} onClick={toggleOpen}>
        <Typography variant="body2">{fromUrlString(name)}</Typography>
        <i className="fas fa-angle-right"></i>
      </div>
      <span className={classes.closeBtn} onClick={closeButtonHandler}>
        <CloseIcon sx={{ fontSize: 12 }} />
      </span>
      <div className={classes.dropDown}>
        <div className={classes.dropdownBox}>
          <div className={classes.dropdownContent}>
            {children}
            <Button
              color="primary"
              variant="contained"
              className={classes.btn}
              onClick={applyFilters}
            >
              Apply
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Filter;
