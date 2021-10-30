import UnderlinedLink from '~/common/components/UnderlinedLink';
import { fromUrlString, toUrlString } from '~/utils/textFormatters';
import { Grid } from '@mui/material';
import { FC } from 'react';

interface NavigatioBarProps {
  category?: string;
  group?: string;
  subGroup?: string;
}

const NavigationBar: FC<NavigatioBarProps> = ({
  category,
  group,
  subGroup,
}) => {
  return (
    <Grid container sx={{ mb: '.5rem' }} spacing={2} justifyContent="center">
      <Grid item>
        <UnderlinedLink to="/">
          Home {group && <i className="fas fa-caret-right"></i>}
        </UnderlinedLink>
      </Grid>
      {group && (
        <Grid item>
          <UnderlinedLink to={`/category/${toUrlString(category)}`}>
            {fromUrlString(category)}{' '}
            {subGroup && <i className="fas fa-caret-right"></i>}
          </UnderlinedLink>
        </Grid>
      )}
      {subGroup && (
        <Grid item>
          <UnderlinedLink
            to={`/category/${toUrlString(category)}/${toUrlString(group)}`}
          >
            {fromUrlString(group)}
          </UnderlinedLink>
        </Grid>
      )}
    </Grid>
  );
};

export default NavigationBar;
