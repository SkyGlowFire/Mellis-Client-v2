import { makeStyles } from '@mui/styles';
import { Theme } from '@mui/material';
import { navHeight, searchbarHeight } from '~/styles/constants';
import { useAppDispatch, useAppSelector } from '~/app/hooks';
import { ChangeEvent, useState, useEffect } from 'react';
import { setSearchValue } from '~/common/state/mainSlice';
import { useFilters } from '~/app/hooks';

const useStyles = makeStyles<Theme, { active: boolean }>((theme) => ({
  root: {
    position: 'absolute',
    width: '100%',
    height: searchbarHeight,
    display: 'flex',
    top: navHeight,
    backgroundColor: theme.palette.background.paper,
    borderBottom: `1px solid ${theme.palette.primary.main}`,
  },
  btn: {
    border: 'none',
    padding: '0 1rem',
    cursor: 'pointer',
    color: theme.palette.background.paper,
    backgroundColor: theme.palette.primary.main,
    outline: 'none',
  },
  input: {
    flex: 1,
    border: 'none',
    padding: '0 1rem',
    outline: 'none',
    '&::placeholder': {
      color: theme.palette.primary.main,
    },
  },
  label: {
    display: 'none',
  },
  [theme.breakpoints.up('md')]: {
    root: {
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      height: '100%',
      width: '320px',
      top: 0,
      borderBottom: 'none',
      paddingTop: 0,
    },
    btn: {
      display: 'none',
    },
    input: {
      position: 'absolute',
      right: '50px',
      bottom: 5,
      padding: '.5rem',
      flex: 0,
      width: '200px',
      fontSize: '1rem',
      transition: 'width .4s ease',
      '&::placeholder': {
        fontSize: '14px',
      },
      '&:focus': {
        width: '270px',
        '& ~ $label': {
          left: '.5rem',
          bottom: 35,
          fontSize: '.8rem',
        },
      },
    },
    label: {
      display: 'inline',
      position: 'absolute',
      bottom: ({ active }) => (active ? 35 : 15),
      fontSize: ({ active }) => (active ? '.8rem' : '1rem'),
      left: 80,
      transition: 'all .4s ease',
      color: theme.palette.primary.main,
    },
  },
}));

const NavSearch = () => {
  const dispatch = useAppDispatch();
  const { searchValue } = useAppSelector((state) => state.main);
  const [timer, setTimer] = useState<ReturnType<typeof setTimeout> | null>(
    null
  );
  const classes = useStyles({ active: searchValue !== '' });
  const {
    filtersSetters: { setSearchText },
  } = useFilters();

  useEffect(() => {
    if (timer) clearTimeout(timer);
    if (searchValue === '') {
      setSearchText('');
    } else {
      setTimer(
        setTimeout(() => {
          setSearchText(searchValue);
        }, 500)
      );
    }
  }, [searchValue, dispatch, setSearchText]);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    dispatch(setSearchValue(e.target.value));
  };

  return (
    <form className={classes.root} onSubmit={(e) => e.preventDefault()}>
      <input
        className={classes.input}
        value={searchValue}
        onChange={onChange}
        type="search"
        aria-label="Search"
        id="search"
      />
      <label htmlFor="search" className={classes.label}>
        Search
      </label>
      <button className={classes.btn} type="submit">
        Search
      </button>
    </form>
  );
};

export default NavSearch;
