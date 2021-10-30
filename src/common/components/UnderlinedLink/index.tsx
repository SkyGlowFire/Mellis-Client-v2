import { Link, LinkProps } from 'react-router-dom';
import { makeStyles } from '@mui/styles';
import { useState, FC } from 'react';
import clsx from 'clsx';
import { Typography, Theme, TypographyProps } from '@mui/material';

const useStyles = makeStyles<Theme, { color?: string; active: boolean }>(
  (theme) => {
    function defineColor(color?: string) {
      return color || theme.palette.primary.main;
    }
    return {
      root: {
        display: `inline-block`,
      },
      text: {
        color: ({ color }) => defineColor(color),
        backgroundImage: ({ color }) =>
          `linear-gradient(to right, ${defineColor(color)} 0, ${defineColor(
            color
          )} 100%)`,
        backgroundPosition: `0 90%`,
        backgroundSize: ({ active }) => (!active ? `0 2px` : `100% 2px`),
        backgroundRepeat: `no-repeat`,
        transition: `background .4s`,
      },
    };
  }
);

interface UnderlinedLinkProps extends LinkProps {
  active?: boolean;
  color?: string;
  variant?: TypographyProps['variant'];
  fontSize?: TypographyProps['fontSize'];
  fontWeight?: TypographyProps['fontWeight'];
}

const UnderlinedLink: FC<UnderlinedLinkProps> = ({
  active,
  color,
  variant,
  fontSize,
  fontWeight,
  className,
  ...props
}) => {
  const [hover, setHover] = useState(false);
  const classes = useStyles({ color, active: active || hover });
  return (
    <Link
      {...props}
      className={clsx(className, classes.root)}
      onMouseOver={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <Typography
        className={classes.text}
        fontSize={fontSize}
        fontWeight={fontWeight || 'normal'}
        variant={variant || 'body1'}
      >
        {props.children}
      </Typography>
    </Link>
  );
};

export default UnderlinedLink;
