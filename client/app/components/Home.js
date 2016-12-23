import React, { Component, PropTypes } from 'react'
import Topbar from './Topbar'
import Sidebar from './Sidebar'

const getStyles = (theme) => {
  return {
    mainPanel: {
      position: 'relative',
      left: 200,
      top: theme.appBar.height + 30,
      width: 'calc(100% - 200px)',
      color: theme.palette.secondaryTextColor,
    }
  }
}

class Home extends Component {
  static propTypes = {
    user: PropTypes.object.isRequired,
    config: PropTypes.object.isRequired
  }

  static contextTypes = {
    muiTheme: PropTypes.object.isRequired,
    router: PropTypes.object.isRequired
  }

  render() {
    let styles = getStyles(this.context.muiTheme);

    return (
      <div>
        <Topbar user={this.props.user} />
        <Sidebar user={this.props.config} docked={true} open={true} />
        <div style={styles.mainPanel}>
          {this.props.children}
        </div>
      </div>
    )
  }
}

export default Home;