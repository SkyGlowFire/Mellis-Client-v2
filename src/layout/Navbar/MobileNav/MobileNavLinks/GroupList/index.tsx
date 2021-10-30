import { makeStyles } from '@mui/styles';
import { Typography, Theme, Slide } from '@mui/material';
import ArrowForwards from '@mui/icons-material/ArrowForwardIos';
import { Link } from 'react-router-dom';
import ArrowBackwards from '@mui/icons-material/ArrowBackIos';
import { useEffect, useState } from 'react';
import { useContext } from 'react';
import { MobileNavContext } from '~/layout/Navbar/context/MobileNavContext';
import { ICategory } from '~/types/categories';
import { fromUrlString } from '~/utils/textFormatters';

const useStyles = makeStyles<Theme>((theme) => ({
  root: {
    width: '100%',
    position: 'absolute',
    top: 0,
  },
  headlink: {
    borderBottom: `1px solid ${theme.palette.primary.main}`,
    display: 'flex',
    padding: '1rem 0',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  title: {
    '&:hover': {
      transform: 'scale(1.1)',
      fontWeight: 'bold',
    },
  },
  backIcon: {
    cursor: 'pointer',
    position: 'absolute',
    left: '1rem',
    '&:hover': {
      transform: 'scale(1.3)',
      fontWeight: 'bold',
    },
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

const GroupList = () => {
  const classes = useStyles();
  const { level, activeCategory, setActiveSubCategory, setLevel, setOpen } =
    useContext(MobileNavContext);
  const [show, setShow] = useState<boolean>(false);
  const [toLeft, setToLeft] = useState<boolean>(false);

  useEffect(() => {
    setShow(level === 1);
  }, [level]);

  const fwdClickHandler = (category: ICategory) => () => {
    setActiveSubCategory(category);
    setToLeft(true);
    setLevel(2);
  };

  const backClickHandler = () => {
    setToLeft(false);
    setLevel(0);
  };

  return (
    <Slide
      in={show}
      direction={toLeft ? 'right' : 'left'}
      timeout={300}
      style={{ transitionDelay: level === 1 ? '.1s' : '0s' }}
    >
      <ul className={classes.root}>
        <li className={classes.headlink}>
          <Link to={`/category/${activeCategory?.title}`}>
            <Typography
              color="primary"
              variant="h5"
              onClick={() => setOpen(false)}
              className={classes.title}
            >
              {fromUrlString(activeCategory?.title)}
            </Typography>
          </Link>
          <ArrowBackwards
            onClick={backClickHandler}
            className={classes.backIcon}
            color="primary"
            fontSize="small"
          />
        </li>
        {activeCategory &&
          activeCategory.children.map((subCategory) => (
            <li
              className={classes.link}
              key={subCategory._id}
              onClick={fwdClickHandler(subCategory)}
            >
              <Typography variant="h6" color="primary">
                {fromUrlString(subCategory.title)}
              </Typography>
              <ArrowForwards color={'primary'} fontSize="small" />
            </li>
          ))}
      </ul>
    </Slide>
  );
};

export default GroupList;
