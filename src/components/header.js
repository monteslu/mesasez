import React, { Component } from 'react';

import { Toolbar } from 'material-ui/Toolbar';


import { colors } from '../lib/styles';

const baseStyles = {
  btn: {
    // width: '80px',
    margin: '5px',
    minWidth: '0px'
  },

  header: {
    backgroundColor: colors.darkAccent,
    padding: '25px',
    color: colors.highlightBright,
    fontSize: '1.5em'
  },
  icon: {
    color: colors.white,
  },
  twitter: {
    color: 'lightblue'
  }
};


class Header extends Component {

  render() {

    return (
      <Toolbar style={baseStyles.header}>

          <span>Controls for <a style={baseStyles.twitter} href="https://twitter.com/MesaSez" target="_blank">@MesaSez</a></span>

      </Toolbar>
    );
  }
}

export default Header;
