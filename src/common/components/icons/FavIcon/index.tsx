import StarIcon from '@mui/icons-material/Star';
import Badge from '@mui/material/Badge';
import { withStyles } from '@mui/styles';
import { FC } from 'react';
import { useAppSelector } from '~/app/hooks';

const StyledBadge = withStyles((theme) => ({
  badge: {
    right: 3,
    top: 8,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: '0 2px',
  },
}))(Badge);

const FavIcon: FC = (props) => {
  const { items } = useAppSelector((state) => state.favorites);
  return (
    <StyledBadge badgeContent={items.length} color="secondary">
      <StarIcon {...props} />
    </StyledBadge>
  );
};

export default FavIcon;
