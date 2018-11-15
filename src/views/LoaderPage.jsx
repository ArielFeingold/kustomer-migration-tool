import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import AppBar from '@material-ui/core/AppBar';

import MigrationTool from '../components/MigrationTool'

import logo from '../assets/img/logo.png';
import bg from '../assets/img/background-upload2.jpeg';
import loaderPageStyle from '../assets/jss/loaderPageStyle.jsx'

class LoaderPage extends Component {

  constructor(props) {
    super(props);

    this.state = {

    };
  }


  render() {
    const { classes } = this.props;

    return (
      <div
        className={classes.root}
        style={{
          backgroundImage: "url(" + bg + ")",
          backgroundSize: "cover",
          backgroundPosition: "top center"
        }}>

        <AppBar
          className={classes.header}
          position="static"
        >
          <img className={classes.logo} src={logo} alt="Kustomer Logo" />
        </AppBar>
        <Grid container justify = "space-evenly">
          <MigrationTool />
        </Grid>
      </div>
    );
  }
}

LoaderPage.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(loaderPageStyle)(LoaderPage);
