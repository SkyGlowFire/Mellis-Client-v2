import { makeStyles } from '@mui/styles';
import { Typography, Slide, Theme } from '@mui/material';
import { Link } from 'react-router-dom';
import ArrowBackwards from '@mui/icons-material/ArrowBackIos';
import { useEffect, useState, useContext } from 'react';
import { MobileNavContext } from '~/layout/Navbar/context/MobileNavContext';
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

const SubGroupList = () => {
  const classes = useStyles();
  const { activeCategory, activeSubCategory, level, setLevel, setOpen } =
    useContext(MobileNavContext);
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(level === 2);
  }, [level]);

  const backClickHandler = () => {
    setLevel(1);
  };

  return (
    <Slide
      direction="left"
      in={show}
      timeout={300}
      style={{ transitionDelay: level === 2 ? '.1s' : '0s' }}
    >
      <ul className={classes.root}>
        <li className={classes.headlink}>
          <Link
            to={`/category/${activeCategory?.title}/${activeSubCategory?.title}`}
          >
            <Typography
              color="primary"
              variant="h5"
              onClick={() => setOpen(false)}
              className={classes.title}
            >
              {fromUrlString(activeCategory?.title)}{' '}
              {fromUrlString(activeSubCategory?.title)}
            </Typography>
          </Link>

          <ArrowBackwards
            onClick={backClickHandler}
            className={classes.backIcon}
            color={'primary'}
            fontSize="small"
          />
        </li>
        {activeSubCategory &&
          activeSubCategory.children.map((link) => (
            <Link
              key={link._id}
              className={classes.link}
              to={`/category/${activeCategory?.title}/${activeSubCategory.title}/${link.title}`}
              onClick={() => setOpen(false)}
            >
              <Typography variant="h6" color="primary">
                {fromUrlString(link.title)}
              </Typography>
            </Link>
          ))}
      </ul>
    </Slide>
  );
};

export default SubGroupList;
