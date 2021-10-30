import { FC } from 'react';
import { makeStyles } from '@mui/styles';
import { Theme, useTheme, useMediaQuery } from '@mui/material';
import { isMobile } from 'react-device-detect';

const useStyles = makeStyles<Theme, { toggled: boolean }>((theme) => ({
  root: {
    padding: `0 10px`,
    cursor: `pointer`,
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  bar: {
    width: ` 26px`,
    height: `4px`,
    backgroundColor: theme.palette.primary.main,
    margin: `4px 0`,
    transition: `0.4s`,
    '&:first-child': {
      transform: ({ toggled }) =>
        toggled ? `rotate(45deg) translate(5px, 6px)` : null,
    },
    '&:nth-child(2)': {
      opacity: ({ toggled }) => (toggled ? 0 : 1),
    },
    '&:last-child': {
      transform: ({ toggled }) =>
        toggled ? `rotate(-45deg) translate(5px, -6px)` : null,
    },
  },
}));

interface NavBtnProps {
  toggled: boolean;
  onToggle: () => void;
}

const NavBtn: FC<NavBtnProps> = ({ toggled, onToggle }) => {
  const classes = useStyles({ toggled });
  const theme = useTheme();
  const matchUpMd = useMediaQuery(theme.breakpoints.up('md'));
  return (
    <div
      className={classes.root}
      data-hide={true}
      aria-label="Toggle navigation"
      onClick={!isMobile ? onToggle : undefined}
      onMouseEnter={matchUpMd && !isMobile ? onToggle : undefined}
      onTouchEnd={isMobile ? onToggle : undefined}
    >
      <div className={classes.button}>
        <div className={classes.bar} />
        <div className={classes.bar} />
        <div className={classes.bar} />
      </div>
    </div>
  );
};
export default NavBtn;
