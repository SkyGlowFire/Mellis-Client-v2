import { makeStyles } from '@mui/styles';
import { Link } from 'react-router-dom';
import { useState, FC } from 'react';
import { Typography, Theme } from '@mui/material';
import HoverBox from '~/common/components/HoverBox/HoverBox';

const useStyles = makeStyles<Theme>((theme) => ({
  root: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      flexDirection: 'column',
    },
    '&:hover $image': {
      backgroundSize: '110%',
    },
  },
  image: {
    width: '30%',
    height: '35vw',
    marginRight: '1rem',
    backgroundSize: '100%',
    transition: 'background-size .3s ease-in-out',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center center',
    [theme.breakpoints.up('md')]: {
      width: '100%',
      marginBottom: '.5rem',
      marginRight: 0,
      height: '40vw',
    },
  },
  content: {
    flex: 1,
    padding: '.5rem 0',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  title: {
    marginBottom: '1rem',
    textAlign: 'start',
  },
}));

export interface IFeature {
  img: string;
  text: string;
}

interface FeaturedCardProps {
  feature: IFeature;
}

const FeaturedCard: FC<FeaturedCardProps> = ({ feature }) => {
  const classes = useStyles();
  const [active, setActive] = useState<boolean>(false);
  return (
    <>
      <Link
        to="/"
        className={classes.root}
        onMouseEnter={() => setActive(true)}
        onMouseLeave={() => setActive(false)}
      >
        <div
          style={{ backgroundImage: `url(${feature.img})` }}
          className={classes.image}
        />
        <div className={classes.content}>
          <HoverBox active={active} color="info" className={classes.title}>
            {feature.text}
          </HoverBox>
          <Typography style={{ letterSpacing: 3 }} color="primary">
            read
          </Typography>
        </div>
      </Link>
    </>
  );
};

export default FeaturedCard;
