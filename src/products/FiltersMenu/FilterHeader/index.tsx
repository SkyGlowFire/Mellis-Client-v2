import { makeStyles } from '@mui/styles';
import { Theme } from '@mui/material';
import { FC } from 'react';

const useStyles = makeStyles<Theme>((theme) => ({
  header: {
    padding: '.2rem .5rem',
    display: 'flex',
    justifyContent: 'space-between',
    borderBottom: `1px solid ${theme.palette.primary.main}`,
    fontSize: '1rem',
    cursor: 'pointer',
    '&:hover': {
      color: theme.palette.primary.contrastText,
      backgroundColor: theme.palette.primary.light,
    },
  },
}));

interface FilterHeaderProps {
  selectAllHandler: () => void;
  clearHandler: () => void;
  selectedCount: number;
}

const FilterHeader: FC<FilterHeaderProps> = ({
  selectAllHandler,
  selectedCount,
  clearHandler,
}) => {
  const classes = useStyles();

  const onToggle = () => {
    if (selectedCount > 0) {
      clearHandler();
    } else {
      selectAllHandler();
    }
  };

  return (
    <div className={classes.header} onClick={onToggle}>
      <span>Selected: {selectedCount}</span>
      <span>{selectedCount > 0 ? 'Clear' : 'Select all'}</span>
    </div>
  );
};

export default FilterHeader;
