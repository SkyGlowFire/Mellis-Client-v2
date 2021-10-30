import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import OrderRow from './OrderRow';
import { useGetOrdersQuery } from '~/app/api';

const useStyles = makeStyles({
  head: {
    '& > *': {
      fontSize: '.7rem',
    },
  },
});

const OrdersTable = () => {
  const classes = useStyles();
  const { data: orders } = useGetOrdersQuery();
  return (
    <TableContainer component={Paper} style={{ marginBottom: '2rem' }}>
      <Table>
        <TableHead>
          <TableRow className={classes.head}>
            <TableCell>#</TableCell>
            <TableCell align="left">Order id</TableCell>
            <TableCell align="left">Date</TableCell>
            <TableCell align="left">Price</TableCell>
            <TableCell align="left">Status</TableCell>
            <TableCell align="right"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orders && orders.length > 0 ? (
            orders.map((order, idx) => (
              <OrderRow order={order} idx={idx} key={order._id} />
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={6}>No orders</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default OrdersTable;
