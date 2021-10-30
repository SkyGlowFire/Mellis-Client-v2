import { makeStyles } from '@mui/styles';
import { Theme } from '@mui/material';
import { FC } from 'react';

const useStyles = makeStyles<Theme, { active: boolean }>((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '.3rem .2rem',
    cursor: 'pointer',
    fontSize: '.9rem',
    fontWeight: 'bold',
    borderBottom: `1px solid ${theme.palette.primary.main}`,
    '&:hover': {
      backgroundColor: theme.palette.primary.light,
      color: theme.palette.primary.contrastText,
    },
    '& i.fa-check': {
      display: ({ active }) => (active ? 'inline' : 'none'),
    },
  },
}));

interface ListItemProps {
  isActive: boolean;
  value: string;
  onClick: () => void;
}

const FilterListItem: FC<ListItemProps> = ({ isActive, value, onClick }) => {
  const classes = useStyles({ active: isActive });
  return (
    <li key={`listitem-${value}`} onClick={onClick} className={classes.root}>
      <span>{value}</span>
      <i className="fas fa-check"></i>
    </li>
  );
};

export default FilterListItem;
