import {
  Container,
  Grid,
  Typography,
  Divider,
  Checkbox,
  Theme,
  FormControlLabel,
  FormGroup,
  FilledInput,
  FormControl,
  InputLabel,
} from '@mui/material';
import { makeStyles, withStyles } from '@mui/styles';
import { styled } from '@mui/system';

const useStyles = makeStyles<Theme>((theme) => ({
  root: {
    color: theme.palette.background.paper,
    backgroundColor: theme.palette.primary.main,
    paddingBottom: '1rem',
    paddingTop: '1.5rem',
    width: '100%',
  },
  container: {
    maxWidth: 1500,
  },
  mainLinks: {
    paddingBottom: '2rem',
  },
  link: {
    color: theme.palette.primary.contrastText,
    display: 'inline-block',
    transition: 'transform .2s ease',
    '&:hover': {
      transform: 'scale(1.1)',
    },
  },
  divider: {
    backgroundColor: theme.palette.primary.contrastText,
  },
  mediaBtns: {
    marginBottom: '1rem',
    display: 'flex',
    '& > a': {
      display: 'flex',
      border: `2px solid ${theme.palette.primary.contrastText}`,
      borderRadius: '50%',
      color: theme.palette.primary.contrastText,
      width: 36,
      height: 36,
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: '.5rem',
      fontSize: '.8rem',
      transition: 'all .3s ease',
      '&:hover': {
        transform: 'scale(1.2)',
      },
    },
  },
  mailForm: {
    display: 'flex',
    alignItems: 'stretch',
    height: 60,
  },
}));

const StyledInput = withStyles((theme) => ({
  root: {
    '& .MuiFilledInput-input': {
      color: theme.palette.background.paper,
    },
    height: '100%',
  },
}))(FilledInput);

const CustomButton = styled('button')(({ theme }) => ({
  height: '100%',
  padding: '.5rem 1rem',
  border: `1px solid rgba(0, 0, 0, 0.06)`,
  outline: 'none',
  cursor: 'pointer',
  fontSize: '1rem',
  display: 'block',
  color: theme.palette.background.paper,
  backgroundColor: theme.palette.primary.main,
  borderRadius: '0 4px 4px 0',
  transition: 'all .3s ease',
  letterSpacing: '1px',
  '&:hover': {
    color: theme.palette.primary.main,
    backgroundColor: theme.palette.background.paper,
  },
}));

const Footer = () => {
  const classes = useStyles();
  return (
    <footer className={classes.root}>
      <Container maxWidth={false} className={classes.container}>
        <Grid container spacing={3} className={classes.mainLinks}>
          <Grid item xs={6}>
            <Typography component="a" href="#" className={classes.link}>
              Customer service
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography component="a" href="#" className={classes.link}>
              Privacy statement
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography component="a" href="#" className={classes.link}>
              Contacts
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography component="a" href="#" className={classes.link}>
              About
            </Typography>
          </Grid>
        </Grid>
        <Divider classes={{ root: classes.divider }} />
        <Typography gutterBottom color="inherit" sx={{ marginTop: '1rem' }}>
          Follow us
        </Typography>
        <div className={classes.mediaBtns}>
          <a href="#">
            <i className="fab fa-facebook-f"></i>
          </a>
          <a href="#">
            <i className="fab fa-instagram"></i>
          </a>
          <a href="#">
            <i className="fab fa-youtube"></i>
          </a>
        </div>
        <Typography gutterBottom color="inherit">
          Newsletter
        </Typography>
        <form onSubmit={(e) => e.preventDefault()}>
          <FormGroup>
            <FormControlLabel
              color="#fff"
              control={
                <Checkbox
                  color="primary"
                  name="signUp"
                  sx={{
                    color: '#fff',
                    '&.Mui-checked': {
                      color: '#fff',
                    },
                  }}
                />
              }
              label="Sign up for the newsletter and receive a 10% discount"
            />
            <FormControlLabel
              classes={{ label: classes.label }}
              control={
                <Checkbox
                  name="personalOffers"
                  sx={{
                    color: '#fff',
                    '&.Mui-checked': {
                      color: '#fff',
                    },
                  }}
                />
              }
              label="Send me personal offers"
            />
            <div className={classes.mailForm}>
              <FormControl>
                <InputLabel sx={{ color: '#fff' }}>Email</InputLabel>
                <StyledInput disableUnderline />
              </FormControl>
              <CustomButton type="submit">Subscribe</CustomButton>
            </div>
          </FormGroup>
        </form>
      </Container>
    </footer>
  );
};

export default Footer;
