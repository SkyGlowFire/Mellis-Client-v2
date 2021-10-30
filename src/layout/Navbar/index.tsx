import { useMediaQuery, useTheme } from '@mui/material';
import DesktopNav from './DesktopNav';
import MobileNav from './MobileNav';
import { DesktopNavProvider } from './context/DesktopNavContext';
import { MobileNavProvider } from './context/MobileNavContext';

const Navbar = () => {
  const theme = useTheme();
  const mobileMode = useMediaQuery(theme.breakpoints.down('md'));

  return mobileMode ? (
    <MobileNavProvider>
      <MobileNav />
    </MobileNavProvider>
  ) : (
    <DesktopNavProvider>
      <DesktopNav />
    </DesktopNavProvider>
  );
};

export default Navbar;
