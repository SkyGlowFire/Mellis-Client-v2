import { FC } from 'react';
import { makeStyles } from '@mui/styles';
import { SvgIcon } from '@mui/material';

const useStyles = makeStyles({
  icon: {
    cursor: 'pointer',
    display: 'inline-block',
    transition: 'all .3s ease-in-out',
    '&:hover': {
      transform: 'scale(1.1)',
    },
  },
});

interface SocialButtonProps {
  icon: FC<{}>;
  onClick?: () => void;
  color: string;
}

const SocialButton: FC<SocialButtonProps> = ({ icon, onClick, color }) => {
  const classes = useStyles();
  return (
    <span onClick={onClick} className={classes.icon}>
      <SvgIcon sx={{ color }} component={icon} fontSize="large" />
    </span>
  );
};

export default SocialButton;
