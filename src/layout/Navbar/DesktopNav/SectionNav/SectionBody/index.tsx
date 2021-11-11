import { FC, useContext } from 'react';
import { makeStyles } from '@mui/styles';
import UnderlinedLink from '~/common/components/UnderlinedLink';
import { Grid, Container, Theme } from '@mui/material';
import { SectionColor } from '..';
import { DesktopNavContext } from '~/layout/Navbar/context/DesktopNavContext';
import Bestseller from './Bestseller';
import { fromUrlString } from '~/utils/textFormatters';

const useStyles = makeStyles<Theme, { color: SectionColor }>((theme) => ({
  section: ({ color }) => ({
    backgroundColor: theme.palette[color]?.light || theme.palette.success.light,
    width: '100%',
    height: 360,
  }),
  sectionContent: {
    padding: '1rem',
    maxWidth: '95%',
    paddingTop: '1.5rem',
    height: '100%',
  },
  sectionLinks: {
    width: '100%',
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
    [theme.breakpoints.up('md')]: {
      with: '75%',
    },
  },
  title: {
    marginBottom: '.8rem',
  },
  secondaryLink: {
    marginBottom: '1rem',
    marginRight: '.5rem',
  },
  bestseller: {
    display: 'none',
    height: '100%',
    [theme.breakpoints.up('lg')]: {
      display: 'flex',
    },
  },
}));

interface SectionBodyProps {
  color: SectionColor;
}

const SectionBody: FC<SectionBodyProps> = ({ color }) => {
  const classes = useStyles({ color });
  const { setSectionOpen, activeCategory, activeSubCategory } =
    useContext(DesktopNavContext);
  return (
    <div className={classes.section}>
      <Container className={classes.sectionContent} maxWidth={false}>
        <Grid container spacing={6} sx={{ height: '100%' }}>
          <Grid item xs={12} lg={8}>
            <UnderlinedLink
              to={`/category/${activeCategory?.title}/${activeSubCategory?.title}`}
              onClick={() => setSectionOpen(false)}
              className={classes.title}
              fontSize="1.2rem"
              fontWeight="bold"
            >
              {fromUrlString(activeCategory?.title)}{' '}
              {fromUrlString(activeSubCategory?.title)}
            </UnderlinedLink>
            <ul className={classes.sectionLinks}>
              {activeSubCategory?.children.map((link) => (
                <li key={link.title}>
                  <UnderlinedLink
                    to={`/category/${activeCategory?.title}/${activeSubCategory?.title}/${link.title}`}
                    onClick={() => setSectionOpen(false)}
                    className={classes.secondaryLink}
                  >
                    {fromUrlString(link.title)}
                  </UnderlinedLink>
                </li>
              ))}
            </ul>
          </Grid>
          <Grid item xs={2} />
          {activeSubCategory?.bestseller && (
            <Grid item lg={2} className={classes.bestseller}>
              <Bestseller product={activeSubCategory.bestseller} />
            </Grid>
          )}
        </Grid>
      </Container>
    </div>
  );
};

export default SectionBody;
