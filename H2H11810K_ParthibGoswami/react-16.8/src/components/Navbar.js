import React from 'react';
import { AppBar, Toolbar, Typography, makeStyles } from '@material-ui/core';
import abclogo from '../images/abclogo.svg';
import hrclogo from '../images/hrclogo.svg';

const useStyles = makeStyles((theme) => ({
  navbar: {
    backgroundColor: 'white !important',
  },
  logo: {
    marginRight: theme.spacing(2),
    height: '30px',
  },
  title: {
    display: 'flex',
    alignItems: 'center',
    left:'45%',
    position:'absolute',
    flexGrow: 1,
  },
  redText: {
    color: 'red',
    textAlign: 'left',
    marginLeft:'3rem',
  },
}));

const Navbar = () => {
  const classes = useStyles();

  return (
    <AppBar position="static" className={classes.navbar}>
      <Toolbar>
        <img src={abclogo} alt="Left Logo" className={classes.logo} />
        <div className={classes.title}>
          <img src={hrclogo} alt="Middle Logo" className={classes.logo} />
        </div>
      </Toolbar>
      <Typography variant="body1" className={classes.redText}>
        Invoice List
      </Typography>
    </AppBar>
  );
};

export default Navbar;
