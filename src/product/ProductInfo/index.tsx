import { Link } from 'react-router-dom';
import { fromUrlString, toUrlString, capitalize } from '~/utils/textFormatters';
import { makeStyles } from '@mui/styles';
import {
  Grid,
  Button,
  Link as MuiLink,
  Typography,
  Theme,
  Box,
  SvgIcon,
} from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { addCartItem } from '~/cart/cartSlice';
import { openImageModal } from '~/common/state/mainSlice';
import Select from '~/common/components/form-inputs/Select';
import { useState, FC, useEffect } from 'react';
import clsx from 'clsx';
import { IProductPopulated, Size } from '~/types/products';
import { useAppDispatch, useAppSelector } from '~/app/hooks';
import StarIcon from '@mui/icons-material/Star';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import { addFavItem, removeFavItem } from '~/favorites/favoritesSlice';

const useStyles = makeStyles<Theme>((theme) => ({
  mainImg: {
    height: '70vw',
    [theme.breakpoints.up('sm')]: {
      height: '40vw',
    },
    [theme.breakpoints.up('md')]: {
      height: '34vw',
    },
  },
  media: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  image: {
    backgroundSize: 'cover',
    height: '70vw',
    [theme.breakpoints.up('sm')]: {
      height: '40vw',
    },
    [theme.breakpoints.up('md')]: {
      height: '34vw',
    },
    backgroundPosition: 'center 0',
    cursor: 'url(/images/cursors/search.svg) 2 2, pointer',
  },
  mainInfo: {
    paddingBottom: '1rem',
    position: 'relative',
    top: 0,
    display: 'flex',
    paddingLeft: '1rem',
    paddingRight: '1rem',
    flexDirection: 'column',
    alignItems: 'flex-start',
    [theme.breakpoints.up('md')]: {
      paddingLeft: 0,
      paddingRight: 0,
      position: 'sticky',
      top: 80,
    },
  },
  sizeSelect: {
    marginBottom: '1rem',
  },
  comparePrice: {
    textDecoration: 'line-through',
    color: theme.palette.text.secondary,
    marginRight: 8,
  },
}));

interface ProductInfoProps {
  product: IProductPopulated;
}

const ProductInfo: FC<ProductInfoProps> = ({ product }) => {
  const classes = useStyles();
  const [size, setSize] = useState<Size | ''>('');
  const [error, setError] = useState<string | null>(null);
  const [isFavorite, setFavorite] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const { items } = useAppSelector((state) => state.favorites);

  useEffect(() => {
    setFavorite(items.findIndex((x) => x.product._id === product._id) !== -1);
  }, [items, product._id]);

  function renderNavigation(path: string[]) {
    const links = [];
    let url = `/category`;
    links.push(
      <MuiLink to="/" component={Link} underline="hover" key={`link-home`}>
        Home
      </MuiLink>
    );
    path.forEach((name) => {
      url += `/${toUrlString(name)}`;
      links.push(<span key={`span-${url}`}> / </span>);
      links.push(
        <MuiLink
          to={url}
          component={Link}
          underline="hover"
          key={`link-${url}`}
        >
          {name}
        </MuiLink>
      );
    });
    return <div style={{ marginBottom: '.5rem' }}>{links}</div>;
  }

  const AddBtnHandler = () => {
    if (size === '') {
      setError('Please select size');
    } else {
      dispatch(addCartItem({ product, size }));
    }
  };

  const sizeChangeHandler = (val: Size) => {
    setSize(val);
    setError(null);
  };

  const favBtnHandler = () => {
    if (isFavorite) {
      const favItem = items.find((x) => x.product._id === product._id);
      favItem && dispatch(removeFavItem(favItem.id));
    } else {
      dispatch(addFavItem(product));
    }
  };

  return (
    <Grid container spacing={5}>
      <Grid item xs={12} sm={7} container spacing={2}>
        <Grid item xs={12} sm={6}>
          <div
            className={clsx(classes.mainImg, classes.image)}
            style={{ backgroundImage: `url(${product.image.url})` }}
            onClick={() => dispatch(openImageModal(product.image.url))}
          />
        </Grid>
        {product.media.map((file) => (
          <Grid item xs={12} sm={6} className={classes.media} key={file._id}>
            <div
              className={clsx(classes.image)}
              style={{ backgroundImage: `url(${file.url})` }}
              onClick={() => dispatch(openImageModal(file.url))}
            />
          </Grid>
        ))}
      </Grid>
      <Grid item xs={12} sm={5} style={{ position: 'relative' }}>
        <div className={classes.mainInfo}>
          {renderNavigation(product.path)}
          <Box sx={{ mb: 1 }} display="flex" alignItems="center">
            <Typography variant="h5" sx={{ mr: 1 }}>
              {fromUrlString(product.title)}
            </Typography>
            <SvgIcon
              component={isFavorite ? StarIcon : StarOutlineIcon}
              color="warning"
              sx={{ cursor: 'pointer' }}
              onClick={favBtnHandler}
            />
          </Box>
          <Typography>Color: {capitalize(product.color)}</Typography>
          <Typography gutterBottom>
            Price:{' '}
            {product.comparePrice ? (
              <span className={classes.comparePrice}>
                ${product.comparePrice}
              </span>
            ) : (
              ''
            )}
            <span style={{ fontWeight: 'bold' }}>${product.price}</span>
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Select
                value={size}
                className={classes.sizeSelect}
                onChange={sizeChangeHandler}
                options={product.sizes}
                error={error}
                label="size"
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="contained"
                color="primary"
                onClick={AddBtnHandler}
                startIcon={<AddShoppingCartIcon />}
              >
                Add to cart
              </Button>
            </Grid>
          </Grid>
        </div>
      </Grid>
    </Grid>
  );
};

export default ProductInfo;
