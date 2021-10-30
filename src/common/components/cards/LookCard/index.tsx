import { makeStyles } from '@mui/styles';
import { Theme } from '@mui/material';
import HoverBox from '../../HoverBox/HoverBox';
import { openLookModal } from '~/common/state/mainSlice';
import { ILook } from '~/types/looks';
import { useAppDispatch } from '~/app/hooks';
import { FC } from 'react';

const useStyles = makeStyles<Theme>((theme) => ({
  root: {
    height: '100%',
    borderRadius: '.2rem',
    backgroundSize: 'cover',
    backgroundPosition: 'center 30%',
    position: 'relative',
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  button: {
    marginBottom: '1rem',
    padding: '.5rem',
    cursor: 'pointer',
    border: `1px solid ${theme.palette.primary.main}`,
    outline: 'none',
  },
}));

interface LookCardProps {
  look: ILook;
}

const LookCard: FC<LookCardProps> = ({ look }) => {
  const classes = useStyles();
  const dispatch = useAppDispatch();

  const onClick = () => {
    dispatch(openLookModal(look._id));
  };
  return (
    <div
      className={classes.root}
      style={{ backgroundImage: `url(${look.image.url})` }}
    >
      <HoverBox
        color="primary"
        dark
        type="button"
        className={classes.button}
        onClick={onClick}
      >
        SHOP THIS OUTFIT
      </HoverBox>
    </div>
  );
};

export default LookCard;
