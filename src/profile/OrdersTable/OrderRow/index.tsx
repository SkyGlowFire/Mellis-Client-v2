import {
  Grid,
  Typography,
  Box,
  IconButton,
  TableCell,
  TableRow,
  Collapse,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useState, FC } from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Moment from 'react-moment';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import OrderItemCard from './OrderItemCard';
import AddressCard from './AddressCard';
import { IOrder } from '~/types/orders';

const useRowStyles = makeStyles({
  row: {
    '& > *': {
      fontSize: '.8rem',
    },
  },
});

interface OrderRowProps {
  order: IOrder;
  idx: number;
}

const OrderRow: FC<OrderRowProps> = ({ order, idx }) => {
  const classes = useRowStyles();
  const [open, setOpen] = useState(false);
  return (
    <>
      <TableRow className={classes.row}>
        <TableCell scope="row" component="th">
          {idx}
        </TableCell>
        <TableCell align="left">{order._id}</TableCell>
        <TableCell align="left">
          <Moment format="YYYY-MM-DD">{order.createdAt}</Moment>
        </TableCell>
        <TableCell align="left">${order.price}</TableCell>
        <TableCell align="left">pending</TableCell>
        <TableCell align="right">
          <IconButton size="small" onClick={() => setOpen((prev) => !prev)}>
            {open ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </IconButton>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={2}>
              <Typography gutterBottom>Items:</Typography>
              <Grid container spacing={3} style={{ marginBottom: '.5rem' }}>
                {order.items.map((item) => (
                  <Grid item xs={4} lg={3} key={`orderitem-${item.title}`}>
                    <OrderItemCard item={item} />
                  </Grid>
                ))}
              </Grid>
              <Typography variant="body2" gutterBottom>
                Total price: ${order.price}
              </Typography>
              <Typography variant="body2" gutterBottom>
                Address:
              </Typography>
              <AddressCard address={order.address} />
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
};

export default OrderRow;
