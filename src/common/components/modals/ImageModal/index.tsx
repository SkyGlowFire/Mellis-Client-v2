import { Dialog, DialogContent } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useAppDispatch, useAppSelector } from '~/app/hooks';
import { closeImageModal } from '~/common/state/mainSlice';

const useStyles = makeStyles({
  root: {
    scrollbarWidth: 'none',
    msOverflowStyle: 'none',
    WebkitOverflowScrolling: 'unset',
  },
  img: {
    borderRadius: '.3rem',
  },
});

const ImageModal = () => {
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const { imageModal } = useAppSelector((state) => state.main);
  return (
    <Dialog
      fullWidth
      open={imageModal.open}
      scroll="body"
      onClose={() => dispatch(closeImageModal())}
      className={classes.root}
      maxWidth="xl"
    >
      <DialogContent>
        <img src={imageModal.url} className={classes.img} width="100%" alt="" />
      </DialogContent>
    </Dialog>
  );
};

export default ImageModal;
