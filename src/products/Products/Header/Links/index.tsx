import HoverBox from '~/common/components/HoverBox/HoverBox';
import { makeStyles } from '@mui/styles';
import { toUrlString, fromUrlString } from '~/utils/textFormatters';
import { Theme } from '@mui/material';
import { ICategory } from '~/types/categories';
import { FC } from 'react';

const useStyles = makeStyles<Theme>((theme) => ({
  links: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: '1rem',
  },
  link: {
    padding: '.12rem 1rem',
    border: `1px solid ${theme.palette.primary.main}`,
    borderRadius: '.1rem',
    '&:not(:first-child)': {
      marginLeft: theme.spacing(2),
    },
    marginBottom: 10,
    [theme.breakpoints.up('sm')]: {
      marginBottom: 16,
    },
  },
}));

interface LinksProps {
  category: ICategory;
}

const Links: FC<LinksProps> = ({ category }) => {
  const classes = useStyles();

  function formPath(link: ICategory) {
    let url = `/category/${toUrlString(category.path[0])}/`;
    if (category.path[1]) {
      url += `${toUrlString(category.path[1])}/`;
    }
    url += toUrlString(link.title);
    return url;
  }

  return (
    <div className={classes.links}>
      {category.children.map((link) => (
        <HoverBox
          color="primary"
          dark
          className={classes.link}
          type="link"
          to={formPath(link)}
          key={link._id}
        >
          {fromUrlString(link.title)}
        </HoverBox>
      ))}
    </div>
  );
};

export default Links;
