import { Dialog, Grid, DialogContent, Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useAppDispatch, useAppSelector } from '~/app/hooks';
import { closeLookModal } from '~/common/state/mainSlice';
import { useGetLookQuery } from '~/app/api';
import LookItemCard from './LookItemCard';

const useStyles = makeStyles<Theme>((theme) => ({
  root: {
    scrollbarWidth: 'none',
    msOverflowStyle: 'none',
    WebkitOverflowScrolling: 'unset',
  },
  container: {
    justifyContent: 'center',
    marginTop: '1rem',
    [theme.breakpoints.up('sm')]: {
      justifyContent: 'flex-start',
    },
  },
  content: {
    position: 'relative',
  },
  cardItem: {
    height: '100vw',
    minHeight: 300,
    [theme.breakpoints.up('sm')]: {
      minHeight: 400,
      height: '75vw',
      maxHeight: 700,
    },
    [theme.breakpoints.up('md')]: {
      height: '55vw',
    },
  },
}));

const LookModal = () => {
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const { lookModal } = useAppSelector((state) => state.main);
  const handleClose = () => {
    dispatch(closeLookModal());
  };

  const { data: look } = useGetLookQuery(lookModal.look);

  return (
    <Dialog
      onClose={handleClose}
      fullWidth
      open={lookModal.open}
      scroll="body"
      className={classes.root}
      maxWidth="lg"
    >
      <DialogContent classes={{ root: classes.content }}>
        <Grid
          container
          spacing={4}
          style={{ padding: '1rem' }}
          className={classes.container}
        >
          {look &&
            look.items?.map((item) => (
              <Grid
                item
                xs={10}
                sm={6}
                md={4}
                className={classes.cardItem}
                key={item._id}
              >
                <LookItemCard product={item} />
              </Grid>
            ))}
        </Grid>
      </DialogContent>
    </Dialog>
  );
};

export default LookModal;
