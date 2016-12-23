import React, { Component, PropTypes } from 'react'

import { TextField, IconButton, AppBar } from 'material-ui'
import ActionSettings from 'material-ui/svg-icons/action/settings';
import ActionSearch from 'material-ui/svg-icons/action/search';
import ContentClear from 'material-ui/svg-icons/content/clear';

import brandIcon from '../resources/images/icon.png'
import N18 from '../constants/strings'

const getStyles = (theme) => {
  return {
    appbar: {
      borderTop: '2px solid ' + theme.palette.accent1Color,
      position: 'fixed',
      top: 0,
      boxShadow: 'rgb(0, 0, 0) 0px 1px 6px, rgb(0, 0, 0) 0px 1px 4px'
    },

    searchBar: {
      marginLeft: theme.drawer.width
    },

    icon: {
      color: '#505151'
    }
  }
}

class Topbar extends Component {
  static contextTypes = {
    muiTheme: PropTypes.object.isRequired,
    router: PropTypes.object.isRequired
  }

  state = {
    searchInput: ''
  }

  toggleSettings = () => {
    console.log('settings');
  }

  onChange = (e) => {
    this.setState({
      searchInput: e.target.value
    })
  }

  clear = () => {
    this.setState({
      searchInput: ''
    })
  }

  search = () => {
    this.setState({
      searchInput: ''
    })
  }

  render = () => {
    let muiTheme = this.context.muiTheme;
    let styles = getStyles(muiTheme);
    let searchBar = (
      <div style={styles.searchBar}>
        <TextField
          inputStyle={{ top: -5 }}
          style={{ height: 'inherit', top: 6 }}
          value={this.state.searchInput}
          onChange={this.onChange}
          hintText={N18.searchInput} />

        <IconButton onTouchTap={this.search}>
          <ActionSearch color={muiTheme.svgIcon.color} hoverColor={muiTheme.svgIcon.hoverColor} />
        </IconButton>

        {this.state.searchInput.length > 0 &&
          <IconButton onTouchTap={this.clear}>
            <ContentClear color={muiTheme.svgIcon.color} hoverColor={muiTheme.svgIcon.hoverColor} />
          </IconButton>
        }
      </div>
    )

    return (
      <div style={styles.topbar}>
        <AppBar
          style={styles.appbar}
          iconElementLeft={searchBar}
          iconElementRight={
            <IconButton onTouchTap={this.toggleSettings}>
              <ActionSettings color={muiTheme.svgIcon.color} hoverColor={muiTheme.svgIcon.hoverColor} />
            </IconButton>
          }
          >
        </AppBar>
      </div>
    )
  }
}

export default Topbar;