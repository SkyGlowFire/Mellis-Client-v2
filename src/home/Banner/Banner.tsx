import { Link } from 'react-router-dom';
import { makeStyles } from '@mui/styles';
import { Typography, Theme, useTheme, useMediaQuery } from '@mui/material';
import { FC } from 'react';

const useStyles = makeStyles<Theme>((theme) => ({
  root: {
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: '0 50%',
    width: '100%',
    height: '36vw',
    position: 'relative',
  },
  content: {
    position: 'absolute',
    padding: '1rem',
    maxWidth: '50%',
    left: '2rem',
    bottom: '2rem',
    backgroundColor: 'rgba(0,0,0,.5)',
    color: '#fff',
  },
  links: {
    '& > a': {
      color: theme.palette.grey[200],
      marginLeft: 8,
      textDecoration: 'underline',
      '&:hover': {
        color: '#fff',
      },
    },
  },
}));

interface BannerProps {
  image: string;
}

const Banner: FC<BannerProps> = ({ image }) => {
  const classes = useStyles();
  const theme = useTheme();
  const matchUpMd = useMediaQuery(theme.breakpoints.up('md'));
  return (
    <div className={classes.root} style={{ backgroundImage: `url(${image})` }}>
      <div className={classes.content}>
        <Typography
          variant={matchUpMd ? 'h3' : 'h5'}
          gutterBottom
          color="inherit"
        >
          New collection Spring/Summer!
        </Typography>
        <Typography variant="body2" color="inherit" className={classes.links}>
          Check out our new collection for
          <Link to="/category/men">men</Link>,
          <Link to="/category/women">women</Link>,
          <Link to="/category/girls">girls</Link> and
          <Link to="/category/boys">boys</Link>
        </Typography>
      </div>
    </div>
  );
};

export default Banner;
