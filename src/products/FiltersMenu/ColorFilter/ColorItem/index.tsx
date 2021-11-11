import { makeStyles } from '@mui/styles';
import { Theme } from '@mui/material';
import { FC } from 'react';
import { useFilters } from '~/app/hooks';
import { Color } from '~/types/products';

const useStyles = makeStyles<Theme, { active: boolean; color: Color }>(
  (theme) => ({
    root: {
      display: 'flex',
      justifyContent: 'space-between',
      flexDirection: 'column',
      cursor: 'pointer',
      padding: '.3rem .2rem',
      marginBottom: '.2rem',
      alignItems: 'center',
      '&:hover': {
        backgroundColor: theme.palette.primary.light,
        color: theme.palette.primary.contrastText,
      },
    },
    text: {
      textDecoration: ({ active }) => (active ? 'underline' : 'none'),
      fontWeight: ({ active }) => (active ? 'bold' : 'normal'),
    },
    circle: {
      width: 40,
      height: 40,
      borderRadius: '50%',
      border: ({ active }) => (active ? '1px solid black' : 'none'),
      backgroundColor: ({ color }) => color,
    },
  })
);

interface ColorItemProps {
  value: Color;
}

const ColorItem: FC<ColorItemProps> = ({ value }) => {
  const {
    filtersState: { colors },
    filtersSetters: { setColors },
  } = useFilters();

  const toggleColor = (val: Color) => {
    setColors((prev) => {
      if (prev.includes(val)) {
        return prev.filter((color) => color !== val);
      } else {
        return [...prev, val];
      }
    });
  };

  const classes = useStyles({ active: colors.includes(value), color: value });
  return (
    <li key={value} onClick={() => toggleColor(value)} className={classes.root}>
      <span className={classes.circle} />
      <p className={classes.text}>{value}</p>
    </li>
  );
};

export default ColorItem;
