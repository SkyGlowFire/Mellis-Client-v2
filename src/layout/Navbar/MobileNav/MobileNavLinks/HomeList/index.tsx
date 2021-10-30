import { makeStyles } from '@mui/styles';
import ArrowForwards from '@mui/icons-material/ArrowForward';
import { Slide, Typography, Theme } from '@mui/material';
import { useGetCategoriesQuery } from '~/app/api';
import { ICategory } from '~/types/categories';
import { useContext } from 'react';
import { MobileNavContext } from '~/layout/Navbar/context/MobileNavContext';
import { fromUrlString } from '~/utils/textFormatters';

const useStyles = makeStyles<Theme>((theme) => ({
  root: {
    width: '100%',
    position: 'absolute',
    top: 0,
  },
  link: {
    borderBottom: `1px solid ${theme.palette.primary.main}`,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '.4rem .8rem',
    cursor: 'pointer',
    '&:hover': {
      '& > *': {
        transform: 'scale(1.1)',
        fontWeight: 'bold',
      },
    },
  },
}));

const secondaryLinks = ['Inspiration', 'Customer service', 'About', 'Contacts'];

const HomeList = () => {
  const { data: categories } = useGetCategoriesQuery();
  const { level, setLevel, setActiveCategory, setOpen } =
    useContext(MobileNavContext);
  const classes = useStyles();

  const mainClickHandler = (category: ICategory) => () => {
    setActiveCategory(category);
    setLevel(1);
  };

  return (
    <Slide
      in={level === 0}
      direction="right"
      timeout={300}
      style={{ transitionDelay: level === 0 ? '.1s' : '0s' }}
    >
      <ul className={classes.root}>
        {categories &&
          categories.map((category) => (
            <li
              className={classes.link}
              key={category.title}
              onClick={mainClickHandler(category)}
            >
              <Typography variant="h5" color="primary">
                {fromUrlString(category.title)}
              </Typography>
              <ArrowForwards
                className={classes.icon}
                color={'primary'}
                fontSize="small"
              />
            </li>
          ))}
        {secondaryLinks.map((link) => (
          <li
            className={classes.link}
            onClick={() => setOpen(false)}
            key={link}
          >
            <Typography
              variant="h6"
              color="primary"
              component="a"
              href={`#${link}`}
            >
              {link}
            </Typography>
          </li>
        ))}
      </ul>
    </Slide>
  );
};

export default HomeList;
