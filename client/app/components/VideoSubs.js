import React, { Component, PropTypes } from 'react'
import { IconButton, Popover, Menu, MenuItem } from 'material-ui'
import AvPlayArrow from 'material-ui/svg-icons/av/play-arrow';

const getStyles = (theme) => {
  return {
    active: {
      color: theme.palette.accent1Color
    },
  }
}

class VideoSubs extends Component {
  static propTypes = {
    subs: PropTypes.array.isRequired,
    currentSubIdx: PropTypes.number,
    seekCallback: PropTypes.func,
    points: PropTypes.array,
  }

  static contextTypes = {
    muiTheme: PropTypes.object.isRequired
  }

  state = {
    dictOpen: false,
    word: '',
    explication: '',
  }

  handleRequestClose = () => {
    this.setState({ dictOpen: false });
  }

  showDict = (event) => {
    if (event.target.tagName == 'SPAN') {
      let word = event.target.tagName;
      //fetch from server, then setState
      this.setState({
        dictOpen: true,
        anchorEl: event.target,
        word: word,
      })
    }
  }

  render() {
    let styles = getStyles(this.context.muiTheme);
    let {subs, seekCallback, points, currentSubIdx} = this.props;
    return (
      <div className="dictableDiv">
        <table>
          <tbody>
            {subs.map((sub, idx) => {
              return (
                <tr key={idx}>
                  <td> <IconButton onTouchTap={() => seekCallback(idx)}> <AvPlayArrow /> </IconButton> </td>
                  <td style={currentSubIdx == idx ? styles.active : {}}> <div onClick={this.showDict} dangerouslySetInnerHTML={{ __html: sub }}></div> </td>
                </tr>
              )
            })}
          </tbody>
        </table>

        <Popover
          open={this.state.dictOpen}
          anchorEl={this.state.anchorEl}
          anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
          targetOrigin={{ horizontal: 'left', vertical: 'top' }}
          onRequestClose={this.handleRequestClose}
          >
          <Menu>
            <MenuItem primaryText="Refresh" />
            <MenuItem primaryText="Help &amp; feedback" />
            <MenuItem primaryText="Settings" />
            <MenuItem primaryText="Sign out" />
          </Menu>
        </Popover>
      </div>
    )
  }
}

export default VideoSubs