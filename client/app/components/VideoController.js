import React, { Component, PropTypes } from 'react'
import IconButton from 'material-ui/IconButton'
import NavigationChevronLeft from 'material-ui/svg-icons/navigation/chevron-left';
import NavigationChevronRight from 'material-ui/svg-icons/navigation/chevron-right';
import AvRepeatOne from 'material-ui/svg-icons/av/repeat-one';

import N18 from '../constants/strings.js'

const getStyles = (theme) => {
  return {
    subtitles: {
      background: 'black',
      width: '100%',
      padding: 15,
      height: 130,
      color: theme.palette.secondaryTextColor,
    },

    center: {
      textAlign: 'center',
    },

    controlPanel: {
      position: 'absolute',
      paddingLeft: 15,
      bottom: 5
    },

    active: {
      color: theme.palette.accent1Color
    }
  }
}

class VideoController extends Component {
  static propTypes = {
    sub: PropTypes.string.isRequired,
    sub_zh: PropTypes.string.isRequired,
    currentSubIdx: PropTypes.number.isRequired,
    nextCallback: PropTypes.func.isRequired,
    preCallback: PropTypes.func.isRequired,
    loopCallback: PropTypes.func.isRequired,
    loop: PropTypes.bool.isRequired
  }
  
  static contextTypes = {
    muiTheme: PropTypes.object.isRequired
  };

  render() {
    let {sub, sub_zh, currentSubIdx, nextCallback, preCallback, loopCallback, loop} = this.props;
    let styles = getStyles(this.context.muiTheme);
    return (
      <div style={styles.subtitles}>
        <div style={styles.center}>
          <div dangerouslySetInnerHTML={{ __html: sub }}></div>
          <div dangerouslySetInnerHTML={{ __html: sub_zh }}></div>
        </div>

        <div style={styles.controlPanel}>
          <IconButton onTouchTap={preCallback} > <NavigationChevronLeft /> </IconButton>
          <IconButton onTouchTap={loopCallback} > <AvRepeatOne color={loop ? styles.active.color : ''} /> </IconButton>
          <IconButton onTouchTap={nextCallback} > <NavigationChevronRight /> </IconButton>
        </div>
      </div>
    )
  }
}

export default VideoController