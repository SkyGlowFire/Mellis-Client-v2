import { Typography, Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Link } from 'react-router-dom';
import { useState, FC, useEffect, useContext, MouseEvent } from 'react';
import { SectionColor } from '../index';
import { ICategory } from '~/types/categories';
import { DesktopNavContext } from '~/layout/Navbar/context/DesktopNavContext';
import { fromUrlString } from '~/utils/textFormatters';

function defineColor(theme: Theme, color?: SectionColor) {
  return color ? theme.palette[color].light : theme.palette.success.light;
}

interface StyleProps {
  color?: SectionColor;
  active: boolean;
}

const useStyles = makeStyles<Theme, StyleProps>((theme) => ({
  root: {
    backgroundImage: ({ color }) => {
      const bgColor = defineColor(theme, color);
      return `linear-gradient(to top, ${bgColor} 0, ${bgColor} 100%)`;
    },
    backgroundPosition: '0 100%',
    backgroundSize: ({ active }) => (!active ? '100% 0' : `100% 100%`),
    backgroundRepeat: `no-repeat`,
    transition: `background-size 1s cubic-bezier(0.19, 1, 0.22, 1)`,
    fontSize: 'inherit',
    color: theme.palette.primary.main,
    cursor: 'pointer',
    outline: 'none',
    border: 'none',
    padding: '.5rem 1rem',
  },
}));

interface SectionLinkProps {
  color?: SectionColor;
  category: ICategory;
}

const SectionLink: FC<SectionLinkProps> = (props) => {
  const { color, category, ...rest } = props;
  const [hover, setHover] = useState(false);
  const {
    activeSubCategory,
    activeCategory,
    setActiveSubCategory,
    setSectionOpen,
  } = useContext(DesktopNavContext);
  const [isActive, setIsActive] = useState<boolean>(false);

  useEffect(() => {
    setIsActive(activeSubCategory?._id === category._id);
  }, [setIsActive, activeSubCategory, category]);

  const classes = useStyles({
    color,
    active: isActive || hover,
  });

  const linkHandlers = {
    onMouseEnter: () => {
      setActiveSubCategory(category);
      setHover(true);
    },
    onMouseLeave: () => {
      setHover(false);
    },
    onClick: (e: MouseEvent) => {
      if (!isActive) {
        e.preventDefault();
        setActiveSubCategory(category);
      } else {
        setSectionOpen(false);
      }
    },
  };

  return (
    <Link
      to={`/category/${activeCategory?.title}/${activeSubCategory?.title}`}
      className={classes.root}
    >
      <Typography {...linkHandlers} {...rest} variant="h6">
        {fromUrlString(category.title)}
      </Typography>
    </Link>
  );
};

export default SectionLink;
