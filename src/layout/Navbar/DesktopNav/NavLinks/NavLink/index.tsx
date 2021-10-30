import { Link } from 'react-router-dom';
import { makeStyles } from '@mui/styles';
import { useState, FC, useContext, MouseEvent, TouchEvent } from 'react';
import { Typography, Theme } from '@mui/material';
import { ICategory } from '~/types/categories';
import { DesktopNavContext } from '~/layout/Navbar/context/DesktopNavContext';
import { isMobile } from 'react-device-detect';
import { useHistory } from 'react-router-dom';
import { fromUrlString } from '~/utils/textFormatters';

const useStyles = makeStyles<Theme, { active: boolean }>((theme) => {
  return {
    root: {
      display: `flex`,
      alignItems: 'center',
      padding: `.5rem 1.2rem`,
    },
    text: {
      color: theme.palette.primary.main,
      backgroundImage: `linear-gradient(to right, ${theme.palette.primary.main} 0, ${theme.palette.primary.main} 100%)`,
      backgroundPosition: `0 90%`,
      backgroundSize: ({ active }) => (!active ? `0 2px` : `100% 2px`),
      backgroundRepeat: `no-repeat`,
      transition: `background .4s`,
      fontWeight: 'normal',
      fontSize: '1rem',
    },
  };
});

interface NavLinkProps {
  category: ICategory;
}

const NavLink: FC<NavLinkProps> = (props) => {
  const { activeCategory, setActiveCategory, setSectionOpen, sectionOpen } =
    useContext(DesktopNavContext);
  const [hover, setHover] = useState<boolean>(false);
  const { category, ...rest } = props;
  const history = useHistory();
  const classes = useStyles({
    active: hover || (sectionOpen && activeCategory?._id === category._id),
  });

  function selectCategory(category: ICategory) {
    setActiveCategory(category);
    setSectionOpen(true);
  }

  const onMouseEnter = () => {
    if (!isMobile) {
      selectCategory(category);
    }
    setHover(true);
  };

  const onClick = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (!isMobile) {
      setSectionOpen(false);
      history.push(`/category/${category.title}`);
    }
  };

  const onTouchEnd = (e: TouchEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (!sectionOpen) {
      selectCategory(category);
    } else {
      setSectionOpen(false);
      history.push(`/category/${category.title}`);
    }
  };

  return (
    <Link
      {...rest}
      className={classes.root}
      onMouseEnter={onMouseEnter}
      onMouseLeave={() => setHover(false)}
      onClick={onClick}
      onTouchEnd={onTouchEnd}
      to={`/category/${category.title}`}
    >
      <Typography className={classes.text}>
        {fromUrlString(category.title)}
      </Typography>
    </Link>
  );
};

export default NavLink;
