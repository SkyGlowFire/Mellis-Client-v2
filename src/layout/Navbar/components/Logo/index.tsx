import { Link } from 'react-router-dom';
import { makeStyles } from '@mui/styles';
import { Typography, Theme, Box, BoxProps } from '@mui/material';
import clsx from 'clsx';
import { FC } from 'react';

const useStyles = makeStyles<Theme>((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexGrow: 1,
    margin: '0 auto',
  },
  logo: {
    userSelect: 'none',
    fontWeight: 'bold',
    fontFamily: 'Segoe UI',
  },
  shimmer: {
    background: `${theme.palette.primary.main} -webkit-gradient(linear, 100% 0, 0 0, from(${theme.palette.primary.main}), color-stop(0.5, #ffffff), to(${theme.palette.primary.main}))`,
    backgroundPosition: `-4rem top`,
    backgroundRepeat: 'no-repeat',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    animation: `$shimmer 4s infinite`,
    backgroundSize: '4rem 100%',
  },
  '@keyframes shimmer': {
    '0%': {
      backgroundPosition: '-4rem top',
    },
    '70%': {
      backgroundPosition: '12.5rem top',
    },

    '100%': {
      backgroundPosition: '12.5rem top',
    },
  },
}));
const Logo: FC<BoxProps> = ({ className, ...props }) => {
  const classes = useStyles();
  return (
    <Box className={clsx(className, classes.root)} {...props}>
      <Link to="/">
        <Typography
          variant="h6"
          align="center"
          className={clsx(classes.logo, classes.shimmer)}
        >
          Mellis
        </Typography>
      </Link>
    </Box>
  );
};

export default Logo;
