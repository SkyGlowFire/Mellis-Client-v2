import { useEffect, useState, useContext } from 'react';
import { makeStyles } from '@mui/styles';
import { navHeight, searchbarHeight, navHeight2 } from '~/styles/constants';
import { Theme } from '@mui/material';
import { DesktopNavContext } from '../../context/DesktopNavContext';
import SectionLink from './SectionLink';
import SectionBody from './SectionBody';

export type SectionColor = 'info' | 'success' | 'primary' | 'secondary';

const useStyles = makeStyles<Theme, { open: boolean; color: SectionColor }>(
  (theme) => ({
    root: {
      position: 'absolute',
      top: navHeight + searchbarHeight + 1,
      width: '100%',
      [theme.breakpoints.up('md')]: {
        top: navHeight2 + 1,
      },
    },
    overlay: ({ open }) => ({
      height: open ? '100vh' : 0,
      width: '100%',
      backgroundColor: 'rgba(0,0,0,.5)',
      position: 'absolute',
      top: 0,
      zIndex: 1,
    }),
    main: ({ open }) => ({
      maxHeight: !open ? 0 : 600,
      // height: '100%',
      transition: 'all .5s ease-in-out',
      minWidth: '100%',
      backgroundColor: theme.palette.background.paper,
      overflow: 'hidden',
      zIndex: 10,
    }),
    mainLinks: {
      display: 'flex',
      flex: '0 0 auto',
    },
    mainLink: {
      padding: '.8rem 1.5rem',
      fontSize: '1rem',
      border: 'none',
      cursor: 'pointer',
    },
  })
);

const SectionNav = () => {
  const { sectionOpen, activeCategory, setActiveSubCategory, setSectionOpen } =
    useContext(DesktopNavContext);
  const [color, setColor] = useState<SectionColor>('primary');

  const classes = useStyles({ open: sectionOpen, color });

  useEffect(() => {
    if (!activeCategory) return;
    let sectionColor: SectionColor = 'primary';
    switch (activeCategory.title) {
      case 'men':
        sectionColor = 'info';
        break;
      case 'womens':
        sectionColor = 'success';
        break;
      case 'girls':
        sectionColor = 'secondary';
        break;
      default:
        break;
    }
    setColor(sectionColor);
    setActiveSubCategory(activeCategory.children[0]);
  }, [activeCategory, setActiveSubCategory, setColor]);

  return (
    <div className={classes.root}>
      <div
        className={classes.overlay}
        onMouseOver={() => setSectionOpen(false)}
      >
        <div className={classes.main} onMouseOver={(e) => e.stopPropagation()}>
          <div className={classes.mainLinks}>
            {activeCategory &&
              activeCategory.children.map((category) => (
                <SectionLink
                  category={category}
                  color={color}
                  key={category._id}
                />
              ))}
          </div>
          <SectionBody color={color} />
        </div>
      </div>
    </div>
  );
};

export default SectionNav;
