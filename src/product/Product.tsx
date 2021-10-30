import { useEffect, useState } from 'react';
import { Container, Box } from '@mui/material';
import { makeStyles } from '@mui/styles';
import HoverBox from '~/common/components/HoverBox/HoverBox';
import { toUrlString } from '~/utils/textFormatters';
import { useParams } from 'react-router-dom';
import { useGetProductQuery } from '~/app/api';
import RelatedProducts from './RelatedProducts';
import ProductInfo from './ProductInfo';
import Description from './Description';

const useStyles = makeStyles({
  root: {
    paddingTop: 40,
  },
  button: {
    fontSize: '1.5rem',
    padding: '.5rem 1.5rem',
  },
  container: {
    marginBottom: '1rem',
  },
});

const Product = () => {
  const classes = useStyles();
  const { id } = useParams<{ id: string }>();
  const [path, setPath] = useState<string>('/');

  const { data: product } = useGetProductQuery(id);

  useEffect(() => {
    if (!product) return;
    const newPath = product.path.map((item) => toUrlString(item)).join('/');
    setPath(`/category/${newPath}`);
  }, [product]);

  return (
    <Container maxWidth={false} className={classes.root}>
      {product && (
        <div>
          <ProductInfo product={product} />
          <Description product={product} />
          {product.relatedProducts.length > 0 && (
            <RelatedProducts product={product} />
          )}
          <Box
            alignItems="center"
            justifyContent="center"
            display="flex"
            className={classes.container}
          >
            <HoverBox
              type="link"
              to={path}
              className={classes.button}
              color="info"
            >
              To overview
            </HoverBox>
          </Box>
        </div>
      )}
    </Container>
  );
};

export default Product;
