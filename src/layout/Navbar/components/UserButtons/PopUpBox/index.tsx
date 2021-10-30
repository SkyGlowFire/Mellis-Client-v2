import { Popper, Theme, PopperProps, Fade } from '@mui/material';
import ProfileBox from './ProfileBox';
import FavoriteBox from './FavoriteBox';
import CartBox from './CartBox';
import { makeStyles } from '@mui/styles';
import { FC } from 'react';

const useStyles = makeStyles<Theme>((theme) => ({
  root: {
    border: '1px solid black',
    backgroundColor: '#fff',
  },
}));

interface PopUpBoxProps {
  open: boolean;
  itemIdx: number | null;
  onClose: () => void;
  anchorEl: PopperProps['anchorEl'];
}

const PopUpBox: FC<PopUpBoxProps> = ({ open, anchorEl, onClose, itemIdx }) => {
  const classes = useStyles();
  return (
    <Popper
      open={open}
      anchorEl={anchorEl}
      onMouseLeave={onClose}
      placement="bottom"
      style={{ zIndex: 2000 }}
      transition
    >
      {({ TransitionProps }) => (
        <Fade {...TransitionProps} timeout={700}>
          <div className={classes.root}>
            {itemIdx === 0 && <ProfileBox onClose={onClose} />}
            {itemIdx === 1 && <FavoriteBox onClose={onClose} />}
            {itemIdx === 2 && <CartBox onClose={onClose} />}
          </div>
        </Fade>
      )}
    </Popper>
  );
};

export default PopUpBox;
