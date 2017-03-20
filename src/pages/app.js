
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchInfo, updateInfo, updateLocal } from '../state/smile';
import { fetchColors, updateColor } from '../state/colors';
import Card from 'material-ui/Card';
import CircularProgress from 'material-ui/CircularProgress';
import RaisedButton from 'material-ui/RaisedButton';

import Header from '../components/header';
import ColorPicker from '../components/ColorPicker';

import { colors as colorStyles } from '../lib/styles';

const bs = {
  container: {
    backgroundColor: colorStyles.primaryHighlight,
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100%',
    textAlign: 'center',
  },
  mainBody: {
    height: '100%',
    margin: '5px'
  },
  updateBtn: {
    margin: '10px'
  },
  p0: {
    backgroundColor: '#000060',
    height: '40px',
    width: '40px'
  },
  p1: {
    backgroundColor: 'red',
    height: '40px',
    width: '40px'
  },
  table: {
    margin: 'auto'
  },
  cards: {
    padding: '5px',
    marginTop: '10px'
  },
  lights: {
    margin: '15px',
    float: 'right'
  }

};



export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleInfoUpdate = this.handleInfoUpdate.bind(this);
    this.handleGridClick = this.handleGridClick.bind(this);
    this.handleUpdateColor = this.handleUpdateColor.bind(this);
  }
  componentWillMount() {
    this.props.fetchInfo();
    this.props.fetchColors();
  }
  handleInfoUpdate() {
    this.props.updateInfo();
  }
  handleGridClick(x, y) {
    console.log('grid click', x, y);
    this.props.updateLocal({x, y});
  }
  handleUpdateColor(idx, color){
    console.log('color changed event ', idx, color );
    this.props.updateColor(idx, color);
  }
  render() {
    const {
      router, smile, colors
    } = this.props;


    let info = (<CircularProgress size={80} thickness={5} />);
    let colorDiv = (<CircularProgress size={80} thickness={5} />);


    if(colors.colors && !colors.isFetchingColor && !colors.isUpdatingColor) {
      colorDiv = (<div>

        <div>Change the Lights:</div>
        <div style={{display: 'flex', justifyContent: 'center'}}>
          <ColorPicker style={bs.lights} color={colors.colors[0]} colorChanged={(newColor) => this.handleUpdateColor(0, newColor)}/>
          <ColorPicker style={bs.lights} color={colors.colors[1]} colorChanged={(newColor) => this.handleUpdateColor(1, newColor)}/>
          <ColorPicker style={bs.lights} color={colors.colors[2]} colorChanged={(newColor) => this.handleUpdateColor(2, newColor)}/>
        </div>
      </div>);
    }





    if(smile.info && !smile.isUpdatingInfo) {
      console.log('render table', smile);
      info = (<div> Draw on the shirt:<br/>
        <div>
        <table style={bs.table}>
          <tbody>
          <tr>
            <td><div style={bs['p' + smile.info[0][0]]} onTouchTap={() => this.handleGridClick(0,0)}/></td>
            <td><div style={bs['p' + smile.info[0][1]]} onTouchTap={() => this.handleGridClick(0,1)}/></td>
            <td><div style={bs['p' + smile.info[0][2]]} onTouchTap={() => this.handleGridClick(0,2)}/></td>
            <td><div style={bs['p' + smile.info[0][3]]} onTouchTap={() => this.handleGridClick(0,3)}/></td>
            <td><div style={bs['p' + smile.info[0][4]]} onTouchTap={() => this.handleGridClick(0,4)}/></td>
            <td><div style={bs['p' + smile.info[0][5]]} onTouchTap={() => this.handleGridClick(0,5)}/></td>
            <td><div style={bs['p' + smile.info[0][6]]} onTouchTap={() => this.handleGridClick(0,6)}/></td>
            <td><div style={bs['p' + smile.info[0][7]]} onTouchTap={() => this.handleGridClick(0,7)}/></td>
          </tr>
          <tr>
            <td><div style={bs['p' + smile.info[1][0]]} onTouchTap={() => this.handleGridClick(1,0)}/></td>
            <td><div style={bs['p' + smile.info[1][1]]} onTouchTap={() => this.handleGridClick(1,1)}/></td>
            <td><div style={bs['p' + smile.info[1][2]]} onTouchTap={() => this.handleGridClick(1,2)}/></td>
            <td><div style={bs['p' + smile.info[1][3]]} onTouchTap={() => this.handleGridClick(1,3)}/></td>
            <td><div style={bs['p' + smile.info[1][4]]} onTouchTap={() => this.handleGridClick(1,4)}/></td>
            <td><div style={bs['p' + smile.info[1][5]]} onTouchTap={() => this.handleGridClick(1,5)}/></td>
            <td><div style={bs['p' + smile.info[1][6]]} onTouchTap={() => this.handleGridClick(1,6)}/></td>
            <td><div style={bs['p' + smile.info[1][7]]} onTouchTap={() => this.handleGridClick(1,7)}/></td>
          </tr>
          <tr>
            <td><div style={bs['p' + smile.info[2][0]]} onTouchTap={() => this.handleGridClick(2,0)}/></td>
            <td><div style={bs['p' + smile.info[2][1]]} onTouchTap={() => this.handleGridClick(2,1)}/></td>
            <td><div style={bs['p' + smile.info[2][2]]} onTouchTap={() => this.handleGridClick(2,2)}/></td>
            <td><div style={bs['p' + smile.info[2][3]]} onTouchTap={() => this.handleGridClick(2,3)}/></td>
            <td><div style={bs['p' + smile.info[2][4]]} onTouchTap={() => this.handleGridClick(2,4)}/></td>
            <td><div style={bs['p' + smile.info[2][5]]} onTouchTap={() => this.handleGridClick(2,5)}/></td>
            <td><div style={bs['p' + smile.info[2][6]]} onTouchTap={() => this.handleGridClick(2,6)}/></td>
            <td><div style={bs['p' + smile.info[2][7]]} onTouchTap={() => this.handleGridClick(2,7)}/></td>
          </tr>
          <tr>
            <td><div style={bs['p' + smile.info[3][0]]} onTouchTap={() => this.handleGridClick(3,0)}/></td>
            <td><div style={bs['p' + smile.info[3][1]]} onTouchTap={() => this.handleGridClick(3,1)}/></td>
            <td><div style={bs['p' + smile.info[3][2]]} onTouchTap={() => this.handleGridClick(3,2)}/></td>
            <td><div style={bs['p' + smile.info[3][3]]} onTouchTap={() => this.handleGridClick(3,3)}/></td>
            <td><div style={bs['p' + smile.info[3][4]]} onTouchTap={() => this.handleGridClick(3,4)}/></td>
            <td><div style={bs['p' + smile.info[3][5]]} onTouchTap={() => this.handleGridClick(3,5)}/></td>
            <td><div style={bs['p' + smile.info[3][6]]} onTouchTap={() => this.handleGridClick(3,6)}/></td>
            <td><div style={bs['p' + smile.info[3][7]]} onTouchTap={() => this.handleGridClick(3,7)}/></td>
          </tr>
          <tr>
            <td><div style={bs['p' + smile.info[4][0]]} onTouchTap={() => this.handleGridClick(4,0)}/></td>
            <td><div style={bs['p' + smile.info[4][1]]} onTouchTap={() => this.handleGridClick(4,1)}/></td>
            <td><div style={bs['p' + smile.info[4][2]]} onTouchTap={() => this.handleGridClick(4,2)}/></td>
            <td><div style={bs['p' + smile.info[4][3]]} onTouchTap={() => this.handleGridClick(4,3)}/></td>
            <td><div style={bs['p' + smile.info[4][4]]} onTouchTap={() => this.handleGridClick(4,4)}/></td>
            <td><div style={bs['p' + smile.info[4][5]]} onTouchTap={() => this.handleGridClick(4,5)}/></td>
            <td><div style={bs['p' + smile.info[4][6]]} onTouchTap={() => this.handleGridClick(4,6)}/></td>
            <td><div style={bs['p' + smile.info[4][7]]} onTouchTap={() => this.handleGridClick(4,7)}/></td>
          </tr>
          <tr>
            <td><div style={bs['p' + smile.info[5][0]]} onTouchTap={() => this.handleGridClick(5,0)}/></td>
            <td><div style={bs['p' + smile.info[5][1]]} onTouchTap={() => this.handleGridClick(5,1)}/></td>
            <td><div style={bs['p' + smile.info[5][2]]} onTouchTap={() => this.handleGridClick(5,2)}/></td>
            <td><div style={bs['p' + smile.info[5][3]]} onTouchTap={() => this.handleGridClick(5,3)}/></td>
            <td><div style={bs['p' + smile.info[5][4]]} onTouchTap={() => this.handleGridClick(5,4)}/></td>
            <td><div style={bs['p' + smile.info[5][5]]} onTouchTap={() => this.handleGridClick(5,5)}/></td>
            <td><div style={bs['p' + smile.info[5][6]]} onTouchTap={() => this.handleGridClick(5,6)}/></td>
            <td><div style={bs['p' + smile.info[5][7]]} onTouchTap={() => this.handleGridClick(5,7)}/></td>
          </tr>
          <tr>
            <td><div style={bs['p' + smile.info[6][0]]} onTouchTap={() => this.handleGridClick(6,0)}/></td>
            <td><div style={bs['p' + smile.info[6][1]]} onTouchTap={() => this.handleGridClick(6,1)}/></td>
            <td><div style={bs['p' + smile.info[6][2]]} onTouchTap={() => this.handleGridClick(6,2)}/></td>
            <td><div style={bs['p' + smile.info[6][3]]} onTouchTap={() => this.handleGridClick(6,3)}/></td>
            <td><div style={bs['p' + smile.info[6][4]]} onTouchTap={() => this.handleGridClick(6,4)}/></td>
            <td><div style={bs['p' + smile.info[6][5]]} onTouchTap={() => this.handleGridClick(6,5)}/></td>
            <td><div style={bs['p' + smile.info[6][6]]} onTouchTap={() => this.handleGridClick(6,6)}/></td>
            <td><div style={bs['p' + smile.info[6][7]]} onTouchTap={() => this.handleGridClick(6,7)}/></td>
          </tr>
          <tr>
            <td><div style={bs['p' + smile.info[7][0]]} onTouchTap={() => this.handleGridClick(7,0)}/></td>
            <td><div style={bs['p' + smile.info[7][1]]} onTouchTap={() => this.handleGridClick(7,1)}/></td>
            <td><div style={bs['p' + smile.info[7][2]]} onTouchTap={() => this.handleGridClick(7,2)}/></td>
            <td><div style={bs['p' + smile.info[7][3]]} onTouchTap={() => this.handleGridClick(7,3)}/></td>
            <td><div style={bs['p' + smile.info[7][4]]} onTouchTap={() => this.handleGridClick(7,4)}/></td>
            <td><div style={bs['p' + smile.info[7][5]]} onTouchTap={() => this.handleGridClick(7,5)}/></td>
            <td><div style={bs['p' + smile.info[7][6]]} onTouchTap={() => this.handleGridClick(7,6)}/></td>
            <td><div style={bs['p' + smile.info[7][7]]} onTouchTap={() => this.handleGridClick(7,7)}/></td>
          </tr>
          </tbody>
        </table>
        </div>
      <br/>
      <RaisedButton label="Update"
        primary={true}
        style={bs.updateBtn}
        onTouchTap={this.handleInfoUpdate}/>
      </div>);
    }

    return (
      <div style={bs.container}>
        <Header
          router={router}
        />
        <div style={bs.mainBody}>
          <Card style={bs.cards}>
            {info}
          </Card>
          <Card style={bs.cards}>
            {colorDiv}
          </Card>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { smile, colors } = state;
  return {
    smile,
    colors
  };
}

function mapDispatchToProps(dispatch) {
  const actionCreators = {
    fetchInfo, updateInfo, updateLocal, fetchColors, updateColor
  };

  return bindActionCreators(actionCreators, dispatch);
}

App.propTypes = {
  store: React.PropTypes.object,
  router: React.PropTypes.object,
};

App.defaultProps = {

};

export default connect(mapStateToProps, mapDispatchToProps)(App);
