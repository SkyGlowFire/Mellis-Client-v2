import { Typography, Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Link } from 'react-router-dom';
import { useState, FC, CSSProperties, useEffect } from 'react';
import clsx from 'clsx';

type Color = 'primary' | 'secondary' | 'info' | 'success' | 'error' | 'warning';
type Variant = 'toRight' | 'toLeft' | 'toTop' | 'toBottom';

function defineColor(theme: Theme, color?: Color, dark?: boolean) {
  const colorType = dark ? 'main' : 'light';
  return color
    ? theme.palette[color][colorType]
    : theme.palette.success[colorType];
}

function bgPosition(reverse: boolean, variant?: Variant) {
  switch (variant) {
    case 'toRight':
      return !reverse ? `0 0` : '100% 0';
    case 'toLeft':
      return !reverse ? `100% 0` : `0 0`;
    case 'toTop':
      return `0 100%`;
    case 'toBottom':
      return `0 0`;
    default:
      return !reverse ? `0 0` : '100% 0';
  }
}

function bgDirection(reverse: boolean, variant?: Variant) {
  switch (variant) {
    case 'toRight':
      return !reverse ? 'to right' : 'to left';
    case 'toLeft':
      return !reverse ? 'to left' : 'to right';
    case 'toTop':
      return !reverse ? `to top` : `to bottom`;
    case 'toBottom':
      return !reverse ? `to bottom` : `to top`;
    default:
      return !reverse ? 'to right' : 'to left';
  }
}

function startingSize(variant?: Variant) {
  switch (variant) {
    case 'toRight':
    case 'toLeft':
      return `0 100%`;
    case 'toTop':
    case 'toBottom':
      return `100% 0`;
    default:
      return `0 100%`;
  }
}

type BoxType = 'button' | 'link' | 'text';

interface StyleProps {
  color?: Color;
  dark?: boolean;
  variant?: Variant;
  active: boolean;
  type?: BoxType;
  reverse: boolean;
}

const useStyles = makeStyles<Theme, StyleProps>((theme) => ({
  root: {
    backgroundImage: ({ color, dark, reverse, variant }) => {
      const bgColor = defineColor(theme, color, dark);
      const direction = bgDirection(reverse, variant);
      return `linear-gradient(${direction}, ${bgColor} 0, ${bgColor} 100%)`;
    },
    backgroundPosition: ({ variant, reverse }) => bgPosition(reverse, variant),
    backgroundSize: ({ active, variant }) =>
      !active ? startingSize(variant) : `100% 100%`,
    backgroundRepeat: `no-repeat`,
    transition: `background-size 1s cubic-bezier(0.19, 1, 0.22, 1)`,
    fontSize: 'inherit',
    color: ({ dark, active }) =>
      active
        ? dark
          ? theme.palette.background.paper
          : theme.palette.primary.main
        : theme.palette.primary.main,
    cursor: ({ type }) =>
      type && ['button', 'link'].includes(type) ? 'pointer' : 'default',
    outline: 'none',
    border: ({ type }) =>
      type && ['button', 'link'].includes(type)
        ? `1px solid ${theme.palette.primary.main}`
        : 'none',
    padding: '.2rem .4rem',
  },
}));

interface HoverBoxProps {
  color?: Color;
  dark?: boolean;
  variant?: Variant;
  active?: boolean;
  type?: BoxType;
  to?: string;
  style?: CSSProperties;
  className?: string;
  onClick?: () => void;
}

const HoverBox: FC<HoverBoxProps> = (props) => {
  const {
    color,
    active,
    dark,
    type,
    variant,
    children,
    className,
    to,
    ...rest
  } = props;
  const [hover, setHover] = useState(false);
  const [reverse, setReverse] = useState(false);

  const classes = useStyles({
    color,
    active: active || hover,
    type,
    dark,
    variant,
    reverse,
  });

  useEffect(() => {
    if (active || hover) {
      setReverse(false);
    } else {
      setReverse(true);
    }
  }, [active, hover]);

  const hoverHandlers = {
    onMouseEnter: () => {
      setHover(true);
    },
    onMouseLeave: () => {
      setHover(false);
    },
  };

  if (type === 'button') {
    return (
      <button
        {...hoverHandlers}
        className={clsx(className, classes.root)}
        {...rest}
      >
        {children}
      </button>
    );
  } else if (type === 'link') {
    return (
      <Link to={to || '/'} className={clsx(className, classes.root)}>
        <Typography {...hoverHandlers} {...rest}>
          {children}
        </Typography>
      </Link>
    );
  } else {
    return (
      <Typography
        {...hoverHandlers}
        className={clsx(className, classes.root)}
        {...rest}
      >
        {children}
      </Typography>
    );
  }
};

export default HoverBox;
