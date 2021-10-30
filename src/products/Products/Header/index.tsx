import { FC } from 'react';
import { makeStyles } from '@mui/styles';
import { Typography, Theme } from '@mui/material';
import NavigationBar from './NavigationBar';
import Links from './Links';
import { ICategory } from '~/types/categories';
import { fromUrlString } from '~/utils/textFormatters';

function defineBgColor(theme: Theme, categoryName?: string) {
  if (categoryName === 'men') {
    return theme.palette.info.light;
  } else if (categoryName === 'women') {
    return theme.palette.success.light;
  } else {
    return theme.palette.primary.light;
  }
}

const useStyles = makeStyles<Theme, { category?: string }>((theme) => ({
  root: {
    backgroundColor: ({ category }) => defineBgColor(theme, category),
    width: '100%',
    padding: '1.5rem 0',
  },
  info: {
    color: theme.palette.info.main,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    maxWidth: '60%',
    margin: '0 auto',
  },
  title: {
    fontWeight: 'bold',
  },
  description: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'inline',
    },
  },
}));

interface HeaderProps {
  category?: ICategory;
}

const Header: FC<HeaderProps> = ({ category: currentCategory }) => {
  const category = currentCategory?.path[0];
  const group = currentCategory?.path[1];
  const subGroup = currentCategory?.path[2];

  const classes = useStyles({ category });

  return (
    <div className={classes.root}>
      <div className={classes.info}>
        {currentCategory && (
          <NavigationBar
            group={group}
            subGroup={subGroup}
            category={category}
          />
        )}
        <Typography
          variant="h3"
          className={classes.title}
          color="primary"
          gutterBottom
          align="center"
        >
          {fromUrlString(category)} {fromUrlString(subGroup ? subGroup : group)}
        </Typography>
        {currentCategory?.text && (
          <Typography
            className={classes.description}
            variant="subtitle2"
            color="primary"
            gutterBottom
            align="center"
          >
            {currentCategory.text}
          </Typography>
        )}
      </div>
      {currentCategory && <Links category={currentCategory} />}
    </div>
  );
};

export default Header;
