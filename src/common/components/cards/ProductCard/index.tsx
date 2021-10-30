import { useState, FC, MouseEvent, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Grid, Typography, Theme, Box, SvgIcon } from '@mui/material';
import { makeStyles } from '@mui/styles';
import VisibilityIcon from '@mui/icons-material/Visibility';
import HoverBox from '../../HoverBox/HoverBox';
import { IProduct } from '~/types/products';
import { useAppDispatch, useAppSelector } from '~/app/hooks';
import { addFavItem, removeFavItem } from '~/favorites/favoritesSlice';
import { isMobile } from 'react-device-detect';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import StarIcon from '@mui/icons-material/Star';
import StarOutlineIcon from '@mui/icons-material/StarOutline';

const useStyles = makeStyles<Theme, { active: boolean }>((theme) => ({
  root: {
    height: '100%',
    width: '100%',
    cursor: 'pointer',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
    boxShadow: '1px 1px 3px rgba(0, 0, 0, 0.2)',
    borderRadius: '8px',
  },
  media: {
    backgroundPosition: 'center 10%',
    flex: '1',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    borderRadius: '10px 10px 0 0',
  },
  actions: {
    opacity: ({ active }) => (active ? '100%' : '0'),
    transition: 'opacity .4s ease-in-out',
  },
  content: {
    padding: '.5rem',
  },
  overlay: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '10px 10px 0 0',
    height: '100%',
    transition: 'opacity .2s ease',
    backgroundColor: 'rgba(0, 0, 0, .3)',
    opacity: ({ active }) => (active ? '100%' : 0),
  },
  comparePrice: {
    textDecoration: 'line-through',
    marginRight: 8,
    color: theme.palette.text.secondary,
  },
}));

interface ProductCardProps {
  product: IProduct;
  onClick?: () => void;
}

const ProductCard: FC<ProductCardProps> = ({ product, onClick }) => {
  const [active, setActive] = useState(false);
  const { items: favorites } = useAppSelector((state) => state.favorites);
  const [isFavorite, setFavorite] = useState<boolean>(false);

  const dispatch = useAppDispatch();
  const classes = useStyles({ active });

  const history = useHistory();

  useEffect(() => {
    setFavorite(
      favorites.findIndex((x) => x.product._id === product._id) !== -1
    );
  }, [favorites]);

  const cardClickHandler = () => {
    if (onClick) onClick();
    history.push(`/product/${product._id}`);
  };

  const favBtnHandler = (e: MouseEvent<SVGSVGElement>) => {
    e.stopPropagation();

    if (isFavorite) {
      const favItem = favorites.find((x) => x.product._id === product._id);
      favItem && dispatch(removeFavItem(favItem.id));
    } else {
      dispatch(addFavItem(product));
    }
  };

  return (
    <div
      className={classes.root}
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
      onClick={!isMobile ? cardClickHandler : undefined}
    >
      <div
        className={classes.media}
        style={{ backgroundImage: `url(${product.image?.url})` }}
        title={product.title}
      >
        {!isMobile && (
          <div className={classes.overlay}>
            <VisibilityIcon
              fontSize="small"
              style={{ color: 'rgba(255,255,255,.6)' }}
            />
          </div>
        )}
      </div>
      <div className={classes.content}>
        <HoverBox
          color="info"
          active={active}
          style={{ display: 'inline-block' }}
        >
          {product.title}
        </HoverBox>
        <Grid container>
          <Grid item xs>
            <Typography variant="body2" gutterBottom>
              {product?.comparePrice > 0 && (
                <span className={classes.comparePrice}>
                  ${product?.comparePrice}
                </span>
              )}
              <span style={{ fontWeight: 'bold' }}>${product.price}</span>
            </Typography>
          </Grid>
          {!isMobile && (
            <Grid item>
              <SvgIcon
                className={classes.actions}
                fontSize="small"
                component={isFavorite ? StarIcon : StarOutlineIcon}
                color="warning"
                sx={{ cursor: 'pointer' }}
                onClick={favBtnHandler}
              />
            </Grid>
          )}
        </Grid>
        {isMobile && (
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Box display="flex" onClick={cardClickHandler} alignItems="center">
              <Typography sx={{ mr: 1 }}>See more </Typography>
              <VisibilityOutlinedIcon
                color="disabled"
                fontSize="small"
                sx={{ display: 'inline' }}
              />
            </Box>
            <SvgIcon
              className={classes.actions}
              fontSize="small"
              component={isFavorite ? StarIcon : StarOutlineIcon}
              color="warning"
              sx={{ cursor: 'pointer' }}
              onClick={favBtnHandler}
            />
          </Box>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
