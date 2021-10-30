import { Typography } from '@mui/material';
import { ReactComponent as VisaIcon } from './images/visa.svg';
import { ReactComponent as PayPalIcon } from './images/paypal.svg';
import { ReactComponent as MaestroIcon } from './images/maestro.svg';
import { ReactComponent as MirIcon } from './images/mir.svg';
import PaymentCard from './PaymentCard';

const paymentMethods = [
  { name: 'paypal', label: 'Paypal', icons: [PayPalIcon] },
  {
    name: 'creditCard',
    label: 'Card',
    icons: [VisaIcon, MaestroIcon, MirIcon],
  },
];

export type PaymentMethod = typeof paymentMethods[number];

const Payment = () => {
  return (
    <div style={{ marginBottom: '2rem' }}>
      <Typography variant="h5" style={{ marginBottom: '1rem' }}>
        Payment method
      </Typography>
      {paymentMethods.map((method) => (
        <PaymentCard method={method} key={method.name} />
      ))}
    </div>
  );
};

export default Payment;
